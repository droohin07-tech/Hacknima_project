from pathlib import Path

from flask import Flask, jsonify, request, session, send_from_directory
from flask_cors import CORS

from database.db import initialize_database, test_connection
from auth.auth_service import (
    register_user,
    login_user,
    get_authenticated_user
)


# =========================================================
# PROJECT PATHS
# =========================================================

BACKEND_DIR = Path(__file__).resolve().parent
PROJECT_DIR = BACKEND_DIR.parent

FRONTEND_DIR = PROJECT_DIR / "frontend"
HTML_DIR = FRONTEND_DIR / "html"


# =========================================================
# APP CREATION
# =========================================================

def create_app():

    app = Flask(__name__)

    app.secret_key = "alumncomi-development-secret-key"

    CORS(
        app,
        supports_credentials=True
    )

    initialize_database()

    # =====================================================
    # MAIN PAGE
    # =====================================================

    @app.route("/")
    def home():

        return send_from_directory(
            HTML_DIR,
            "index.html"
        )

    # =====================================================
    # FRONTEND FILES
    # Example:
    # /frontend/html/student_login.html
    # /frontend/css/slogin.css
    # =====================================================

    @app.route("/frontend/<path:filename>")
    def frontend_files(filename):

        return send_from_directory(
            FRONTEND_DIR,
            filename
        )

    # =====================================================
    # STUDENT LOGIN PAGE
    # =====================================================

    @app.route("/student-login")
    def student_login_page():

        return send_from_directory(
            HTML_DIR,
            "student_login.html"
        )

    # =====================================================
    # MENTOR LOGIN PAGE
    # =====================================================

    @app.route("/mentor-login")
    def mentor_login_page():

        return send_from_directory(
            HTML_DIR,
            "mentor_login.html"
        )

    # =====================================================
    # HIRING MANAGER LOGIN PAGE
    # =====================================================

    @app.route("/hiring-login")
    def hiring_login_page():

        return send_from_directory(
            HTML_DIR,
            "hiring_login.html"
        )

    # =====================================================
    # STUDENT MAIN PAGE
    # =====================================================

    @app.route("/student-home")
    def student_home_page():

        return send_from_directory(
            HTML_DIR,
            "smain.html"
        )

    # =====================================================
    # MENTOR MAIN PAGE
    # =====================================================

    @app.route("/mentor-home")
    def mentor_home_page():

        return send_from_directory(
            HTML_DIR,
            "mmain.html"
        )

    # =====================================================
    # HIRING MANAGER MAIN PAGE
    # =====================================================

    @app.route("/hiring-home")
    def hiring_home_page():

        return send_from_directory(
            HTML_DIR,
            "hmain.html"
        )

    # =====================================================
    # HEALTH CHECK
    # =====================================================

    @app.route("/api/health")
    def health_check():

        database_status = test_connection()

        return jsonify({
            "success": True,
            "backend": "running",
            "database": (
                "connected"
                if database_status
                else "disconnected"
            )
        })

    # =====================================================
    # REGISTER
    # =====================================================

    @app.route("/api/auth/register", methods=["POST"])
    def register():

        data = request.get_json(silent=True) or {}

        result = register_user(
            name=data.get("name"),
            email=data.get("email"),
            password=data.get("password"),
            role=data.get("role")
        )

        if result["success"]:
            return jsonify(result), 201

        return jsonify(result), 400

    # =====================================================
    # LOGIN
    # =====================================================

    @app.route("/api/auth/login", methods=["POST"])
    def login():

        data = request.get_json(silent=True) or {}

        result = login_user(
            email=data.get("email"),
            password=data.get("password"),
            role=data.get("role")
        )

        if not result["success"]:
            return jsonify(result), 401

        user = result["user"]

        session["user_id"] = user["id"]
        session["role"] = user["role"]

        return jsonify({
            "success": True,
            "message": "Login successful.",
            "user": user
        })

    # =====================================================
    # LOGOUT
    # =====================================================

    @app.route("/api/auth/logout", methods=["POST"])
    def logout():

        session.clear()

        return jsonify({
            "success": True,
            "message": "Logout successful."
        })

    # =====================================================
    # CURRENT USER
    # =====================================================

    @app.route("/api/auth/me")
    def current_user():

        user_id = session.get("user_id")

        if not user_id:

            return jsonify({
                "success": False,
                "message": "Not logged in."
            }), 401

        user = get_authenticated_user(user_id)

        if not user:

            session.clear()

            return jsonify({
                "success": False,
                "message": "User account not found."
            }), 401

        return jsonify({
            "success": True,
            "user": user
        })

    return app


# =========================================================
# START APP
# =========================================================

app = create_app()


if __name__ == "__main__":

    app.run(
        host="127.0.0.1",
        port=5000,
        debug=True
    )