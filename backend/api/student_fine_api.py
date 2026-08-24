from fastapi import APIRouter, HTTPException
from backend.database.connection import get_connection

router = APIRouter()


@router.get("/students/{student_id}/fines")
def get_student_fines(student_id: int):

    conn = get_connection()
    cur = conn.cursor()

    try:
        # Check whether student exists
        cur.execute(
            """
            SELECT student_id, full_name
            FROM students
            WHERE student_id = %s
            """,
            (student_id,)
        )

        student = cur.fetchone()

        if student is None:
            raise HTTPException(
                status_code=404,
                detail="Student not found"
            )

        # Get all overdue/unpaid fines for this student
        cur.execute(
            """
            SELECT
                br.borrow_id,
                br.book_id,
                b.title,
                br.due_date,
                br.return_date,
                br.status
            FROM borrow_records br
            JOIN books b
                ON br.book_id = b.book_id
            WHERE br.student_id = %s
              AND (
                    (br.return_date IS NULL AND br.due_date < CURRENT_DATE)
                    OR
                    (br.return_date IS NOT NULL AND br.return_date > br.due_date)
                  )
            ORDER BY br.borrow_id DESC
            """,
            (student_id,)
        )

        records = cur.fetchall()

        fines = []
        total_fine = 0

        for record in records:

            borrow_id = record[0]
            book_id = record[1]
            title = record[2]
            due_date = record[3]
            return_date = record[4]
            status = record[5]

            # If book is still borrowed, calculate until today
            if return_date is None:
                end_date = __import__("datetime").date.today()
            else:
                end_date = return_date

            overdue_days = (end_date - due_date).days

            if overdue_days > 0:
                fine_amount = overdue_days * 10
            else:
                fine_amount = 0

            if fine_amount > 0:
                fines.append({
                    "borrow_id": borrow_id,
                    "book_id": book_id,
                    "book_title": title,
                    "due_date": due_date,
                    "return_date": return_date,
                    "status": status,
                    "overdue_days": overdue_days,
                    "fine_amount": fine_amount
                })

                total_fine += fine_amount

        return {
            "success": True,
            "student_id": student_id,
            "student_name": student[1],
            "total_fine": total_fine,
            "fines": fines
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