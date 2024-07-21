from app.utils.string import unique_string
from app.utils.email_context import FORGOT_PASSWORD, USER_VERIFY_ACCOUNT
from app.user.email import (
    send_account_activation_confirmation_email,
    send_account_verification_email, send_password_reset_email
)
from app.config.security import (
    generate_token, get_token_payload, hash_password,
    is_password_strong_enough, load_user, str_decode,
    str_encode, verify_password
)

from fastapi import HTTPException, BackgroundTasks
import logging
from datetime import datetime, timedelta
from app.config.database import users_table, token_table
from app.config.settings import JWT_ALGORITHM, JWT_SECRET
from app.user.models import User, UserToken
from app.user.responses import UserResponse
from bson import ObjectId


async def create_user_account(data, background_tasks: BackgroundTasks):
    if users_table.find_one({"email": data.email}):
        raise HTTPException(status_code=400, detail="Email already exists.")

    # if not is_password_strong_enough(data.password):
    #     raise HTTPException(
    #         status_code=400, detail="Please provide a strong password.")

      # later on change it to default false
        # later change it to record time when one verifies it
    user = {
        "name": data.name,
        "email": data.email,
        "username": data.username,
        "password": hash_password(data.password),
        "is_active": True,
        "created_at": datetime.utcnow(),
        "verified_at": datetime.utcnow(),
        "updated_at": datetime.utcnow()
    }
    # user = UserResponse(data.name, data.email, data.username, hash_password(
    #     data.password), True, datetime.utcnow(), datetime.utcnow(),)
    result = users_table.insert_one(user)
    user_dict = users_table.find_one({"_id": result.inserted_id})
    user_dict["id"] = str(user_dict["_id"])
    # # Remove the _id field if it's not needed in UserResponse
    # user_dict.pop("_id")
    response = dict(UserResponse(**user_dict))

    return {"message": f"Account with username: {response['username']} and email: {response['email']} has been successfully created"}


async def activate_user_account(data, background_tasks: BackgroundTasks):
    user_data = users_table.find_one({"email": data.email})
    if not user_data:
        raise HTTPException(status_code=400, detail="This link is not valid.")

    user = User(**user_data)
    user_token = user.get_context_string(context=USER_VERIFY_ACCOUNT)

    try:
        token_valid = verify_password(user_token, data.token)
    except Exception as verify_exec:
        logging.exception(verify_exec)
        token_valid = False

    if not token_valid:
        raise HTTPException(
            status_code=400, detail="This link either expired or not valid.")

    user.is_active = True
    user.verified_at = datetime.utcnow()
    user.updated_at = datetime.utcnow()
    user.save()

    await send_account_activation_confirmation_email(user, background_tasks)
    return user


async def get_login_token(data):
    user_data = users_table.find_one({"email": data.email})
    if not user_data:
        raise HTTPException(
            status_code=400, detail="Email is not registered with us.")

    # user = User(**user_data)
    # print(f"user data ;;;;;;;;;;;;;;;; {user_data}")
    # user = {"id": user_data._id, **user_data}
    user = user_data

    if not verify_password(data.password, user['password']):
        raise HTTPException(
            status_code=400, detail="Incorrect email or password.")

    if not user['verified_at']:
        raise HTTPException(
            status_code=400, detail="Your account is not verified. Please check your email inbox to verify your account.")

    if not user['is_active']:
        raise HTTPException(
            status_code=400, detail="Your account has been deactivated. Please contact support.")

    return _generate_tokens(user)


async def get_refresh_token(refresh_token):
    token_payload = get_token_payload(
        refresh_token, "649fb93ef34e4fdf4187709c84d643dd61ce730d91856418fdcf563f895ea40f", "HS256")
    if not token_payload:
        raise HTTPException(status_code=400, detail="Invalid Request.")

    refresh_key = token_payload.get('t')
    access_key = token_payload.get('a')
    user_id = str_decode(token_payload.get('sub'))

    user_token_data = token_table.find_one({
        "refresh_key": refresh_key,
        "access_key": access_key,
        "user_id": ObjectId(user_id),
        "expires_at": {"$gt": datetime.utcnow()}
    })

    if not user_token_data:
        raise HTTPException(status_code=400, detail="Invalid Request.")

    user_token = UserToken(**user_token_data)
    user_token.expires_at = datetime.utcnow()
    # user_token.sav/e()
    token_table.insert_one(user_token.dict())

    user_data = token_table.find_one({"_id": user_token.user_id})
    user = User(**user_data)

    return _generate_tokens(user)


def _generate_tokens(user):
    refresh_key = unique_string(100)
    access_key = unique_string(50)
    rt_expires = timedelta(minutes=1440)

    user_token = UserToken(
        user_id=str(user['_id']),
        refresh_key=refresh_key,
        access_key=access_key,
        expires_at=datetime.utcnow() + rt_expires
    )
    # user_token.save()
    token_table.insert_one(user_token.dict())

    at_payload = {
        "sub": str_encode(str(user['_id'])),
        'a': access_key,
        'r': str_encode(str(user_token.user_id)),
        'n': str_encode(user['name'])
    }

# access token expire
    at_expires = timedelta(minutes=30)
    access_token = generate_token(
        at_payload, "649fb93ef34e4fdf4187709c84d643dd61ce730d91856418fdcf563f895ea40f", "HS256", at_expires)
    # access_token = generate_token(
    #     at_payload, JWT_SECRET, JWT_ALGORITHM, at_expires)

    rt_payload = {"sub": str_encode(
        str(user['_id'])), "t": refresh_key, 'a': access_key}

    refresh_token = generate_token(
        at_payload, "649fb93ef34e4fdf4187709c84d643dd61ce730d91856418fdcf563f895ea40f", "HS256", at_expires)

    return {
        "access_token": access_token,
        "refresh_token": refresh_token,
        "expires_in": at_expires.seconds
    }


async def email_forgot_password_link(data, background_tasks: BackgroundTasks):
    user_data = users_table.find_one({"email": data.email})
    if not user_data:
        raise HTTPException(
            status_code=400, detail="Email is not registered with us.")

    user = User(**user_data)

    if not user.verified_at:
        raise HTTPException(
            status_code=400, detail="Your account is not verified. Please check your email inbox to verify your account.")

    if not user.is_active:
        raise HTTPException(
            status_code=400, detail="Your account has been deactivated. Please contact support.")

    await send_password_reset_email(user, background_tasks)


async def reset_user_password(data):
    user_data = users_table.find_one({"email": data.email})
    if not user_data:
        raise HTTPException(status_code=400, detail="Invalid request")

    user = User(**user_data)

    if not user.verified_at:
        raise HTTPException(status_code=400, detail="Invalid request")

    if not user.is_active:
        raise HTTPException(status_code=400, detail="Invalid request")

    user_token = user.get_context_string(context=FORGOT_PASSWORD)
    try:
        token_valid = verify_password(user_token, data.token)
    except Exception as verify_exec:
        logging.exception(verify_exec)
        token_valid = False

    if not token_valid:
        raise HTTPException(status_code=400, detail="Invalid window.")

    user.password = hash_password(data.password)
    user.updated_at = datetime.now()
    user.save()


async def fetch_user_detail(pk):
    user_data = users_table.find_one({"_id": ObjectId(pk)})
    if user_data:
        return User(**user_data)
    raise HTTPException(status_code=400, detail="User does not exist.")
