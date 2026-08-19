from fastapi import  APIRouter, HTTPException
from pydantic import BaseModel

from backend.database.connection import get_connection


router = APIRouter()


class AddBookRequest(BaseModel):
    title: str
    isbn: str
    author_id: int
    publisher_id: int
    category_id: int
    total_copies: int
    available_copies: int
    shelf_location: str


@router.post("/admin/books")
def add_book(book: AddBookRequest):

    conn = get_connection()
    cur = conn.cursor()

    try:
        cur.execute(
            """
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
            VALUES (%s, %s, %s, %s, %s, %s, %s, %s)
            RETURNING book_id
            """,
            (
                book.title,
                book.isbn,
                book.author_id,
                book.publisher_id,
                book.category_id,
                book.total_copies,
                book.available_copies,
                book.shelf_location
            )
        )

        book_id = cur.fetchone()[0]

        conn.commit()

        return {
            "success": True,
            "message": "Book added successfully",
            "book_id": book_id
        }

    except Exception as e:
        conn.rollback()

        raise HTTPException(
            status_code=500,
            detail=f"Internal server error: {str(e)}"
        )

    finally:
        cur.close()
        conn.close()

