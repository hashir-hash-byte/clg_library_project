from backend.database.connection import get_connection


def view_books():
    conn = get_connection()
    cursor = conn.cursor()

    cursor.execute("""
        SELECT
            b.book_id,
            b.title,
            a.author_name,
            c.category_name,
            b.available_copies
        FROM books b
        JOIN authors a
            ON b.author_id = a.author_id
        JOIN categories c
            ON b.category_id = c.category_id
        ORDER BY b.book_id;
    """)

    books = cursor.fetchall()

    print("\n========== BOOK LIST ==========\n")

    for book in books:
        print(
            f"ID: {book[0]} | "
            f"Title: {book[1]} | "
            f"Author: {book[2]} | "
            f"Category: {book[3]} | "
            f"Available: {book[4]}"
        )

    cursor.close()
    conn.close()