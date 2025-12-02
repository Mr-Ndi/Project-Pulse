import uuid
from dbhandler import engine
from fastapi import HTTPException
from src.middleware.validation_schemas import userCreateSchema, UserUpdateSchema
from src.service.authService import create_user, authenticate_user, update_user, get_user_by_id, get_all_users

async def create(user: userCreateSchema):
    result = await create_user(engine, user)
    if not result:
        raise HTTPException(status_code=400, detail="User with this email already exists")
    return result

async def authenticate(email: str, password: str):
    result = await authenticate_user(engine, email, password)
    if not result:
        raise HTTPException(status_code=203, detail="Wrong email or password!")
    return result

async def update(user_id: uuid.UUID, user_update: UserUpdateSchema):
    result = await update_user(engine, user_id, user_update)
    if not result:
        raise HTTPException(status_code=404, detail="User not found")
    return result

async def get_user(user_id: uuid.UUID):
    result = await get_user_by_id(engine, id = user_id)
    if not result:
        raise HTTPException(status_code=404, detail="User not found")
    return result

async def get_all():
    result = await get_all_users(engine)
    if not result:
        raise HTTPException(status_code=404, detail="No users found")
    return result