from fastapi import APIRouter, HTTPException

from backend.database.connection import get_connection


router = APIRouter()


@router.get("/reports")
def get_reports():

    conn = get_connection()
    cur = conn.cursor()

    try:
        # Total books
        cur.execute("SELECT COUNT(*) FROM books")
        total_books = cur.fetchone()[0]

        # Total students
        cur.execute("SELECT COUNT(*) FROM students")
        total_students = cur.fetchone()[0]

        # Currently borrowed
        cur.execute("""
            SELECT COUNT(*)
            FROM borrow_records
            WHERE status = 'Borrowed'
        """)
        borrowed_books = cur.fetchone()[0]

        # Currently returned
        cur.execute("""
            SELECT COUNT(*)
            FROM borrow_records
            WHERE status = 'Returned'
        """)
        returned_books = cur.fetchone()[0]

        # Overdue books
        cur.execute("""
            SELECT COUNT(*)
            FROM borrow_records
            WHERE status = 'Borrowed'
              AND due_date < CURRENT_DATE
        """)
        overdue_books = cur.fetchone()[0]

        # Available copies
        cur.execute("""
            SELECT COALESCE(SUM(available_copies), 0)
            FROM books
        """)
        available_copies = cur.fetchone()[0]

        return {
            "success": True,
            "reports": {
                "total_books": total_books,
                "total_students": total_students,
                "borrowed_books": borrowed_books,
                "returned_books": returned_books,
                "available_copies": available_copies,
                "overdue_books": overdue_books
            }
        }

    except Exception as e:
        raise HTTPException(
            status_code=500,
            detail=f"Internal server error: {str(e)}"
        )

    finally:
        cur.close()
        conn.close()

