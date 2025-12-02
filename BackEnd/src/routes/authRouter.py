from fastapi import APIRouter, Depends, HTTPException
from fastapi.security import HTTPAuthorizationCredentials, HTTPBearer
from src.middleware.validation import UserBase, UserLoginSchema, userCreateSchema, UserUpdateSchema
from src.controller.authController import create, authenticate, update
from utilities.jwtGenerator import decode_access_token

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
async def update_user_profile(
    credentials: HTTPAuthorizationCredentials = Depends(bearer_scheme),
    user_update: UserUpdateSchema = Depends()
):
    user_id = decode_access_token(credentials.credentials)
    if not user_id:
        raise HTTPException(status_code=401, detail="Invalid or expired token")
    return await update(user_id, user_update)
