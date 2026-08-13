from backend.books import view_books
from backend.search import search_book
from backend.borrow import borrow_book
from backend.return_book import return_book


def student_menu(student_id):
    while True:
        print("\n" + "=" * 40)
        print("           STUDENT MENU")
        print("=" * 40)
        print("1. View All Books")
        print("2. Search Book")
        print("3. Borrow Book")
        print("4. Return Book")
        print("5. Logout")

        choice = input("\nEnter your choice: ")

        if choice == "1":
            view_books()

        elif choice == "2":
            search_book()

        elif choice == "3":
            borrow_book(student_id)

        elif choice == "4":
            return_book()

        elif choice == "5":
            print("\n👋 Logged out successfully!")
            break

        else:
            print("\n❌ Invalid Choice!")