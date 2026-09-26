import asyncio
import logging
import uuid

from fastapi import APIRouter, Depends, File, HTTPException, Response, UploadFile

from lib.storage import get_object, put_object
from routers.auth import get_current_user

logger = logging.getLogger(__name__)
router = APIRouter()

APP_PREFIX = "midas-sources"
ALLOWED_EXTENSIONS = {
    "pdf", "png", "jpg", "jpeg", "webp", "gif",
    "doc", "docx", "xls", "xlsx", "csv", "txt", "dwg",
}
MAX_SIZE = 10 * 1024 * 1024


@router.post("/uploads")
async def upload(file: UploadFile = File(...)):
    filename = file.filename or "document"
    ext = filename.rsplit(".", 1)[-1].lower() if "." in filename else ""
    if ext not in ALLOWED_EXTENSIONS:
        raise HTTPException(status_code=400, detail="Unsupported file type")
    data = await file.read()
    if not data:
        raise HTTPException(status_code=400, detail="Empty file")
    if len(data) > MAX_SIZE:
        raise HTTPException(status_code=413, detail="File exceeds the 10 MB limit")
    path = f"{APP_PREFIX}/uploads/rfq/{uuid.uuid4()}.{ext}"
    try:
        result = await asyncio.to_thread(
            put_object, path, data, file.content_type or "application/octet-stream"
        )
    except Exception as exc:
        logger.error("upload failed: %s", exc)
        raise HTTPException(status_code=503, detail="File storage unavailable")
    return {"path": result["path"], "name": filename, "size": result["size"]}


@router.get("/files/{path:path}")
async def download(path: str, user: dict = Depends(get_current_user)):
    if not path.startswith(f"{APP_PREFIX}/"):
        raise HTTPException(status_code=404, detail="File not found")
    try:
        data, content_type = await asyncio.to_thread(get_object, path)
    except Exception:
        raise HTTPException(status_code=404, detail="File not found")
    return Response(content=data, media_type=content_type)
