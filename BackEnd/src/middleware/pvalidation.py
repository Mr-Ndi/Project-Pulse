from uuid import UUID
from pydantic import BaseModel, ConfigDict, Field
from typing import Optional
from src.model.projectmodel import ProjectStatus

class newProjectSchema(BaseModel):
    name: str = Field(..., example="New Project")
    description: Optional[str] = Field(None, example="This is a new project.")
    status: Optional[ProjectStatus] = Field(ProjectStatus.NOT_STARTED, example="not_started")
    owner_id: Optional[UUID] = None  # owner_id is optional and set in backend
    model_config = ConfigDict(from_attributes=True)


class updateProjectSchema(BaseModel):
    name: Optional[str] = Field(None, example="This is an updated project name.")
    description: Optional[str] = Field(None, example="This is no longer a new project.")
    status: Optional[ProjectStatus] = Field(None, example="completed")

class updateProjectRequestSchema(BaseModel):
    project_id: UUID = Field(..., example="123e4567-e89b-12d3-a456-426614174000")
    name: Optional[str] = Field(None, example="This is an updated project name.")
    description: Optional[str] = Field(None, example="This is no longer a new project.")
    status: Optional[ProjectStatus] = Field(None, example="completed")