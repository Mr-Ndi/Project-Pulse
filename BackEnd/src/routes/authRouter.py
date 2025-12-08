from fastapi import APIRouter, Depends, HTTPException, Body
from fastapi.security import HTTPAuthorizationCredentials, HTTPBearer
from src.middleware.validation import UserBase, UserLoginSchema, userCreateSchema, UserUpdateSchema, UsersListResponseSchema
from src.controller.authController import create, authenticate, update, get_all
from utilities.jwtGenerator import decode_access_token
import jwt

authRouter = APIRouter()
bearer_scheme = HTTPBearer(auto_error=True)

async def get_token(credentials: HTTPAuthorizationCredentials = Depends(bearer_scheme)):
    return credentials.credentials

def verify_admin(credentials: HTTPAuthorizationCredentials = Depends(bearer_scheme)):
    """Verify that the user is an admin."""
    try:
        token = credentials.credentials
        payload = jwt.decode(token, options={"verify_signature": False})
        user_role = str(payload.get("roles", "")).lower()
        
        if user_role != "admin":
            raise HTTPException(status_code=403, detail="Admin access required")
        
        return payload
    except jwt.PyJWTError:
        raise HTTPException(status_code=401, detail="Invalid or expired token")

@authRouter.post("/register", response_model=UserBase)
async def register_user(user: userCreateSchema):
    return await create(user)

@authRouter.post("/login")
async def login_user(data: UserLoginSchema):
    return await authenticate(data.email, data.password)

@authRouter.get("/users", response_model=UsersListResponseSchema)
async def get_all_users(admin_user: dict = Depends(verify_admin)):
    """Admin-only endpoint to get all users."""
    users = await get_all()
    return {"users": users}

@authRouter.put("/update-profile", dependencies=[Depends(bearer_scheme)])
async def update_user_profile(
    credentials: HTTPAuthorizationCredentials = Depends(bearer_scheme),
    user_update: UserUpdateSchema = Body(...)
):
    user_id = decode_access_token(credentials.credentials)
    if not user_id:
        raise HTTPException(status_code=401, detail="Invalid or expired token")
    return await update(user_id, user_update)

