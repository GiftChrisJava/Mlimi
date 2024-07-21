from datetime import datetime
from pydantic import BaseModel, Field, EmailStr
from typing import List, Optional
from bson import ObjectId


class User(BaseModel):
    name: str
    username: str
    email: EmailStr
    password: str
    is_active: bool = False
    verified_at: Optional[datetime] = None
    updated_at: Optional[datetime] = None
    created_at: datetime = Field(default_factory=datetime.now)
    tokens: List[str] = []

    class Config:
        populate_by_name = True
        arbitrary_types_allowed = True
        json_encoders = {
            ObjectId: str
        }

    def get_context_string(self, context: str) -> str:
        return f"{context}{self.password[-6:]}{self.updated_at.strftime('%m%d%Y%H%M%S')}".strip()


class UserToken(BaseModel):
    user_id: str
    access_key: Optional[str] = None
    refresh_key: Optional[str] = None
    created_at: datetime = Field(default_factory=datetime.now)
    expires_at: datetime

    class Config:
        populate_by_name = True
        arbitrary_types_allowed = True
        json_encoders = {
            ObjectId: str
        }
