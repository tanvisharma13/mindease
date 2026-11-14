
import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";

import { useAuth } from "../context/AuthContext";
import { apiRequest } from "../services/api";

const API_BASE_URL =
  import.meta.env.VITE_API_URL || "http://localhost:5001/api";

const WELCOME_MESSAGE = {
  id: "welcome",
  sender: "bot",
  text: "Hi. I’m here with you. You can tell me what’s on your mind, or we can simply take a quiet moment together.",
};

function Chat() {
  const { user, loading: authLoading } = useAuth();

  const [messages, setMessages] = useState([WELCOME_MESSAGE]);
  const [conversations, setConversations] = useState([]);
  const [activeConversationId, setActiveConversationId] = useState(null);

  const [input, setInput] = useState("");
  const [isSending, setIsSending] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const [loadingHistory, setLoadingHistory] = useState(true);
  const [pageError, setPageError] = useState("");

  const messagesContainerRef = useRef(null);

  const formatMessages = (savedMessages = []) => {
    if (!savedMessages.length) return [WELCOME_MESSAGE];

    return savedMessages.map((message) => ({
      id: message._id || `${message.role}-${message.createdAt}`,
      sender: message.role === "user" ? "user" : "bot",
      text: message.content,
    }));
  };

  // Scroll only the messages panel.
  useEffect(() => {
    const container = messagesContainerRef.current;
    if (!container) return;

    container.scrollTo({
      top: container.scrollHeight,
      behavior: "smooth",
    });
  }, [messages, isTyping]);

  // Open an existing conversation when selected.
  const openConversation = async (conversationId) => {
    if (isSending) return;

    try {
      setLoadingHistory(true);
      setPageError("");

      const response = await apiRequest(
        `/chat/conversations/${conversationId}`
      );

      setActiveConversationId(conversationId);
      setMessages(formatMessages(response.conversation.messages));
    } catch (error) {
      console.error("Open conversation error:", error);
      setPageError(error.message);
    } finally {
      setLoadingHistory(false);
    }
  };

  // Load history in the sidebar but always start with a fresh chat.
  useEffect(() => {
    if (authLoading) return;

    let cancelled = false;

    const loadConversations = async () => {
      try {
        setLoadingHistory(true);
        setPageError("");

        const response = await apiRequest("/chat/conversations");

        if (cancelled) return;

        setConversations(response.conversations || []);

        // Never automatically reopen the previous conversation.
        setActiveConversationId(null);
        setMessages([WELCOME_MESSAGE]);
        setInput("");
      } catch (error) {
        if (!cancelled) {
          console.error("Load chat history error:", error);
          setPageError(error.message);
        }
      } finally {
        if (!cancelled) {
          setLoadingHistory(false);
        }
      }
    };

    loadConversations();

    return () => {
      cancelled = true;
    };
  }, [authLoading]);

  // Start a fresh conversation.
  const startNewChat = () => {
    if (isSending) return;

    setActiveConversationId(null);
    setMessages([WELCOME_MESSAGE]);
    setInput("");
    setPageError("");
  };

  // Delete a conversation.
  const deleteConversation = async (conversationId) => {
    if (isSending) return;

    const confirmed = window.confirm(
      "Are you sure you want to delete this conversation?"
    );

    if (!confirmed) return;

    try {
      await apiRequest(`/chat/conversations/${conversationId}`, {
        method: "DELETE",
      });

      setConversations((previous) =>
        previous.filter(
          (conversation) => conversation._id !== conversationId
        )
      );

      if (activeConversationId === conversationId) {
        setActiveConversationId(null);
        setMessages([WELCOME_MESSAGE]);
      }
    } catch (error) {
      console.error("Delete conversation error:", error);
      setPageError(error.message);
    }
  };

  // Send a message and receive the streamed AI response.
  const sendMessage = async () => {
    const trimmedMessage = input.trim();

    if (!trimmedMessage || isSending || authLoading) return;

    const token = localStorage.getItem("mindease_token");

    if (!token) {
      setPageError("Please log in again to use the chatbot.");
      return;
    }

    setMessages((previous) => [
      ...previous,
      {
        id: `user-${Date.now()}`,
        sender: "user",
        text: trimmedMessage,
      },
    ]);

    setInput("");
    setIsSending(true);
    setIsTyping(true);
    setPageError("");

    try {
      let conversationId = activeConversationId;

      // Create a conversation only when the user sends the first message.
      if (!conversationId) {
        const created = await apiRequest("/chat/conversations", {
          method: "POST",
        });

        conversationId = created.conversation._id;

        setActiveConversationId(conversationId);

        setConversations((previous) => [
          created.conversation,
          ...previous,
        ]);
      }

      const response = await fetch(
        `${API_BASE_URL}/chat/conversations/${conversationId}/messages`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            message: trimmedMessage,
          }),
        }
      );

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));

        throw new Error(
          errorData.message || "Unable to generate a response."
        );
      }

      if (!response.body) {
        throw new Error("Streaming is not supported by this response.");
      }

      const reader = response.body.getReader();
      const decoder = new TextDecoder();

      const botMessageId = `bot-${Date.now()}`;

      let fullResponse = "";
      let botMessageCreated = false;

      const updateBotMessage = (content) => {
        if (!botMessageCreated) {
          botMessageCreated = true;

          setMessages((previous) => [
            ...previous,
            {
              id: botMessageId,
              sender: "bot",
              text: content,
            },
          ]);
        } else {
          setMessages((previous) =>
            previous.map((message) =>
              message.id === botMessageId
                ? { ...message, text: content }
                : message
            )
          );
        }
      };

      try {
        while (true) {
          const { value, done } = await reader.read();

          if (done) break;

          const chunk = decoder.decode(value, {
            stream: true,
          });

          if (!chunk) continue;

          fullResponse += chunk;
          updateBotMessage(fullResponse);

          setIsTyping(false);
        }

        const finalChunk = decoder.decode();

        if (finalChunk) {
          fullResponse += finalChunk;
          updateBotMessage(fullResponse);
        }
      } finally {
        reader.releaseLock();
      }

      if (!fullResponse.trim()) {
        throw new Error("The chatbot returned an empty response.");
      }

      setIsTyping(false);

      const updatedHistory = await apiRequest("/chat/conversations");

      setConversations(updatedHistory.conversations || []);
    } catch (error) {
      console.error("Chat error:", error);

      setPageError(error.message);

      setMessages((previous) => [
        ...previous,
        {
          id: `error-${Date.now()}`,
          sender: "bot",
          text: "I'm having trouble connecting right now. Please try again in a moment.",
        },
      ]);
    } finally {
      setIsTyping(false);
      setIsSending(false);
    }
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault();
      sendMessage();
    }
  };

  if (authLoading) {
    return (
      <div className="h-[calc(100dvh-5rem)] bg-[#F7F4EC] flex items-center justify-center">
        <p className="text-[#52745D]">Loading your companion...</p>
      </div>
    );
  }

  return (
    <div className="h-[calc(100dvh-5rem)] min-h-[520px] bg-[#F7F4EC] flex flex-col overflow-hidden">
      <main className="flex-1 min-h-0 w-full max-w-7xl mx-auto px-4 sm:px-6 py-4 flex flex-col">

        {/* Header */}
        <div className="flex items-center justify-between mb-4 shrink-0">
          <div>
            <Link
              to="/dashboard"
              className="text-sm text-[#52745D] hover:underline"
            >
              ← Dashboard
            </Link>

            <h1 className="text-3xl md:text-4xl font-serif text-[#263D31] mt-2">
              Your companion
            </h1>

            <p className="text-sm text-[#718078] mt-1">
              A quiet space to talk things through.
            </p>
          </div>

          <div className="hidden sm:flex items-center gap-2 rounded-full bg-[#E4EDE1] px-4 py-2">
            <span className="h-2.5 w-2.5 rounded-full bg-[#6C9675]" />
            <span className="text-xs text-[#4E6656]">
              Here with you
            </span>
          </div>
        </div>

        {/* Main layout */}
        <div className="flex-1 min-h-0 flex flex-col md:flex-row gap-4">

          {/* Conversation history */}
          <aside className="w-full md:w-64 md:h-full shrink-0 bg-white border border-[#DCE3D9] rounded-3xl p-4 flex flex-col min-h-0">
            <button
              onClick={startNewChat}
              disabled={isSending}
              className="w-full shrink-0 rounded-xl bg-[#3F604B] px-4 py-3 text-sm font-medium text-white hover:bg-[#314C3B] disabled:opacity-50"
            >
              + New chat
            </button>

            <h2 className="text-xs font-semibold uppercase tracking-wider text-[#879289] mt-5 mb-3 shrink-0">
              Recent conversations
            </h2>

            <div className="flex-1 min-h-0 overflow-y-auto space-y-2">
              {loadingHistory && (
                <p className="text-xs text-[#879289] py-2">
                  Loading history...
                </p>
              )}

              {!loadingHistory && conversations.length === 0 && (
                <p className="text-xs text-[#879289] py-2">
                  No previous conversations yet.
                </p>
              )}

              {conversations.map((conversation) => (
                <div
                  key={conversation._id}
                  className={`flex items-center gap-2 rounded-xl px-3 py-3 ${
                    activeConversationId === conversation._id
                      ? "bg-[#EAF0E7]"
                      : "hover:bg-[#F5F7F2]"
                  }`}
                >
                  <button
                    onClick={() => openConversation(conversation._id)}
                    disabled={isSending || loadingHistory}
                    className="flex-1 min-w-0 text-left text-sm text-[#3B5143] truncate disabled:opacity-50"
                    title={conversation.title}
                  >
                    {conversation.title}
                  </button>

                  <button
                    onClick={() => deleteConversation(conversation._id)}
                    disabled={isSending}
                    aria-label="Delete conversation"
                    title="Delete conversation"
                    className="text-[#A47770] hover:text-red-700 text-xs px-1 disabled:opacity-40"
                  >
                    ✕
                  </button>
                </div>
              ))}
            </div>
          </aside>

          {/* Chat panel */}
          <section className="flex-1 min-h-0 bg-white border border-[#DCE3D9] rounded-3xl overflow-hidden flex flex-col">

            {/* Scrollable messages */}
            <div
              ref={messagesContainerRef}
              className="flex-1 min-h-0 overflow-y-auto overscroll-contain p-5 sm:p-7 space-y-5"
            >
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${
                    message.sender === "user"
                      ? "justify-end"
                      : "justify-start"
                  }`}
                >
                  <div
                    className={`max-w-[85%] sm:max-w-[70%] rounded-2xl px-5 py-4 ${
                      message.sender === "user"
                        ? "bg-[#3F604B] text-white rounded-br-md"
                        : "bg-[#EEF3EC] text-[#3B5143] rounded-bl-md"
                    }`}
                  >
                    <p className="text-sm leading-relaxed whitespace-pre-wrap break-words">
                      {message.text}
                    </p>
                  </div>
                </div>
              ))}

              {isTyping && (
                <div className="flex items-center justify-start pl-1">
                  <div className="flex items-center gap-1.5">
                    <span className="w-2 h-2 bg-[#78907D] rounded-full animate-bounce" />
                    <span className="w-2 h-2 bg-[#78907D] rounded-full animate-bounce [animation-delay:150ms]" />
                    <span className="w-2 h-2 bg-[#78907D] rounded-full animate-bounce [animation-delay:300ms]" />
                  </div>
                </div>
              )}
            </div>

            {/* Error message */}
            {pageError && (
              <div className="shrink-0 px-5 py-2 text-xs text-red-700 bg-red-50">
                {pageError}
              </div>
            )}

            {/* Input stays at the bottom */}
            <div className="shrink-0 border-t border-[#E3E8E1] p-4 sm:p-5 bg-[#FCFCF9]">
              <div className="flex items-end gap-3">
                <textarea
                  value={input}
                  onChange={(event) => setInput(event.target.value)}
                  onKeyDown={handleKeyDown}
                  rows={1}
                  disabled={isSending}
                  placeholder={
                    user?.name
                      ? `What’s on your mind, ${user.name.split(" ")[0]}?`
                      : "What’s on your mind?"
                  }
                  className="flex-1 resize-none rounded-2xl border border-[#D7DFD5] bg-white px-4 py-3 text-sm text-[#263D31] outline-none focus:border-[#52745D] focus:ring-2 focus:ring-[#52745D]/10 disabled:opacity-60"
                />

                <button
                  onClick={sendMessage}
                  disabled={!input.trim() || isSending}
                  className="rounded-2xl bg-[#3F604B] px-5 py-3 text-sm font-medium text-white transition hover:bg-[#314C3B] disabled:opacity-40 disabled:cursor-not-allowed"
                >
                  {isSending ? "Thinking..." : "Send"}
                </button>
              </div>

              <p className="text-[11px] text-[#879289] mt-3 text-center">
                MindEase is a wellness companion, not a replacement for
                professional mental-health care.
              </p>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}

export default Chat;