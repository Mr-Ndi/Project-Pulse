from pydantic import BaseModel, ConfigDict, Field, EmailStr
from typing import Optional
from datetime import datetime
import uuid


class ComplaintCreateSchema(BaseModel):
    name: str = Field(..., min_length=1, max_length=255, example="John Doe")
    email: EmailStr = Field(..., example="john@example.com")
    message: str = Field(..., min_length=1, example="I have a question about...")
    model_config = ConfigDict(from_attributes=True)


class ComplaintStatusUpdateSchema(BaseModel):
    status: str = Field(..., pattern="^(new|in-progress|resolved|closed)$", example="resolved")
    model_config = ConfigDict(from_attributes=True)


class ComplaintResponseSchema(BaseModel):
    id: uuid.UUID
    name: str
    email: str
    message: str
    status: str
    created_at: datetime
    updated_at: Optional[datetime] = None
    model_config = ConfigDict(from_attributes=True)


class ComplaintsListResponseSchema(BaseModel):
    complaints: list[ComplaintResponseSchema]
    total: int
    model_config = ConfigDict(from_attributes=True)
