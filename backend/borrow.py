from datetime import date, timedelta
from backend.database.connection import get_connection


def borrow_book(student_id=None):
    conn = get_connection()
    cur = conn.cursor()

    # If librarian is borrowing on behalf of a student,
    # ask for the student ID.
    if student_id is None:
        student_id = input("Student ID: ")

    book_id = input("Book ID: ")

    # Check student
    cur.execute(
        "SELECT * FROM students WHERE student_id=%s",
        (student_id,)
    )

    if cur.fetchone() is None:
        print("❌ Student not found!")
        cur.close()
        conn.close()
        return

    # Check book
    cur.execute(
        "SELECT available_copies FROM books WHERE book_id=%s",
        (book_id,)
    )

    book = cur.fetchone()

    if book is None:
        print("❌ Book not found!")
        cur.close()
        conn.close()
        return

    if book[0] <= 0:
        print("❌ Book is not available!")
        cur.close()
        conn.close()
        return

    borrow_date = date.today()
    due_date = borrow_date + timedelta(days=14)

    cur.execute("""
        INSERT INTO borrow_records
        (student_id, book_id, borrow_date, due_date, status)
        VALUES (%s, %s, %s, %s, %s)
    """, (
        student_id,
        book_id,
        borrow_date,
        due_date,
        "Borrowed"
    ))

    cur.execute("""
        UPDATE books
        SET available_copies = available_copies - 1
        WHERE book_id=%s
    """, (book_id,))

    conn.commit()

    print("✅ Book Borrowed Successfully!")

    cur.close()
    conn.close()