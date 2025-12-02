from uuid import UUID
from pydantic import BaseModel, ConfigDict, Field
from typing import Optional
from datetime import date
from src.model.Usermodel import UserRole

# Input schema - used for registration (does not include id)
class userCreateSchema(BaseModel):
    full_name: str = Field(..., example="First Tester")
    email: str = Field(..., example="tester@gmail.com")
    password: str = Field(..., example="Tester#250")
    model_config = ConfigDict(from_attributes=True)

    
# Output schema - used for the response (includes id)
class UserBase(BaseModel):
    id: UUID = Field(exclude=True)
    email: str
    full_name: Optional[str] = None
    role: UserRole = UserRole.USER
    is_verified: bool = False
    model_config = ConfigDict(from_attributes=True)


class UserUpdateSchema(BaseModel):
    email: Optional[str] = Field(None, example = "tester@gmail.com")
    password: Optional[str] =Field( None, example = "Tester#250")
    full_name: Optional[str] =Field( None, example = "First Tester")
    role: Optional[UserRole] = None


class UserLoginSchema(BaseModel):
    email: str = Field(..., example = "tester@gmail.com")
    password: str = Field(..., example = "Tester#250")