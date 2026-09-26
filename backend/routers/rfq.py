import uuid
from datetime import datetime, timezone
from typing import List, Optional

from fastapi import APIRouter
from pydantic import BaseModel, EmailStr, Field

from lib.db import db

router = APIRouter()


class RfqCreate(BaseModel):
    name: str = Field(min_length=2, max_length=120)
    organization: str = Field(min_length=2, max_length=200)
    email: EmailStr
    phone: Optional[str] = Field(default=None, max_length=40)
    requirement_type: str = "General Inquiry"
    location: Optional[str] = Field(default=None, max_length=120)
    message: str = Field(min_length=10, max_length=5000)


class Rfq(RfqCreate):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    created_at: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))


@router.post("/rfq", response_model=Rfq)
async def create_rfq(input: RfqCreate):
    obj = Rfq(**input.model_dump())
    await db.rfqs.insert_one(obj.model_dump())
    return obj


@router.get("/rfq", response_model=List[Rfq])
async def list_rfqs():
    docs = await db.rfqs.find().sort("created_at", -1).to_list(500)
    out = []
    for d in docs:
        d.pop("_id", None)
        ts = d.get("created_at")
        if isinstance(ts, datetime) and ts.tzinfo is None:
            d["created_at"] = ts.replace(tzinfo=timezone.utc)
        out.append(Rfq(**d))
    return out
