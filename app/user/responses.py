from typing import Union, List, Optional
from datetime import datetime
from pydantic import BaseModel, EmailStr, Field
from bson import ObjectId


class BaseResponse(BaseModel):
    class Config:
        json_encoders = {
            ObjectId: str,
            datetime: lambda v: v.isoformat(),
        }
        from_attributes = True
        arbitrary_types_allowed = True


class UserResponse(BaseResponse):
    id: Optional[str] = Field(alias="id")
    name: str
    username: str
    email: EmailStr
    is_active: bool
    created_at: Union[str, None, datetime] = None
    verified_at: Union[str, None, datetime] = None
    updated_at: Union[str, None, datetime] = None


class LoginResponse(BaseModel):
    access_token: str
    refresh_token: str
    expires_in: int
    token_type: str = Field(default="Bearer")
