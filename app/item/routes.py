from fastapi import APIRouter
from item.model import Item
from config.database import item_table
from item.schemas import list_items
from bson import ObjectId

item_router = APIRouter()


# Get Request Method
@item_router.get("/")
async def get_items():
    items = list_items(item_table.find())
    return items


# Post Request Method
@item_router.post("/")
async def post_item(item: Item):
    item_table.insert_one(dict(item))
