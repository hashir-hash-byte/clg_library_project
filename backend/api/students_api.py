from fastapi import APIRouter
from pydantic import BaseModel
from backend.database.connection import get_connection

router = APIRouter()


class StudentCreate(BaseModel):
    full_name: str
    email: str
    department: str
    phone: str
    password_hash: str


@router.post("/students")
def create_student(student: StudentCreate):

    conn = get_connection()
    cur = conn.cursor()

    cur.execute(
        """
        INSERT INTO students
        (full_name, email, department, phone, password_hash)
        VALUES (%s, %s, %s, %s, %s)
        RETURNING student_id
        """,
        (
            student.full_name,
            student.email,
            student.department,
            student.phone,
            student.password_hash,
        )
    )

    student_id = cur.fetchone()[0]

    conn.commit()

    cur.close()
    conn.close()

    return {
        "success": True,
        "message": "Student added successfully",
        "student_id": student_id
    }
@router.get("/students")
def get_students():

    conn = get_connection()
    cur = conn.cursor()

    cur.execute("SELECT * FROM students ORDER BY student_id")

    rows = cur.fetchall()
    columns = [desc[0] for desc in cur.description]

    students = [dict(zip(columns, row)) for row in rows]

    cur.close()
    conn.close()

    return students
@router.get("/students/{student_id}")
def get_student(student_id: int):

    conn = get_connection()
    cur = conn.cursor()

    cur.execute(
        """
        SELECT student_id, full_name, email, department, phone, created_at
        FROM students
        WHERE student_id = %s
        """,
        (student_id,)
    )

    row = cur.fetchone()

    if row is None:
        cur.close()
        conn.close()
        return {
            "success": False,
            "message": "Student not found"
        }

    columns = [desc[0] for desc in cur.description]
    student = dict(zip(columns, row))

    cur.close()
    conn.close()

    return student
@router.put("/students/{student_id}")
def update_student(student_id: int, student: StudentCreate):

    conn = get_connection()
    cur = conn.cursor()

    cur.execute(
        """
        UPDATE students
        SET full_name = %s,
            email = %s,
            department = %s,
            phone = %s,
            password_hash = %s
        WHERE student_id = %s
        RETURNING student_id
        """,
        (
            student.full_name,
            student.email,
            student.department,
            student.phone,
            student.password_hash,
            student_id
        )
    )

    result = cur.fetchone()

    if result is None:
        conn.rollback()
        cur.close()
        conn.close()

        return {
            "success": False,
            "message": "Student not found"
        }

    conn.commit()

    cur.close()
    conn.close()

    return {
        "success": True,
        "message": "Student updated successfully",
        "student_id": result[0]
    }
@router.delete("/students/{student_id}")
def delete_student(student_id: int):

    conn = get_connection()
    cur = conn.cursor()

    cur.execute(
        """
        DELETE FROM students
        WHERE student_id = %s
        RETURNING student_id
        """,
        (student_id,)
    )

    result = cur.fetchone()

    if result is None:
        conn.rollback()
        cur.close()
        conn.close()

        return {
            "success": False,
            "message": "Student not found"
        }

    conn.commit()

    cur.close()
    conn.close()

    return {
        "success": True,
        "message": "Student deleted successfully",
        "student_id": result[0]
    }
    