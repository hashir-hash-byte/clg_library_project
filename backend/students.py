from backend.database.connection import get_connection


def register_student():
    conn = get_connection()
    cur = conn.cursor()

    print("\n===== Register Student =====")

    name = input("Student Name: ")
    email = input("Email: ")
    phone = input("Phone: ")
    department = input("Department: ")
    password = input("Password: ")

    # Store password directly for our current project setup
    password_hash = password

    cur.execute("""
        INSERT INTO students
        (full_name, email, phone, department, password_hash)
        VALUES (%s, %s, %s, %s, %s)
    """, (name, email, phone, department, password_hash))

    conn.commit()

    print("\n✅ Student Registered Successfully!")

    cur.close()
    conn.close()