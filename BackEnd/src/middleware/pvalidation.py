from uuid import UUID
from pydantic import BaseModel, ConfigDict, Field
from typing import Optional
from src.model.Usermodel import UserRole

class newProjectSchema(BaseModel):
    title: str = Field(..., example="New Project")
    description: Optional[str] = Field(None, example="This is a new project.")
    start_date: Optional[str] = Field(None, example="2024-01-01")
    owner_id: Optional[UUID] = Field(..., example="123e4567-e89b-12d3-a456-426614174000")
    sratus: Optional[str] = Field("active", example="active")
    model_config = ConfigDict(from_attributes=True)


class updateProjectSchema(BaseModel):
    title: Optional[str] = Field(None, example="This is an updated project title.")
    description: Optional[str] = Field(None, example="This is no longer a new project.")
    status: Optional[str] = Field(None, example="completed")