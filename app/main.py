
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.item.routes import item_router
from app.user.routes import user_router, auth_router, guest_router
from app.gpt.routes import crop_recommendation_router

app = FastAPI()

origins = [
    "http://localhost.tiangolo.com",
    "https://localhost.tiangolo.com",
    "http://localhost",
    "http://localhost:8080",
  "http://https://dashboard.render.com",
  "http://localhost:3003",
    "http://localhost:3000"
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(item_router, prefix="/api/v1/auth/items", tags=["DB Test"])

app.include_router(user_router, prefix="/api/v1/users", tags=["Users"])

app.include_router(guest_router, prefix="/api/v1/users", tags=["Guest"])

app.include_router(auth_router, prefix="/api/v1/auth", tags=["Auth"])


app.include_router(crop_recommendation_router,
                   prefix="/api/v1/recommendations", tags=["GPT"])





if __name__ == '__main__':
      uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)
