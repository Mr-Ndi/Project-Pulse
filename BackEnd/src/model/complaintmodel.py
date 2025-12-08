import uuid
from sqlmodel import SQLModel, Field
from sqlalchemy import Column, Enum as PgEnum
from typing import Optional
from enum import Enum
from datetime import datetime


class ComplaintStatus(str, Enum):
    NEW = "new"
    IN_PROGRESS = "in-progress"
    RESOLVED = "resolved"
    CLOSED = "closed"


class ComplaintBase(SQLModel, table=True):
    __tablename__ = "complaints"
    
    id: Optional[uuid.UUID] = Field(default_factory=uuid.uuid4, primary_key=True)
    name: str = Field(max_length=255)
    email: str = Field(max_length=255)
    message: str
    # Map to existing Postgres enum complaintstatus; values_callable ensures lowercase values
    status: ComplaintStatus = Field(
        default=ComplaintStatus.NEW,
        sa_column=Column(PgEnum(ComplaintStatus, name="complaintstatus", values_callable=lambda obj: [e.value for e in obj], create_type=False))
    )
    created_at: Optional[datetime] = Field(default_factory=datetime.utcnow)
    updated_at: Optional[datetime] = Field(default_factory=datetime.utcnow)
