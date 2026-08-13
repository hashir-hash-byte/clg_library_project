from backend.books import view_books
from backend.search import search_book
from backend.borrow import borrow_book
from backend.return_book import return_book
from backend.admin import add_book
from backend.reports import show_reports
from backend.fine import calculate_fine
from backend.students import register_student


def menu():
    while True:
        print("\n" + "=" * 40)
        print("     LIBRARY MANAGEMENT SYSTEM")
        print("=" * 40)
        print("1. View All Books")
        print("2. Search Book")
        print("3. Add New Book")
        print("4. Register Student")
        print("5. Borrow Book")
        print("6. Return Book")
        print("7. Calculate Fine")
        print("8. reports")
        print("9.Exit")
        
        choice = input("\nEnter your choice: ")
        if choice == "1":
            view_books()

        elif choice == "2":
            search_book()

        elif choice == "3":
            add_book()

        elif choice == "4":
            register_student()

        elif choice == "5":
            borrow_book()

        elif choice == "6":
            print("\n🚧 Return Book - Coming Next")
            return_book()
            
        elif choice == "7":
            calculate_fine()

        elif choice == "8":
            show_reports()

        elif choice == "9":
            break
        else:
            print("\n❌ Invalid Choice!")