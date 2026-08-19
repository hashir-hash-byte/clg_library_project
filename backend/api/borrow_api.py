from datetime import date, timedelta

from fastapi import FastAPI, APIRouter, HTTPException
from pydantic import BaseModel

from backend.database.connection import get_connection


router = APIRouter()


class BorrowCreate(BaseModel):
    student_id: int
    book_id: int


@router.post("/borrow")
def borrow_book(book: BorrowCreate):

    conn = get_connection()
    cur = conn.cursor()

    try:
        # Check student
        cur.execute(
            """
            SELECT student_id
            FROM students
            WHERE student_id = %s
            """,
            (book.student_id,)
        )

        student = cur.fetchone()

        if student is None:
            raise HTTPException(
                status_code=404,
                detail="Student not found"
            )

        # Check book and available copies
        cur.execute(
            """
            SELECT book_id, available_copies
            FROM books
            WHERE book_id = %s
            """,
            (book.book_id,)
        )

        book_data = cur.fetchone()

        if book_data is None:
            raise HTTPException(
                status_code=404,
                detail="Book not found"
            )

        if book_data[1] <= 0:
            raise HTTPException(
                status_code=400,
                detail="Book is not available"
            )

        # Dates
        borrow_date = date.today()
        due_date = borrow_date + timedelta(days=14)

        # Create borrow record
        cur.execute(
            """
            INSERT INTO borrow_records
            (student_id, book_id, borrow_date, due_date, status)
            VALUES (%s, %s, %s, %s, %s)
            RETURNING borrow_id
            """,
            (
                book.student_id,
                book.book_id,
                borrow_date,
                due_date,
                "Borrowed"
            )
        )

        borrow_id = cur.fetchone()[0]

        # Decrease available copies
        cur.execute(
            """
            UPDATE books
            SET available_copies = available_copies - 1
            WHERE book_id = %s
            """,
            (book.book_id,)
        )

        conn.commit()

        return {
            "success": True,
            "message": "Book borrowed successfully",
            "borrow_id": borrow_id,
            "student_id": book.student_id,
            "book_id": book.book_id,
            "borrow_date": borrow_date,
            "due_date": due_date,
            "status": "Borrowed"
        }

    except HTTPException:
        conn.rollback()
        raise

    except Exception as e:
        conn.rollback()
        raise HTTPException(
            status_code=500,
            detail=f"Internal server error: {str(e)}"
        )

    finally:
        cur.close()
        conn.close()

app = FastAPI()

app.include_router(router)