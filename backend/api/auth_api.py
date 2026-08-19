from fastapi import APIRouter
from pydantic import BaseModel
from backend.database.connection import get_connection

router= APIRouter()


class LoginRequest(BaseModel):
    email: str
    password: str
    user_type: str


@router.post("/auth/login")
def login_user(login: LoginRequest):

    conn = get_connection()
    cur = conn.cursor()

    if login.user_type.lower() == "student":

        cur.execute(
            """
            SELECT student_id, full_name
            FROM students
            WHERE email = %s AND password_hash = %s
            """,
            (login.email, login.password)
        )

        user = cur.fetchone()

        if user is None:
            cur.close()
            conn.close()

            return {
                "success": False,
                "message": "Invalid student email or password"
            }

        student_id, full_name = user

        cur.close()
        conn.close()

        return {
            "success": True,
            "message": "Student login successful",
            "user_type": "student",
            "student_id": student_id,
            "full_name": full_name
        }

    elif login.user_type.lower() == "librarian":

        cur.execute(
            """
            SELECT full_name
            FROM librarians
            WHERE email = %s AND password_hash = %s
            """,
            (login.email, login.password)
        )

        user = cur.fetchone()

        if user is None:
            cur.close()
            conn.close()

            return {
                "success": False,
                "message": "Invalid librarian email or password"
            }

        full_name = user[0]

        cur.close()
        conn.close()

        return {
            "success": True,
            "message": "Librarian login successful",
            "user_type": "librarian",
            "full_name": full_name
        }

    else:

        cur.close()
        conn.close()

        return {
            "success": False,
            "message": "Invalid user type"
        }
    