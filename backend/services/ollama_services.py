import json
import re
import time
import httpx


OLLAMA_URL = "http://localhost:11434/api/chat"
MODEL_NAME = "llama3.1:8b"
MAX_HISTORY_MESSAGES = 12


ROMAN_HINDI_WORDS = {
    "hai", "hain", "ho", "hu", "hun", "tha", "thi", "the",
    "mera", "meri", "mere", "mujhe", "mujh", "tum", "tumhe",
    "aap", "apko", "kya", "kyu", "kyun", "kaise", "kaisa",
    "kaisi", "nahi", "nahin", "nhi", "haan", "han", "na",
    "aur", "par", "lekin", "magar", "ab", "kab", "jab",
    "ka", "ki", "ke", "ko", "se", "me", "mein", "bhi",
    "bahut", "bohot", "thoda", "zyada", "acha", "accha",
    "theek", "nahi", "yaar", "yr", "lagta", "lagti",
    "raha", "rahi", "rahe", "kar", "karo", "kuch",
    "sab", "bas", "mat", "mood", "khrab", "kharab",
    "udaas", "pareshan", "darr", "dar", "kyunki",
    "kaafi", "aisa", "aasa", "waisa", "wesa"
}


ENGLISH_MARKERS = {
    "i", "am", "is", "are", "was", "were", "the", "this",
    "that", "it", "feel", "feeling", "my", "me", "you",
    "your", "we", "they", "he", "she", "because", "but",
    "and", "not", "don't", "doesn't", "can't", "cannot",
    "have", "has", "been", "being", "just", "really",
    "very", "like", "what", "why", "how", "when"
}


def detect_response_language(message):
    """
    Detect the language of the latest user message.
    """

    if re.search(r"[\u0900-\u097F]", message):
        return "Hindi (Devanagari)"

    words = re.findall(r"[a-z']+", message.lower())

    hindi_count = sum(
        1 for word in words
        if word in ROMAN_HINDI_WORDS
    )

    english_count = sum(
        1 for word in words
        if word in ENGLISH_MARKERS
    )

    if hindi_count == 0:
        return "English"

    if english_count >= 2:
        return "Hinglish"

    return "Roman Hindi"


def get_meaning_context(message):
    """
    Normalize common informal spellings and provide context
    for phrases that can otherwise be misunderstood.
    """

    normalized = message.lower()

    normalized = normalized.replace("aasa", "aisa")
    normalized = normalized.replace("nahin", "nahi")
    normalized = normalized.replace("nhi", "nahi")

    hints = []

    if (
        "numb" in normalized
        and re.search(r"\b(but|lekin|par)\b", normalized)
        and re.search(r"\b(aisa|waisa)\s+nahi\b", normalized)
    ):
        hints.append(
            "The user is describing a complicated emotional state. "
            "Do not interpret this as saying they do not want anything."
        )

    if "mood khrab" in normalized or "mood kharab" in normalized:
        hints.append(
            "The user means their mood is low or upset."
        )

    if "mood off" in normalized:
        hints.append(
            "The user means they are feeling low or emotionally off."
        )

    if "been a while" in normalized:
        hints.append(
            "Understand this phrase in its conversational context. "
            "Do not assume a specific event."
        )

    return " ".join(hints)


# ---------------------------------------------------------
# INDIA-SPECIFIC SUICIDE AND SELF-HARM SAFETY HANDLING
# ---------------------------------------------------------

SUICIDE_RISK_PATTERNS = [
    r"\bkill(?:ing)? myself\b",
    r"\bhurt myself\b",
    r"\bharm myself\b",
    r"\bself[\s-]?harm\b",
    r"\bfeel like dying\b",
    r"\bfeel like killing myself\b",
    r"\bwant to die\b",
    r"\bwanna die\b",
    r"\bi want to end my life\b",
    r"\bend my life\b",
    r"\btake my own life\b",
    r"\bbetter off dead\b",
    r"\bis dying better\b",
    r"\bdon't want to live\b",
    r"\bdo not want to live\b",
    r"\bno reason to live\b",
    r"\bsuicid(?:e|al)\b",

    # Common Roman Hindi phrases
    r"\bmarna chahta(?:\s+hoon)?\b",
    r"\bmarna chahti(?:\s+hoon)?\b",
    r"\bmar jana chahta\b",
    r"\bmar jana chahti\b",
    r"\bjeena nahi chahta\b",
    r"\bjeena nahi chahti\b",
    r"\bjeene ka mann nahi\b",
    r"\bkhud ko maar(?:na)?\b",
    r"\bapni jaan lena\b",
    r"\bkhudkushi\b"
]


