from fastapi import APIRouter
from item.model import Item
from config.database import item_table
from item.schemas import list_items
from bson import ObjectId

user_router = APIRouter()


# Get Request Method
@user_router.get("/")
async def get_users():
    users = [{"name": "t", "age": 56}, {"name": "g", "age": 23}]
    return users


# Post Request Method
# @user_router.post("/")
# async def post_item(item: Item):
#     item_table.insert_one(dict(item))
