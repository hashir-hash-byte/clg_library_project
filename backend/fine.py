from datetime import date
from backend.database.connection import get_connection


def calculate_fine():
    conn = get_connection()
    cur = conn.cursor()

    student_id = input("Student ID: ")
    book_id = input("Book ID: ")

    # Find the latest borrow record for this student and book
    cur.execute("""
        SELECT due_date, return_date, status
        FROM borrow_records
        WHERE student_id = %s
          AND book_id = %s
        ORDER BY borrow_id DESC
        LIMIT 1
    """, (student_id, book_id))

    record = cur.fetchone()

    if record is None:
        print("❌ No borrow record found for this student and book!")
        cur.close()
        conn.close()
        return

    due_date, return_date, status = record

    # If the book has not been returned,
    # calculate the fine up to today's date.
    if return_date is None:
        return_date = date.today()

    overdue_days = (return_date - due_date).days

    if overdue_days > 0:
        fine = overdue_days * 10

        print(f"\n⚠️ Overdue by {overdue_days} day(s)")
        print(f"💰 Fine Amount: ₹{fine}")

    else:
        print("\n✅ No Fine")

    cur.close()
    conn.close()