from uuid import UUID
from pydantic import BaseModel, ConfigDict, Field
from typing import Optional
from src.model.Usermodel import UserRole

class newProjectSchema(BaseModel):
    title: str = Field(..., example="New Project")
    description: Optional[str] = Field(None, example="This is a new project.")
    sratus: Optional[str] = Field("active", example="active")
    model_config = ConfigDict(from_attributes=True)


class updateProjectSchema(BaseModel):
    title: Optional[str] = Field(None, example="This is an updated project title.")
    description: Optional[str] = Field(None, example="This is no longer a new project.")
    status: Optional[str] = Field(None, example="completed")