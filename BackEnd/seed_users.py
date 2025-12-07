import asyncio
import uuid
from getpass import getpass
from typing import Optional

from sqlalchemy import text
from sqlmodel import select

from dbhandler import get_session_maker
from src.model.Usermodel import UserBase
from utilities.passwordHasher import hash_password


def prompt_admin_user() -> Optional[dict]:
    """Prompt once for an admin user. Return None if no email provided."""
    print("Seed a single admin user (leave email empty to cancel)")
    email = input("Admin email: ").strip()
    if not email:
        return None

    full_name = input("Full name (optional): ").strip() or None
    password = getpass("Password: ").strip()
    while not password:
        print("Password cannot be empty.")
        password = getpass("Password: ").strip()

    return {
        "email": email,
        "full_name": full_name,
        "password": password,
        "role": "admin",
    }


async def seed_admin(user_data: dict):
    session_factory = get_session_maker()
    async with session_factory() as session:
        result = await session.execute(select(UserBase).where(UserBase.email == user_data["email"]))
        existing = result.scalar_one_or_none()
        if existing:
            print(f"Admin already exists: {user_data['email']}. Skipping.")
            return

        # Use raw insert to avoid Enum coercion issues; DB enum values: 'admin', 'Project_owner'
        await session.execute(
            text(
                """
                INSERT INTO userbase (id, email, full_name, password, role)
                VALUES (:id, :email, :full_name, :password, :role)
                """
            ),
            {
                "id": str(uuid.uuid4()),
                "email": user_data["email"],
                "full_name": user_data.get("full_name"),
                "password": hash_password(user_data["password"]),
                "role": "admin",
            },
        )
        await session.commit()
        print("Admin seeded successfully.")


if __name__ == "__main__":
    admin_data = prompt_admin_user()
    if admin_data:
        asyncio.run(seed_admin(admin_data))
    else:
        print("No admin provided. Nothing to seed.")
