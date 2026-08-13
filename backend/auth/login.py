from backend.database.connection import get_connection


def librarian_login():
    conn = get_connection()
    cur = conn.cursor()

    email = input("Librarian Email: ")
    password = input("Password: ")

    cur.execute("""
        SELECT full_name
        FROM librarians
        WHERE email = %s AND password_hash = %s
    """, (email, password))

    librarian = cur.fetchone()

    cur.close()
    conn.close()

    if librarian:
        print(f"\n✅ Welcome Librarian {librarian[0]}!")
        return True

    print("\n❌ Invalid librarian email or password!")
    return False


def student_login():
    conn = get_connection()
    cur = conn.cursor()

    email = input("Student Email: ")
    password = input("Password: ")

    cur.execute("""
        SELECT student_id, full_name
        FROM students
        WHERE email = %s AND password_hash = %s
    """, (email, password))

    student = cur.fetchone()

    cur.close()
    conn.close()

    if student:
        print(f"\n✅ Welcome {student[1]}!")
        return student[0]

    print("\n❌ Invalid student email or password!")
    return None


def login():
    while True:
        print("\n" + "=" * 40)
        print("          LIBRARY LOGIN")
        print("=" * 40)
        print("1. Librarian Login")
        print("2. Student Login")
        print("3. Exit")

        choice = input("\nChoose an option: ")

        if choice == "1":
            if librarian_login():
                return "librarian"

        elif choice == "2":
            student_id = student_login()

            if student_id:
                return student_id

        elif choice == "3":
            print("\n👋 Goodbye!")
            return None

        else:
            print("\n❌ Invalid choice!")