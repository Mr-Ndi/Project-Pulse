from fastapi import APIRouter, Depends
from fastapi.security import HTTPAuthorizationCredentials, HTTPBearer
from src.middleware.validation import UserBase, UserLoginSchema, userCreateSchema, UserUpdateSchema
from src.controller.authController import create, authenticate, update

authRouter = APIRouter()
bearer_scheme = HTTPBearer(auto_error=True)

async def get_token(credentials: HTTPAuthorizationCredentials = Depends(bearer_scheme)):
    return credentials.credentials

@authRouter.post("/register", response_model=UserBase)
async def register_user(user: userCreateSchema):
    return await create(user)

@authRouter.post("/login")
async def login_user(data: UserLoginSchema):
    return await authenticate(data.email, data.password)

@authRouter.put("/update-profile", dependencies=[Depends(bearer_scheme)])
async def update_user_profile(old_user: userCreateSchema, user_update: UserUpdateSchema):
    return await update(old_user, user_update)
