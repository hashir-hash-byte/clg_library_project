from backend.database.connection import get_connection


def show_reports():
    conn = get_connection()
    cur = conn.cursor()

    print("\n" + "=" * 40)
    print("          LIBRARY REPORTS")
    print("=" * 40)

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

    print(f"\n📚 Total Books       : {total_books}")
    print(f"👨‍🎓 Total Students   : {total_students}")
    print(f"📖 Borrowed Books    : {borrowed_books}")
    print(f"↩️ Returned Books    : {returned_books}")
    print(f"📗 Available Copies  : {available_copies}")
    print(f"⚠️ Overdue Books     : {overdue_books}")

    print("\n" + "=" * 40)

    cur.close()
    conn.close()