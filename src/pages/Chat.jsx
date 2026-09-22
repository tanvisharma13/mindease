import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";

function Chat() {
  const user = JSON.parse(localStorage.getItem("mindease_user"));

  const [messages, setMessages] = useState([
    {
      id: 1,
      sender: "bot",
      text: "Hi. I’m here with you. You can tell me what’s on your mind, or we can simply take a quiet moment together.",
    },
  ]);

  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);

  const messagesEndRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({
      behavior: "smooth",
    });
  }, [messages, isTyping]);

  const getBotResponse = (message) => {
    const text = message.toLowerCase();

    if (
      text.includes("sad") ||
      text.includes("depressed") ||
      text.includes("upset")
    ) {
      return "I’m sorry that you’re going through a difficult moment. You don’t need to solve everything right now. What feels hardest at this moment?";
    }

    if (
      text.includes("stress") ||
      text.includes("stressed") ||
      text.includes("anxious") ||
      text.includes("anxiety")
    ) {
      return "That sounds like a lot to carry. Try taking one slow breath with me. What is one thing that is making you feel most overwhelmed right now?";
    }

    if (
      text.includes("happy") ||
      text.includes("good") ||
      text.includes("great")
    ) {
      return "I’m glad to hear that. It can be nice to notice the moments that feel lighter. What has been going well for you?";
    }

    if (text.includes("sleep")) {
      return "Sleep can have a big effect on how we feel. If you’d like, we can explore what your evenings have been like lately.";
    }

    if (text.includes("hello") || text.includes("hi")) {
      return "Hello. I’m glad you’re here. How are you feeling today?";
    }

    return "Thank you for sharing that with me. Take your time. Would you like to tell me a little more about what you’re experiencing?";
  };

  const sendMessage = async () => {
    const trimmedMessage = input.trim();

    if (!trimmedMessage || isTyping) return;

    const userMessage = {
      id: Date.now(),
      sender: "user",
      text: trimmedMessage,
    };

    setMessages((previous) => [...previous, userMessage]);
    setInput("");
    setIsTyping(true);

    /*
      Later, replace the local response below with your Python/Llama API.

      Example:

      const response = await fetch("http://localhost:8000/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          message: trimmedMessage,
        }),
      });

      const data = await response.json();

      const botResponse = {
        id: Date.now() + 1,
        sender: "bot",
        text: data.response,
      };
    */

    setTimeout(() => {
      const botResponse = {
        id: Date.now() + 1,
        sender: "bot",
        text: getBotResponse(trimmedMessage),
      };

      setMessages((previous) => [...previous, botResponse]);
      setIsTyping(false);
    }, 800);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <div className="min-h-screen bg-[#F7F4EC] flex flex-col">
      <main className="flex-1 w-full max-w-5xl mx-auto px-4 sm:px-6 py-6 flex flex-col">
        <div className="flex items-center justify-between mb-6">
          <div>
            <Link
              to="/dashboard"
              className="text-sm text-[#52745D] hover:underline"
            >
              ← Dashboard
            </Link>

            <h1 className="text-3xl md:text-4xl font-serif text-[#263D31] mt-3">
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

        <div className="flex-1 bg-white border border-[#DCE3D9] rounded-3xl overflow-hidden flex flex-col min-h-[600px]">
          <div className="flex-1 overflow-y-auto p-5 sm:p-7 space-y-5">
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
                  <p className="text-sm leading-relaxed whitespace-pre-wrap">
                    {message.text}
                  </p>
                </div>
              </div>
            ))}

            {isTyping && (
              <div className="flex justify-start">
                <div className="bg-[#EEF3EC] rounded-2xl rounded-bl-md px-5 py-4">
                  <div className="flex gap-1.5">
                    <span className="h-2 w-2 rounded-full bg-[#78907D] animate-bounce" />
                    <span className="h-2 w-2 rounded-full bg-[#78907D] animate-bounce [animation-delay:150ms]" />
                    <span className="h-2 w-2 rounded-full bg-[#78907D] animate-bounce [animation-delay:300ms]" />
                  </div>
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          <div className="border-t border-[#E3E8E1] p-4 sm:p-5 bg-[#FCFCF9]">
            <div className="flex items-end gap-3">
              <textarea
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                rows={1}
                placeholder={
                  user
                    ? `What’s on your mind, ${user.name.split(" ")[0]}?`
                    : "What’s on your mind?"
                }
                className="flex-1 resize-none rounded-2xl border border-[#D7DFD5] bg-white px-4 py-3 text-sm text-[#263D31] outline-none focus:border-[#52745D] focus:ring-2 focus:ring-[#52745D]/10"
              />

              <button
                onClick={sendMessage}
                disabled={!input.trim() || isTyping}
                className="rounded-2xl bg-[#3F604B] px-5 py-3 text-sm font-medium text-white transition hover:bg-[#314C3B] disabled:opacity-40 disabled:cursor-not-allowed"
              >
                Send
              </button>
            </div>

            <p className="text-[11px] text-[#879289] mt-3 text-center">
              MindEase is a wellness companion, not a replacement for
              professional mental-health care.
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}

export default Chat;