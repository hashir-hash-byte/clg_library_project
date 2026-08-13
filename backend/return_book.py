from datetime import date
from backend.database.connection import get_connection


def return_book():
    conn = get_connection()
    cur = conn.cursor()

    student_id = input("Student ID: ")
    book_id = input("Book ID: ")

    # Check active borrow record
    cur.execute("""
        SELECT borrow_id
        FROM borrow_records
        WHERE student_id = %s
          AND book_id = %s
          AND status = 'Borrowed'
    """, (student_id, book_id))

    record = cur.fetchone()

    if record is None:
        print("❌ No active borrow record found for this student and book!")
        cur.close()
        conn.close()
        return

    borrow_id = record[0]

    # Update borrow record
    cur.execute("""
        UPDATE borrow_records
        SET return_date = %s,
            status = 'Returned'
        WHERE borrow_id = %s
    """, (date.today(), borrow_id))

    # Increase available copies
    cur.execute("""
        UPDATE books
        SET available_copies = available_copies + 1
        WHERE book_id = %s
    """, (book_id,))

    conn.commit()

    print("✅ Book Returned Successfully!")

    cur.close()
    conn.close()