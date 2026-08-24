from datetime import date

from fastapi import APIRouter, HTTPException
from pydantic import BaseModel

from backend.database.connection import get_connection


router = APIRouter()


class FineRequest(BaseModel):
    student_id: int
    book_id: int


@router.post("/fine")
def calculate_fine(data: FineRequest):

    conn = get_connection()
    cur = conn.cursor()

    try:
        # Find the latest borrow record
        cur.execute(
            """
            SELECT borrow_id, due_date, return_date, status
            FROM borrow_records
            WHERE student_id = %s
              AND book_id = %s
            ORDER BY borrow_id DESC
            LIMIT 1
            """,
            (data.student_id, data.book_id)
        )

        record = cur.fetchone()

        if record is None:
            raise HTTPException(
                status_code=404,
                detail="No borrow record found for this student and book"
            )

        borrow_id, due_date, return_date, status = record

        # Check if a fine already exists for this borrow record
        cur.execute(
            """
            SELECT fine_id, amount, paid
            FROM fines
            WHERE borrow_id = %s
            ORDER BY fine_id DESC
            LIMIT 1
            """,
            (borrow_id,)
        )

        existing_fine = cur.fetchone()

        if existing_fine is not None:
            fine_id, amount, paid = existing_fine
            return {
                "success": True,
                "student_id": data.student_id,
                "book_id": data.book_id,
                "borrow_id": borrow_id,
                "fine_id": fine_id,
                "fine_amount": float(amount),
                "paid": paid,
                "message": f"Fine on record: ₹{amount} ({'Paid' if paid else 'Unpaid'})"
            }

        # No stored fine found — calculate live from due_date
        if return_date is None:
            return_date = date.today()

        overdue_days = (return_date - due_date).days

        if overdue_days > 0:
            fine = overdue_days * 10

            return {
                "success": True,
                "student_id": data.student_id,
                "book_id": data.book_id,
                "borrow_id": borrow_id,
                "overdue_days": overdue_days,
                "fine_amount": fine,
                "message": f"Fine amount is ₹{fine}"
            }

        return {
            "success": True,
            "student_id": data.student_id,
            "book_id": data.book_id,
            "borrow_id": borrow_id,
            "overdue_days": 0,
            "fine_amount": 0,
            "message": "No fine"
        }

    except HTTPException:
        raise

    except Exception as e:
        raise HTTPException(
            status_code=500,
            detail=f"Internal server error: {str(e)}"
        )

    finally:
        cur.close()
        conn.close()