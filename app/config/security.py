import logging
from fastapi import Depends, HTTPException
from fastapi.security import OAuth2PasswordBearer
import jwt
from passlib.context import CryptContext
import base64
from datetime import datetime, timedelta
# from pymongo import MongoClient
from app.config.database import users_table, token_table
from app.config.settings import JWT_ALGORITHM, JWT_SECRET

SPECIAL_CHARACTERS = ['@', '#', '$', '%',
                      '=', ':', '?', '.', '/', '|', '~', '>']


pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")
oauth2_scheme = OAuth2PasswordBearer(tokenUrl="/auth/")


def hash_password(password: str) -> str:
    """Hashes a password using bcrypt."""
    return pwd_context.hash(password)


def verify_password(plain_password: str, hashed_password: str) -> bool:
    """Verifies a plain password against a hashed password."""
    return pwd_context.verify(plain_password, hashed_password)


def is_password_strong_enough(password: str) -> bool:
    """Checks if the password meets the strength criteria."""
    if len(password) < 8:
        return False
    if not any(char.isupper() for char in password):
        return False
    if not any(char.islower() for char in password):
        return False
    if not any(char.isdigit() for char in password):
        return False
    if not any(char in SPECIAL_CHARACTERS for char in password):
        return False
    return True


def str_encode(string: str) -> str:
    """Encodes a string to Base85."""
    return base64.b85encode(string.encode('ascii')).decode('ascii')


def str_decode(string: str) -> str:
    """Decodes a Base85 encoded string."""
    return base64.b85decode(string.encode('ascii')).decode('ascii')


def get_token_payload(token: str, secret: str, algo: str):
    """Decodes the JWT token and returns the payload."""
    try:
        return jwt.decode(token, secret, algorithms=[algo])
    except Exception as e:
        logging.error(f"JWT decoding error: {str(e)}")
        return None


def generate_token(payload: dict, secret: str, algo: str, expiry: timedelta) -> str:
    """Generates a JWT token with the given payload and expiry."""
    expire = datetime.utcnow() + expiry
    payload.update({"exp": expire})
    return jwt.encode(payload, secret, algorithm=algo)


async def get_token_user(token: str):
    """Retrieves a user from the token."""
    payload = get_token_payload(
        token, "649fb93ef34e4fdf4187709c84d643dd61ce730d91856418fdcf563f895ea40f", "HS256")
    if payload:
        user_token_id = str_decode(payload.get('r'))
        user_id = str_decode(payload.get('sub'))
        access_key = payload.get('a')
        # user_tokens_collection = token_table
        user_token = token_table.find_one({
            'access_key': access_key,
            'id': user_token_id,
            'user_id': user_id,
            'expires_at': {'$gt': datetime.utcnow()}
        })
        if user_token:
            # users_collection = users_table
            user = users_table.find_one({'_id': user_id})
            return user
    return None


async def load_user(email: str):
    """Loads a user by email."""
    # users_collection = db['users']
    try:
        return users_table.find_one({'email': email})
    except Exception as e:
        logging.error(f"Error loading user: {str(e)}")
        return None


async def get_current_user(token: str = Depends(oauth2_scheme)):
    """Gets the currently authenticated user based on the provided token."""
    user = await get_token_user(token=token)
    if user:
        return user
    raise HTTPException(status_code=401, detail="Not authorized.")
