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
                "full_name": result_user.full_name,
                "roles": result_user.role.value.lower()
            }
            token = create_access_token(data=token_data)
            return token
        return None

async def update_user(engine, user_id, user_update):
    session = get_session_maker()
    async with session() as db_session:
        user = await db_session.get(UserBase, user_id)
        if not user:
            return None
            
        if user_update.email:
            user.email = user_update.email
        if user_update.full_name:
            user.full_name = user_update.full_name
        if user_update.password:
            user.password = hash_password(user_update.password)
        if user_update.role:
            user.role = user_update.role
            
        db_session.add(user)
        await db_session.commit()
        await db_session.refresh(user)
        return user

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
