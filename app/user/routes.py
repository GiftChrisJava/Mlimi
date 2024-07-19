from fastapi import APIRouter
from user.model import User
# from config.database import item_table
# from user.schemas import list_items
from bson import ObjectId

user_router = APIRouter()


auth_router = APIRouter()


# Post Request Method for Registering a User
@user_router.post("/register")
async def register_account(user: User):
    pass


# Post Request Method for Verifying User Account
@user_router.post("/verify")
async def verify_account(user: User):
    pass


# Get Request Method
@user_router.get("")
async def get_users():
    users = [{"name": "t", "age": 56}, {"name": "g", "age": 23}]
    return users


# Post Request Method for Verifying User Account
@auth_router.post("/login")
async def login(user: User):
    pass

# Post Request Method for Verifying User Account


@auth_router.post("/refresh")
async def refresh_token():
    pass

# Post Request Method for Verifying User Account


@auth_router.post("/forgot-password")
async def forgot_password():
    pass


# Post Request Method for Verifying User Account
@auth_router.put("/reset-password")
async def reset_password():
    pass
