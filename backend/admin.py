from backend.database.connection import get_connection


def add_book():
    conn = get_connection()
    cur = conn.cursor()

    print("\n========== ADD NEW BOOK ==========\n")

    title = input("Book Title: ")
    isbn = input("ISBN: ")
    author_id = int(input("Author ID: "))
    publisher_id = int(input("Publisher ID: "))
    category_id = int(input("Category ID: "))
    total_copies = int(input("Total Copies: "))
    available_copies = int(input("Available Copies: "))
    shelf_location = input("Shelf Location (Example: A-101): ")

    cur.execute("""
        INSERT INTO books
        (
            title,
            isbn,
            author_id,
            publisher_id,
            category_id,
            total_copies,
            available_copies,
            shelf_location
        )
        VALUES (%s,%s,%s,%s,%s,%s,%s,%s)
    """, (
        title,
        isbn,
        author_id,
        publisher_id,
        category_id,
        total_copies,
        available_copies,
        shelf_location
    ))

    conn.commit()

    print("\n✅ Book Added Successfully!")

    cur.close()
    conn.close()