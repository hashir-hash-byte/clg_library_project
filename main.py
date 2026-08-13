from backend.auth.login import login
from backend.menu import menu
from backend.student_menu import student_menu


if __name__ == "__main__":
    print("\n========== Library Management System ==========\n")

    user = login()

    if user == "librarian":
        menu()

    elif user:
        student_menu(user)