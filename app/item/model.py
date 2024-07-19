from pydantic import BaseModel
from typing import Optional, List


class Item(BaseModel):
    name: str
    description: str


class ItemResponse(BaseModel):
    id: str
    name: str
    description: Optional[str] = None
