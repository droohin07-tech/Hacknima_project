from werkzeug.security import generate_password_hash, check_password_hash

from database.models import (
    create_user,
    get_user_by_email,
    get_user_by_id
)


VALID_ROLES = {
    "student",
    "mentor",
    "hiring_manager"
}


def register_user(name, email, password, role):
    """
    Registers a new user and creates the matching profile.
    """

    if not name or not email or not password or not role:
        return {
            "success": False,
            "message": "All fields are required."
        }

    name = name.strip()
    email = email.strip().lower()
    role = role.strip().lower()

    if not name:
        return {
            "success": False,
            "message": "Name cannot be empty."
        }

    if role not in VALID_ROLES:
        return {
            "success": False,
            "message": "Invalid user role."
        }

    if len(password) < 6:
        return {
            "success": False,
            "message": "Password must be at least 6 characters long."
        }

    existing_user = get_user_by_email(email)

    if existing_user:
        return {
            "success": False,
            "message": "An account with this email already exists."
        }

    password_hash = generate_password_hash(password)

    user_id = create_user(
        name=name,
        email=email,
        password_hash=password_hash,
        role=role
    )

    return {
        "success": True,
        "message": "Registration successful.",
        "user_id": user_id
    }


def login_user(email, password, role):
    """
    Verifies login credentials and selected role.
    """

    if not email or not password or not role:
        return {
            "success": False,
            "message": "Email, password, and role are required."
        }

    email = email.strip().lower()
    role = role.strip().lower()

    if role not in VALID_ROLES:
        return {
            "success": False,
            "message": "Invalid user role."
        }

    user = get_user_by_email(email)

    if not user:
        return {
            "success": False,
            "message": "Invalid email or password."
        }

    if user["role"] != role:
        return {
            "success": False,
            "message": "This account does not belong to the selected role."
        }

    if not check_password_hash(user["password_hash"], password):
        return {
            "success": False,
            "message": "Invalid email or password."
        }

    return {
        "success": True,
        "message": "Login successful.",
        "user": {
            "id": user["id"],
            "name": user["name"],
            "email": user["email"],
            "role": user["role"]
        }
    }


def get_authenticated_user(user_id):
    """
    Returns safe information for a logged-in user.
    """

    user = get_user_by_id(user_id)

    if not user:
        return None

    return {
        "id": user["id"],
        "name": user["name"],
        "email": user["email"],
        "role": user["role"]
    }