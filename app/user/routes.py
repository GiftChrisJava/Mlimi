from fastapi import APIRouter, HTTPException, BackgroundTasks, Depends, status, Header
from fastapi.responses import JSONResponse
from fastapi.security import OAuth2PasswordRequestForm, OAuth2PasswordBearer

from config.database import get_database
from user.responses import UserResponse, LoginResponse
from user.schemas import RegisterUserRequest, ResetRequest, VerifyUserRequest, EmailRequest, LoginRequest
from user.services import create_user_account, activate_user_account, get_login_token, get_refresh_token, email_forgot_password_link, reset_user_password
from config.security import get_current_user, oauth2_scheme
# from user.model import User
# from config.database import item_table
# from user.schemas import list_items

from bson import ObjectId


user_router = APIRouter(responses={404: {"description": "Not found"}},)

guest_router = APIRouter(responses={404: {"description": "Not found"}},)


auth_router = APIRouter(responses={404: {"description": "Not found"}},
                        dependencies=[Depends(oauth2_scheme), Depends(get_current_user)])


# Post Request Method for Registering a User
@user_router.post("/register", status_code=status.HTTP_201_CREATED)
async def register_account(data: RegisterUserRequest, background_tasks: BackgroundTasks, db=Depends(get_database)):
    return await create_user_account(data, background_tasks)


# Post Request Method for Verifying User Account
@user_router.post("/verify", status_code=status.HTTP_200_OK)
async def verify_account(data: VerifyUserRequest, background_tasks: BackgroundTasks, db=Depends(get_database)):
    await activate_user_account(data, background_tasks)
    return JSONResponse({"message": "Account is activated successfully."})



# Post Request Method for Verifying User Account
@user_router.post("/login", status_code=status.HTTP_200_OK, response_model=LoginResponse)
async def user_login(data: LoginRequest, db=Depends(get_database)):
    return await get_login_token(data)

# Post Request Method for Verifying User Account


# @guest_router.post("/refresh", status_code=status.HTTP_200_OK, response_model=LoginResponse)
# async def refresh_token(refresh_token=Header(), db=Depends(get_database)):
#     return await get_refresh_token(refresh_token)

# Post Request Method for Verifying User Account


@user_router.post("/forgot-password", status_code=status.HTTP_200_OK)
async def forgot_password(data: EmailRequest, background_tasks: BackgroundTasks, db=Depends(get_database)):
    await email_forgot_password_link(data, background_tasks)
    return JSONResponse({"message": "A email with password reset link has been sent to you."})


# Post Request Method for Verifying User Account
# @guest_router.put("/reset-password", status_code=status.HTTP_200_OK)
# async def reset_password(data: ResetRequest, db=Depends(get_database)):
#     await reset_user_password(data)
#     return JSONResponse({"message": "Your password has been updated."})
