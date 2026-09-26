import asyncio
import logging
import uuid
from datetime import datetime, timezone
from typing import List, Optional

from fastapi import APIRouter, Depends, HTTPException
from pydantic import BaseModel, EmailStr, Field

from lib.db import db
from lib.emailer import send_rfq_notification
from routers.auth import get_current_user

logger = logging.getLogger(__name__)
router = APIRouter()

STATUSES = ["New", "Contacted", "Quoted", "Closed"]


class RfqCreate(BaseModel):
    name: str = Field(min_length=2, max_length=120)
    organization: str = Field(min_length=2, max_length=200)
    email: EmailStr
    phone: Optional[str] = Field(default=None, max_length=40)
    requirement_type: str = "General Inquiry"
    location: Optional[str] = Field(default=None, max_length=120)
    message: str = Field(min_length=10, max_length=5000)
    attachment_path: Optional[str] = Field(default=None, max_length=300)
    attachment_name: Optional[str] = Field(default=None, max_length=200)


class Rfq(RfqCreate):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    status: str = "New"
    created_at: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))


class StatusUpdate(BaseModel):
    status: str


async def _notify(rfq: Rfq) -> None:
    try:
        await send_rfq_notification(rfq)
    except Exception:
        logger.exception("RFQ notification email failed for %s", rfq.id)


@router.post("/rfq", response_model=Rfq)
async def create_rfq(input: RfqCreate):
    obj = Rfq(**input.model_dump())
    await db.rfqs.insert_one(obj.model_dump())
    asyncio.create_task(_notify(obj))
    return obj


@router.get("/rfq", response_model=List[Rfq])
async def list_rfqs(user: dict = Depends(get_current_user)):
    docs = await db.rfqs.find().sort("created_at", -1).to_list(500)
    out = []
    for d in docs:
        d.pop("_id", None)
        ts = d.get("created_at")
        if isinstance(ts, datetime) and ts.tzinfo is None:
            d["created_at"] = ts.replace(tzinfo=timezone.utc)
        out.append(Rfq(**d))
    return out


@router.patch("/rfq/{rfq_id}/status", response_model=Rfq)
async def update_rfq_status(
    rfq_id: str, input: StatusUpdate, user: dict = Depends(get_current_user)
):
    if input.status not in STATUSES:
        raise HTTPException(status_code=400, detail="Invalid status")
    result = await db.rfqs.update_one({"id": rfq_id}, {"$set": {"status": input.status}})
    if result.matched_count == 0:
        raise HTTPException(status_code=404, detail="Inquiry not found")
    d = await db.rfqs.find_one({"id": rfq_id})
    d.pop("_id", None)
    ts = d.get("created_at")
    if isinstance(ts, datetime) and ts.tzinfo is None:
        d["created_at"] = ts.replace(tzinfo=timezone.utc)
    return Rfq(**d)
