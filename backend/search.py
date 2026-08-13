from backend.database.connection import get_connection

def search_book():
    keyword = input("\nEnter book title: ")

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
        WHERE LOWER(b.title) LIKE LOWER(%s);
    """, (f"%{keyword}%",))

    books = cursor.fetchall()

    if books:
        print("\nBooks Found:\n")
        for book in books:
            print(
                f"ID: {book[0]} | "
                f"{book[1]} | "
                f"{book[2]} | "
                f"{book[3]} | "
                f"Available: {book[4]}"
            )
    else:
        print("\n❌ No books found.")

    cursor.close()
    conn.close()