import os
from functools import lru_cache
from pydantic_settings import BaseSettings
from pathlib import Path
import os
from dotenv import load_dotenv, dotenv_values

load_dotenv()

APP_NAME: str = os.getenv("APP_NAME", "FastAPI")
DEBUG: bool = bool(os.getenv("DEBUG", False))

# FrontEnd Application
# FRONTEND_HOST: str = os.environ.get(
#     "FRONTEND_HOST", "http://localhost:3000")
FRONTEND_HOST = ""
# MongoDB Config
MONGODB_URL: str = os.getenv("MONGODB_URL")

# JWT Secret Key
JWT_SECRET: str = os.getenv(
    "JWT_SECRET")
JWT_ALGORITHM: str = os.getenv("ACCESS_TOKEN_ALGORITHM")
ACCESS_TOKEN_EXPIRE_MINUTES: int = int(
    os.getenv("ACCESS_TOKEN_EXPIRE_MINUTES"))
REFRESH_TOKEN_EXPIRE_MINUTES: int = int(
    os.getenv("REFRESH_TOKEN_EXPIRE_MINUTES"))

# App Secret Key
SECRET_KEY: str = os.getenv(
    "SECRET_KEY")
# class Settings(BaseSettings):
#     # App


# print(f"REFRESH_TOKEN_EXPIRE_MINUTES: {REFRESH_TOKEN_EXPIRE_MINUTES}")


# @lru_cache()
# def get_settings() -> Settings:
#     return Settings()