def detect_suicide_risk(message):
    """
    Basic keyword-based detection of explicit suicide/self-harm
    language in the latest user message.
    """

    normalized = message.lower().strip()

    for pattern in SUICIDE_RISK_PATTERNS:
        if re.search(pattern, normalized):
            return True

    return False


SAFETY_RESPONSES = {
    "English": (
        "I'm really sorry you're going through this. I'm glad you told me. "
        "I want to take what you're saying seriously. ❤️\n\n"
        "Are you in immediate danger right now, or have you already hurt "
        "yourself or taken something to harm yourself?\n\n"
        "If you might act on these thoughts, please don't stay alone. "
        "Move away from anything you could use to hurt yourself and contact "
        "someone you trust who can be with you.\n\n"
        "In India, you can call **Tele-MANAS at 14416 or 1800-891-4416** "
        "for mental-health support. If you're in immediate danger, call "
        "**112** for emergency help.\n\n"
        "Can you tell me whether you're safe right now?"
    ),

    "Roman Hindi": (
        "Mujhe afsos hai ki tum itna difficult feel kar rahe ho. "
        "Thank you mujhe batane ke liye. Main tumhari baat seriously le raha hoon. ❤️\n\n"
        "Kya tum abhi immediate danger mein ho? Kya tumne khud ko hurt "
        "kiya hai ya kuch aisa liya hai jisse tumhe nuksaan ho sakta hai?\n\n"
        "Agar tumhe lag raha hai ki tum khud ko hurt kar sakte ho, "
        "please abhi akele mat raho. Kisi trusted person ko apne paas bulao "
        "aur harmful cheezon se door ho jao.\n\n"
        "India mein mental-health support ke liye **Tele-MANAS 14416 "
        "ya 1800-891-4416** par call kar sakte ho. Immediate emergency "
        "mein **112** call karo.\n\n"
        "Kya tum abhi safe ho?"
    ),

    "Hinglish": (
        "I'm really sorry ki tum itna difficult feel kar rahe ho. "
        "Thank you for telling me. Main tumhari baat seriously le raha hoon. ❤️\n\n"
        "Are you in immediate danger right now? Kya tumne already khud ko "
        "hurt kiya hai ya kuch harmful liya hai?\n\n"
        "Agar tumhe lag raha hai ki you might hurt yourself, please abhi "
        "akele mat raho. Kisi trusted person ko apne paas bulao aur "
        "harmful cheezon se door ho jao.\n\n"
        "India mein mental-health support ke liye **Tele-MANAS 14416 "
        "ya 1800-891-4416** call kar sakte ho. Immediate emergency mein "
        "**112** call karo.\n\n"
        "Can you tell me if you're safe right now?"
    ),

    "Hindi (Devanagari)": (
        "मुझे अफ़सोस है कि तुम इतना मुश्किल महसूस कर रहे हो। "
        "मुझे बताने के लिए शुक्रिया। मैं तुम्हारी बात गंभीरता से ले रहा हूँ। ❤️\n\n"
        "क्या तुम अभी किसी immediate danger में हो? क्या तुमने खुद को "
        "चोट पहुँचाई है या कुछ ऐसा लिया है जिससे तुम्हें नुकसान हो सकता है?\n\n"
        "अगर तुम्हें लग रहा है कि तुम खुद को नुकसान पहुँचा सकते हो, "
        "तो कृपया अभी अकेले मत रहो। किसी भरोसेमंद व्यक्ति को अपने पास बुलाओ "
        "और नुकसान पहुँचाने वाली चीज़ों से दूर हो जाओ।\n\n"
        "भारत में mental-health support के लिए **Tele-MANAS 14416 "
        "या 1800-891-4416** पर कॉल कर सकते हो। तुरंत emergency हो तो "
        "**112** पर कॉल करो।\n\n"
        "क्या तुम अभी सुरक्षित हो?"
    )
}


