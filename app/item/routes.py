from fastapi import APIRouter, HTTPException, Depends
from app.item.model import Item, ItemResponse
from app.config.database import item_table
from app.item.schemas import list_items
from app.config.security import get_current_user, oauth2_scheme
from bson import ObjectId

item_router = APIRouter(responses={404: {"description": "Not found"}})


# Get Request Method
@item_router.get("")
async def get_items():
    try:
        items = list_items(item_table.find())
        return items
    except Exception as e:
        raise HTTPException(
            status_code=500, detail=f"Error retrieving items: {str(e)}")


# Post Request Method
@item_router.post("")
async def post_item(item: Item):
    try:
        item_dict = dict(item)
        result = item_table.insert_one(item_dict)
        new_item = item_table.find_one({"_id": result.inserted_id})
        return ItemResponse(id=str(new_item["_id"]), **item_dict)
    except Exception as e:
        raise HTTPException(
            status_code=400, detail=f"Error creating item: {str(e)}")
