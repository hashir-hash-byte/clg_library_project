from fastapi import FastAPI

from backend.api.auth_api import router as auth_router
from backend.api.books_api import router as books_router
from backend.api.students_api import router as students_router
from backend.api.borrow_api import router as borrow_router
from backend.api.return_api import router as return_router
from backend.api.fine_api import router as fine_router
from backend.api.search_api import router as search_router
from backend.api.reports_api import router as reports_router
from backend.api.admin_api import router as admin_router


app = FastAPI(
    title="Library Management System API",
    description="Backend API for the Library Management System",
    version="1.0.0"
)


app.include_router(auth_router)
app.include_router(books_router)
app.include_router(students_router)
app.include_router(borrow_router)
app.include_router(return_router)
app.include_router(fine_router)
app.include_router(search_router)
app.include_router(reports_router)
app.include_router(admin_router)