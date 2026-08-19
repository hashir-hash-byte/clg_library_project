from fastapi import APIRouter
from pydantic import BaseModel
from backend.database.connection import get_connection


router  = APIRouter()


# Data required when creating a new book
class BookCreate(BaseModel):
    title: str
    author_ID: str
    isbn: str
    total_copies: int
    available_copies: int


# Get all books
@router.get("/books")
def get_books():
    conn = get_connection()
    cur = conn.cursor()

    cur.execute("SELECT * FROM books")

    rows = cur.fetchall()

    columns = [desc[0] for desc in cur.description]

    books = [dict(zip(columns, row)) for row in rows]

    cur.close()
    conn.close()

    return books


# Get one book by ID
@router.get("/books/{book_id}")
def get_book(book_id: int):
    conn = get_connection()
    cur = conn.cursor()

    cur.execute(
        "SELECT * FROM books WHERE book_id = %s",
        (book_id,)
    )

    row = cur.fetchone()

    if row is None:
        cur.close()
        conn.close()
        return {"error": "Book not found"}

    columns = [desc[0] for desc in cur.description]

    book = dict(zip(columns, row))

    cur.close()
    conn.close()

    return book


# Add a new book
@router.post("/books")
def create_book(book: BookCreate):
    conn = get_connection()
    cur = conn.cursor()

    cur.execute("""
        INSERT INTO books
        (title, author_ID, isbn, total_copies, available_copies)
        VALUES (%s, %s, %s, %s, %s)
        RETURNING book_id
    """, (
        book.title,
        book.author_ID,
        book.isbn,
        book.total_copies,
        book.available_copies
    ))

    book_id = cur.fetchone()[0]

    conn.commit()

    cur.close()
    conn.close()

    return {
        "success": True,
        "message": "Book added successfully",
        "book_id": book_id
    }
@router.get("/books/{book_id}")
def get_book(book_id: int):
    conn = get_connection()
    cur = conn.cursor()

    cur.execute(
        "SELECT * FROM books WHERE book_id = %s",
        (book_id,)
    )

    row = cur.fetchone()

    if row is None:
        cur.close()
        conn.close()
        return {"success": False, "message": "Book not found"}

    columns = [desc[0] for desc in cur.description]
    book = dict(zip(columns, row))

    cur.close()
    conn.close()

    return book

@router.put("/books/{book_id}")
def update_book(book_id: int, book: BookCreate):
    conn = get_connection()
    cur = conn.cursor()

    cur.execute(
        """
        UPDATE books
        SET title = %s,
            author_ID = %s,
            isbn = %s,
            total_copies = %s,
            available_copies = %s
        WHERE book_id = %s
        RETURNING book_id
        """,
        (
            book.title,
            book.author_ID,
            book.isbn,
            book.total_copies,
            book.available_copies,
            book_id
        )
    )

    result = cur.fetchone()

    if result is None:
        conn.rollback()
        cur.close()
        conn.close()
        return {"success": False, "message": "Book not found"}

    conn.commit()

    cur.close()
    conn.close()

    return {
        "success": True,
        "message": "Book updated successfully",
        "book_id": result[0]
    }
@router.delete("/books/{book_id}")
def delete_book(book_id: int):
    conn = get_connection()
    cur = conn.cursor()

    cur.execute(
        "DELETE FROM books WHERE book_id = %s RETURNING book_id",
        (book_id,)
    )

    result = cur.fetchone()

    if result is None:
        conn.rollback()
        cur.close()
        conn.close()
        return {
            "success": False,
            "message": "Book not found"
        }

    conn.commit()

    cur.close()
    conn.close()

    return {
        "success": True,
        "message": "Book deleted successfully",
        "book_id": result[0]
    }