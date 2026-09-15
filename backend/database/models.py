from database.db import get_connection


def create_user(name, email, password_hash, role):
    """
    Creates a user and an empty role-specific profile
    inside one database transaction.
    """

    connection = get_connection()

    try:
        cursor = connection.cursor()

        # Create the main user account
        cursor.execute(
            """
            INSERT INTO users (name, email, password_hash, role)
            VALUES (?, ?, ?, ?)
            """,
            (name, email, password_hash, role)
        )

        user_id = cursor.lastrowid

        # Create the matching role-specific profile
        if role == "student":
            cursor.execute(
                """
                INSERT INTO student_profiles (user_id)
                VALUES (?)
                """,
                (user_id,)
            )

        elif role == "mentor":
            cursor.execute(
                """
                INSERT INTO mentor_profiles (user_id)
                VALUES (?)
                """,
                (user_id,)
            )

        elif role == "hiring_manager":
            cursor.execute(
                """
                INSERT INTO hiring_profiles (user_id)
                VALUES (?)
                """,
                (user_id,)
            )

        else:
            raise ValueError("Invalid user role.")

        # Commit both inserts together
        connection.commit()

        return user_id

    except Exception:
        # If either insert fails, undo everything
        connection.rollback()
        raise

    finally:
        connection.close()


def get_user_by_email(email):
    """
    Finds a user by email.
    """

    connection = get_connection()

    try:
        cursor = connection.cursor()

        cursor.execute(
            """
            SELECT *
            FROM users
            WHERE email = ?
            """,
            (email,)
        )

        return cursor.fetchone()

    finally:
        connection.close()


def get_user_by_id(user_id):
    """
    Finds a user by ID.
    """

    connection = get_connection()

    try:
        cursor = connection.cursor()

        cursor.execute(
            """
            SELECT *
            FROM users
            WHERE id = ?
            """,
            (user_id,)
        )

        return cursor.fetchone()

    finally:
        connection.close()


def get_all_users():
    """
    Returns all users.
    """

    connection = get_connection()

    try:
        cursor = connection.cursor()

        cursor.execute(
            """
            SELECT id, name, email, role, created_at
            FROM users
            ORDER BY id DESC
            """
        )

        return cursor.fetchall()

    finally:
        connection.close()