from fastapi import  APIRouter, HTTPException
from backend.database.connection import get_connection


router = APIRouter()


@router.get("/search/books")
def search_books(keyword: str):

    conn = get_connection()
    cursor = conn.cursor()

    try:
        cursor.execute(
            """
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
            WHERE LOWER(b.title) LIKE LOWER(%s)
            """,
            (f"%{keyword}%",)
        )

        books = cursor.fetchall()

        if not books:
            return {
                "success": True,
                "message": "No books found",
                "books": []
            }

        results = []

        for book in books:
            results.append({
                "book_id": book[0],
                "title": book[1],
                "author_name": book[2],
                "category_name": book[3],
                "available_copies": book[4]
            })

        return {
            "success": True,
            "message": "Books found",
            "books": results
        }

    except Exception as e:
        raise HTTPException(
            status_code=500,
            detail=f"Internal server error: {str(e)}"
        )

    finally:
        cursor.close()
        conn.close()


