import sqlite3
from pathlib import Path

BASE_DIR = Path(__file__).resolve().parent.parent
DATA_DIR = BASE_DIR / "data"
DATABASE_PATH = DATA_DIR / "alumncomi.db"
SCHEMA_PATH = Path(__file__).resolve().parent / "schema.sql"


def get_connection():
    DATA_DIR.mkdir(parents=True, exist_ok=True)

    connection = sqlite3.connect(DATABASE_PATH)
    connection.row_factory = sqlite3.Row
    connection.execute("PRAGMA foreign_keys = ON")

    return connection


def initialize_database():
    print(f"Database path: {DATABASE_PATH}")
    print(f"Schema path: {SCHEMA_PATH}")

    if not SCHEMA_PATH.exists():
        raise FileNotFoundError(
            f"schema.sql was not found at: {SCHEMA_PATH}"
        )

    connection = get_connection()

    try:
        schema_script = SCHEMA_PATH.read_text(encoding="utf-8")
        connection.executescript(schema_script)
        connection.commit()

        print("Database initialized successfully.")

    except Exception as error:
        connection.rollback()
        print(f"Database initialization failed: {error}")
        raise

    finally:
        connection.close()


def test_connection():
    connection = None

    try:
        connection = get_connection()
        connection.execute("SELECT 1")
        return True

    except sqlite3.Error as error:
        print(f"Database connection failed: {error}")
        return False

    finally:
        if connection:
            connection.close()