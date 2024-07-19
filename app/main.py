
from fastapi import FastAPI
from item.routes import item_router
from user.routes import user_router

app = FastAPI()

app.include_router(item_router, prefix="/api/v1/items")

app.include_router(user_router, prefix="/api/v1/users")
