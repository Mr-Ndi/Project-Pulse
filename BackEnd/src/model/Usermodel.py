import uuid
from sqlmodel import SQLModel, Field
from typing import Optional
from enum import Enum

class UserRole(str, Enum):
    ADMIN = "ADMIN"
    USER = "USER"

class UserBase(SQLModel, table=True):
    id: Optional[uuid.UUID] = Field(default_factory=uuid.uuid4, primary_key=True)
    email: str
    full_name: Optional[str] = None
    password: str
    role: UserRole = UserRole.USER
