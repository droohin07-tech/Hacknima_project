from functools import wraps

from flask import session, jsonify


def login_required(function):
    """
    Allows access only to logged-in users.
    """

    @wraps(function)
    def decorated_function(*args, **kwargs):
        if "user_id" not in session:
            return jsonify({
                "success": False,
                "message": "Authentication required."
            }), 401

        return function(*args, **kwargs)

    return decorated_function


def role_required(required_role):
    """
    Allows access only to users with a specific role.
    """

    def decorator(function):
        @wraps(function)
        def decorated_function(*args, **kwargs):
            if "user_id" not in session:
                return jsonify({
                    "success": False,
                    "message": "Authentication required."
                }), 401

            if session.get("role") != required_role:
                return jsonify({
                    "success": False,
                    "message": "You do not have permission to access this resource."
                }), 403

            return function(*args, **kwargs)

        return decorated_function

    return decorator