from datetime import date

from fastapi import FastAPI, APIRouter, HTTPException
from pydantic import BaseModel

from backend.database.connection import get_connection


router = APIRouter()


class ReturnBookRequest(BaseModel):
    student_id: int
    book_id: int


@router.post("/return")
def return_book(request: ReturnBookRequest):

    conn = get_connection()
    cur = conn.cursor()

    try:
        # Check active borrow record
        cur.execute(
            """
            SELECT borrow_id
            FROM borrow_records
            WHERE student_id = %s
              AND book_id = %s
              AND status = 'Borrowed'
            """,
            (request.student_id, request.book_id)
        )

        record = cur.fetchone()

        if record is None:
            raise HTTPException(
                status_code=404,
                detail="No active borrow record found for this student and book"
            )

        borrow_id = record[0]

        # Update borrow record
        cur.execute(
            """
            UPDATE borrow_records
            SET return_date = %s,
                status = 'Returned'
            WHERE borrow_id = %s
            """,
            (date.today(), borrow_id)
        )

        # Increase available copies
        cur.execute(
            """
            UPDATE books
            SET available_copies = available_copies + 1
            WHERE book_id = %s
            """,
            (request.book_id,)
        )

        conn.commit()

        return {
            "success": True,
            "message": "Book returned successfully",
            "borrow_id": borrow_id,
            "student_id": request.student_id,
            "book_id": request.book_id,
            "return_date": date.today(),
            "status": "Returned"
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