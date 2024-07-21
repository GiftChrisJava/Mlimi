from pymongo.server_api import ServerApi
from pymongo.mongo_client import MongoClient

import os
from dotenv import load_dotenv, dotenv_values

load_dotenv()

uri = os.getenv("MONGODB_URL")

client = MongoClient(uri, server_api=ServerApi('1'))


db = client.mlimi_db

# database tables
item_table = db["items"]

recommendation_table = db["recommendations"]

users_table = db["users"]

token_table = db["user_tokens"]


def get_database():
    return db
