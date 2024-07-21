import os
from pathlib import Path
from fastapi_mail import FastMail, MessageSchema, MessageType, ConnectionConfig
from fastapi.background import BackgroundTasks
from config.settings import APP_NAME

# settings = get_settings()

# Helper function to convert environment variables to appropriate types


# def get_env_var(name: str, default, cast_type=str):
#     value = os.environ.get(name, default)
#     if cast_type == bool:
#         return value.lower() in ['true', '1', 'yes']
#     return cast_type(value)


# Configure email settings
# conf = ConnectionConfig(
#     MAIL_USERNAME=os.environ.get("MAIL_USERNAME", ""),
#     MAIL_PASSWORD=os.environ.get("MAIL_PASSWORD", ""),
#     MAIL_PORT=os.environ.get("MAIL_PORT", 1025),
#     MAIL_SERVER=os.environ.get("MAIL_SERVER", "smtp"),
#     MAIL_STARTTLS=os.environ.get("MAIL_STARTTLS", False),
#     MAIL_SSL_TLS=os.environ.get("MAIL_SSL_TLS", False),
#     MAIL_DEBUG=True,
#     MAIL_FROM=os.environ.get("MAIL_FROM", 'noreply@test.com'),
#     MAIL_FROM_NAME=os.environ.get("MAIL_FROM_NAME", settings.APP_NAME),
#     # TEMPLATE_FOLDER=Path(__file__).parent.parent / "templates",
#     USE_CREDENTIALS=os.environ.get("USE_CREDENTIALS", True)
# )
conf = ConnectionConfig(
    MAIL_USERNAME=os.getenv("MAIL_USERNAME", ""),
    MAIL_PASSWORD=os.getenv("MAIL_PASSWORD", ""),
    MAIL_PORT=int(os.getenv("MAIL_PORT", 1025)),
    MAIL_SERVER=os.getenv("MAIL_SERVER", "smtp"),
    MAIL_STARTTLS=bool(os.getenv("MAIL_STARTTLS", "False")),
    MAIL_SSL_TLS=bool(os.getenv("MAIL_SSL_TLS", "False")),
    MAIL_DEBUG=True,
    MAIL_FROM=os.getenv("MAIL_FROM", 'noreply@test.com'),
    MAIL_FROM_NAME=os.getenv("MAIL_FROM_NAME", APP_NAME),
    USE_CREDENTIALS=bool(os.getenv("USE_CREDENTIALS", "True"))
)

fm = FastMail(conf)


async def send_email(recipients: list[str], subject: str, context: dict, template_name: str,
                     background_tasks: BackgroundTasks):
    """Send an email with the given parameters using FastAPI Mail."""
    message = MessageSchema(
        subject=subject,
        recipients=recipients,
        template_body=context,
        subtype=MessageType.html
    )

    # Add the email sending task to the background tasks
    background_tasks.add_task(send_email_task, message, template_name)


async def send_email_task(message: MessageSchema, template_name: str):
    """Helper function to send an email."""
    try:
        await fm.send_message(message, template_name=template_name)
        # Add logging for successful email sending
        print(f"Email sent to {message.recipients}")
    except Exception as e:
        # Add logging for email sending failure
        print(f"Failed to send email: {str(e)}")
