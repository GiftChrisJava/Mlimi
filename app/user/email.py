from fastapi import BackgroundTasks
# from config.settings import get_settings
from config.settings import APP_NAME,FRONTEND_HOST
from user.models import User
from config.email import send_email
from utils.email_context import USER_VERIFY_ACCOUNT, FORGOT_PASSWORD

# settings = get_settings()


async def send_account_verification_email(user: User, background_tasks: BackgroundTasks):
    from config.security import hash_password
    string_context = user.get_context_string(context=USER_VERIFY_ACCOUNT)
    token = hash_password(string_context)
    activate_url = f"{FRONTEND_HOST}/auth/account-verify?token={token}&email={user.email}"
    data = {
        'app_name': APP_NAME,
        "name": user.name,
        'activate_url': activate_url
    }
    subject = f"Account Verification - {APP_NAME}"
    await send_email(
        recipients=[user.email],
        subject=subject,
        template_name="user/account-verification.html",
        context=data,
        background_tasks=background_tasks
    )


async def send_account_activation_confirmation_email(user: User, background_tasks: BackgroundTasks):
    data = {
        'app_name': APP_NAME,
        "name": user.name,
        'login_url': f'{FRONTEND_HOST}'
    }
    subject = f"Welcome - {APP_NAME}"
    await send_email(
        recipients=[user.email],
        subject=subject,
        template_name="user/account-verification-confirmation.html",
        context=data,
        background_tasks=background_tasks
    )


async def send_password_reset_email(user: User, background_tasks: BackgroundTasks):
    from config.security import hash_password
    string_context = user.get_context_string(context=FORGOT_PASSWORD)
    token = hash_password(string_context)
    reset_url = f"{FRONTEND_HOST}/reset-password?token={token}&email={user.email}"
    data = {
        'app_name': APP_NAME,
        "name": user.name,
        'activate_url': reset_url,
    }
    subject = f"Reset Password - {APP_NAME}"
    await send_email(
        recipients=[user.email],
        subject=subject,
        template_name="user/password-reset.html",
        context=data,
        background_tasks=background_tasks
    )


# import os
# from fastapi import BackgroundTasks
# from pymongo import MongoClient
# from app.config.import get_settings
# from app.utils.email_context import USER_VERIFY_ACCOUNT, FORGOT_PASSWORD
# from app.config.email import send_email
# from app.config.security import hash_password

# settings = get_settings()

# # MongoDB connection setup
# client = MongoClient(settings.MONGODB_URI)
# db = client[settings.MONGODB_DB_NAME]

# async def get_user_by_email(email: str) -> dict:
#     """Retrieve a user from MongoDB by email."""
#     users_collection = db['users']
#     user = users_collection.find_one({"email": email})
#     return user

# async def send_account_verification_email(email: str, background_tasks: BackgroundTasks):
#     """
#     Sends an account verification email to the user by email.

#     Args:
#         email (str): The email of the user who will receive the email.
#         background_tasks (BackgroundTasks): FastAPI BackgroundTasks instance.
#     """
#     user = await get_user_by_email(email)
#     if not user:
#         print(f"User not found: {email}")
#         return

#     string_context = user.get('context_string', '')
#     token = hash_password(string_context)
#     activate_url = f"{settings.FRONTEND_HOST}/auth/account-verify?token={token}&email={email}"
#     data = {
#         'app_name': settings.APP_NAME,
#         "name": user.get('name', 'User'),
#         'activate_url': activate_url
#     }
#     subject = f"Account Verification - {settings.APP_NAME}"

#     try:
#         await send_email(
#             recipients=[email],
#             subject=subject,
#             template_name="user/account-verification.html",
#             context=data,
#             background_tasks=background_tasks
#         )
#         print(f"Account verification email sent to {email}")
#     except Exception as e:
#         print(f"Failed to send account verification email: {str(e)}")

# async def send_account_activation_confirmation_email(email: str, background_tasks: BackgroundTasks):
#     """
#     Sends an account activation confirmation email to the user by email.

#     Args:
#         email (str): The email of the user who will receive the email.
#         background_tasks (BackgroundTasks): FastAPI BackgroundTasks instance.
#     """
#     user = await get_user_by_email(email)
#     if not user:
#         print(f"User not found: {email}")
#         return

#     data = {
#         'app_name': settings.APP_NAME,
#         "name": user.get('name', 'User'),
#         'login_url': f'{settings.FRONTEND_HOST}'
#     }
#     subject = f"Welcome - {settings.APP_NAME}"

#     try:
#         await send_email(
#             recipients=[email],
#             subject=subject,
#             template_name="user/account-verification-confirmation.html",
#             context=data,
#             background_tasks=background_tasks
#         )
#         print(f"Account activation confirmation email sent to {email}")
#     except Exception as e:
#         print(f"Failed to send account activation confirmation email: {str(e)}")

# async def send_password_reset_email(email: str, background_tasks: BackgroundTasks):
#     """
#     Sends a password reset email to the user by email.

#     Args:
#         email (str): The email of the user who will receive the email.
#         background_tasks (BackgroundTasks): FastAPI BackgroundTasks instance.
#     """
#     user = await get_user_by_email(email)
#     if not user:
#         print(f"User not found: {email}")
#         return

#     string_context = user.get('context_string', '')
#     token = hash_password(string_context)
#     reset_url = f"{settings.FRONTEND_HOST}/reset-password?token={token}&email={email}"
#     data = {
#         'app_name': settings.APP_NAME,
#         "name": user.get('name', 'User'),
#         'activate_url': reset_url,
#     }
#     subject = f"Reset Password - {settings.APP_NAME}"

#     try:
#         await send_email(
#             recipients=[email],
#             subject=subject,
#             template_name="user/password-reset.html",
#             context=data,
#             background_tasks=background_tasks
#         )
#         print(f"Password reset email sent to {email}")
#     except Exception as e:
#         print(f"Failed to send password reset email: {str(e)}")
