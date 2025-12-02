from sqlmodel import select
from src.model.Usermodel import UserBase
from dbhandler import get_session_maker
from utilities.jwtGenerator import create_access_token
from utilities.passwordHasher import hash_password, verify_password

async def create_user(engine, user):
    session = get_session_maker()
    async with session() as db_session:
        user_obj = UserBase.from_orm(user)
        if user_obj.email:
            existing_user = await db_session.execute(
                select(UserBase).filter(UserBase.email == user_obj.email)
            )
            if existing_user.scalar_one_or_none():
                return None

        user_obj.password = hash_password(user_obj.password)
        db_session.add(user_obj)
        await db_session.commit()
        await db_session.refresh(user_obj)
        return user_obj
    
async def authenticate_user(engine, email, password):
    session = get_session_maker()
    async with session() as db_session:
        result = await db_session.execute(
            select(UserBase).filter(UserBase.email == email))
        result_user = result.scalar_one_or_none()
        if result_user and verify_password(password, result_user.password):
            token_data = {
                "user_id": str(result_user.id),
                "email": result_user.email,
                "username": result_user.username,
                "roles": result_user.role
            }
            token = create_access_token(data=token_data)
            return token
        return None

async def update_user(engine, old_user, user_update):
    session = get_session_maker()
    async with session() as db_session:
        old_user.username = user_update.username
        old_user.email = user_update.email
        old_user.full_name = user_update.full_name
        old_user.date_of_birth = user_update.date_of_birth
        old_user.gender = user_update.gender
        await db_session.commit()
        await db_session.refresh(old_user)
        return old_user

async def get_user_by_id(engine, id):
    session = get_session_maker()
    async with session() as db_session:
        user = await db_session.execute(UserBase, id)
        return user

async def get_all_users(engine):
    session = get_session_maker()
    async with session() as db_session:
        users = await db_session.execute(select(UserBase))
        return users.scalars().all()
    