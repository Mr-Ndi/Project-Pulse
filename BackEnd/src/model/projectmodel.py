from time import time
import uuid
from sqlmodel import SQLModel, Field
from typing import Optional
from enum import Enum

class ProjectStatus(str, Enum):
    NOT_STARTED = "not_started"
    COMPLETED = "completed"
    IN_PROGRESS = "in_progress"

class ProjectBase(SQLModel, table=True):
    id: Optional[uuid.UUID] = Field(default_factory=uuid.uuid4, primary_key=True)
    name: str
    description: Optional[str] = None
    owner_id: uuid.UUID
    status: ProjectStatus = ProjectStatus.NOT_STARTED
    start_date: Optional[str] = Field(default=time())