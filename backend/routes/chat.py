from fastapi import APIRouter, HTTPException
from fastapi.responses import StreamingResponse
from pydantic import BaseModel

from backend.services.ollama_services import generate_response

router = APIRouter(prefix="/chat", tags=["Chat"])


class ChatMessage(BaseModel):
    role: str
    content: str


class ChatRequest(BaseModel):
    message: str
    history: list[ChatMessage] = []


@router.post("")
async def chat(request: ChatRequest):

    if not request.message.strip():
        raise HTTPException(
            status_code=400,
            detail="Message cannot be empty.",
        )

    history = [
        {
            "role": item.role,
            "content": item.content,
        }
        for item in request.history
    ]

    return StreamingResponse(
        generate_response(
            request.message,
            history,
        ),
        media_type="text/plain",
    )