# ---------------------------------------------------------
# SYSTEM PROMPT
# ---------------------------------------------------------

SYSTEM_PROMPT = """
You are MindEase, a friendly and emotionally supportive mental wellness chatbot.

Your role is to listen, understand, and respond naturally.

IMPORTANT RULES:

1. Always respond in the language of the user's LATEST message.
2. If the user writes in English, respond in English.
3. If the user writes Hindi using English letters, respond in Roman Hindi.
4. If the user writes in Devanagari Hindi, respond in Devanagari Hindi.
5. If the user mixes Hindi and English, respond in natural Hinglish.
6. Do not let previous messages decide the language of the current response.

CONVERSATION STYLE:

- Sound like a real, caring person.
- Use simple, natural Indian conversational language.
- Keep responses short and meaningful.
- Avoid overly formal language.
- Do not repeat the same empathetic sentence.
- Do not assume how the user feels.
- Do not invent emotions or situations.
- Do not give generic advice unnecessarily.
- Ask at most one relevant question at a time.
- Listen before giving suggestions.
- Do not force positivity.
- Do not judge the user.

EMOTIONAL SUPPORT:

- Acknowledge what the user actually says.
- Help the user express their thoughts.
- Avoid diagnosing mental-health conditions.
- Never encourage self-harm or suicide.
- If the user expresses suicidal thoughts or immediate danger,
  respond supportively and encourage immediate human assistance.
"""


http_client = httpx.AsyncClient(timeout=None)


# ---------------------------------------------------------
# GENERATE CHATBOT RESPONSE
# ---------------------------------------------------------

async def generate_response(message, history=None):

    if history is None:
        history = []

    response_language = detect_response_language(message)

    # Handle explicit suicide/self-harm language before calling Ollama.
    # Check only the latest message so an old message does not keep
    # triggering the crisis response throughout the conversation.
    if detect_suicide_risk(message):
        yield SAFETY_RESPONSES.get(
            response_language,
            SAFETY_RESPONSES["English"]
        )
        return

    language_instruction = (
        f"The user's latest message is in {response_language}. "
        f"You MUST respond in {response_language}. "
        "Do not switch languages based on conversation history."
    )

    meaning_context = get_meaning_context(message)

    system_content = SYSTEM_PROMPT + "\n\n" + language_instruction

    if meaning_context:
        system_content += "\n\nAdditional context:\n" + meaning_context

    messages = [
        {
            "role": "system",
            "content": system_content
        }
    ]

    # Keep only the latest conversation messages.
    recent_history = history[-MAX_HISTORY_MESSAGES:]

    for item in recent_history:

        role = item.get("role")
        content = item.get("content")

        if role in ("user", "assistant") and content:
            messages.append({
                "role": role,
                "content": content
            })

    messages.append({
        "role": "user",
        "content": message
    })

    payload = {
        "model": MODEL_NAME,
        "messages": messages,
        "stream": True,
        "think": False,
        "options": {
            "num_predict": 120,
            "temperature": 0.3
        },
        "keep_alive": "30m"
    }

    try:

        async with http_client.stream(
            "POST",
            OLLAMA_URL,
            json=payload
        ) as response:

            response.raise_for_status()

            async for line in response.aiter_lines():

                if not line:
                    continue

                try:
                    data = json.loads(line)

                    if "message" in data:
                        content = data["message"].get("content", "")

                        if content:
                            yield content

                    if data.get("done", False):
                        break

                except json.JSONDecodeError:
                    continue

    except httpx.ConnectError:
        yield (
            "I'm having trouble connecting to the chatbot service right now. "
            "Please try again in a moment."
        )

    except httpx.TimeoutException:
        yield (
            "The response is taking longer than expected. "
            "Please try again."
        )

    except httpx.HTTPStatusError as error:
        yield (
            f"The chatbot service returned an error: "
            f"{error.response.status_code}. Please try again."
        )

    except Exception:
        yield (
            "Something went wrong while generating the response. "
            "Please try again."
        )