import uuid
from fastapi import APIRouter, Depends, HTTPException, Query
from fastapi.security import HTTPAuthorizationCredentials, HTTPBearer
from src.middleware.cvalidation import (
    ComplaintCreateSchema,
    ComplaintStatusUpdateSchema,
    ComplaintResponseSchema,
    ComplaintsListResponseSchema
)
from src.controller.complaintController import create, get_all, update_status
from utilities.jwtGenerator import decode_access_token
import jwt

complaintRouter = APIRouter()
bearer_scheme = HTTPBearer(auto_error=True)


def verify_admin(credentials: HTTPAuthorizationCredentials = Depends(bearer_scheme)):
    """Verify that the user is an admin."""
    try:
        token = credentials.credentials
        payload = jwt.decode(token, options={"verify_signature": False})
        user_role = payload.get("roles")
        
        if user_role != "admin":
            raise HTTPException(status_code=403, detail="Admin access required")
        
        return payload
    except jwt.PyJWTError:
        raise HTTPException(status_code=401, detail="Invalid or expired token")


@complaintRouter.post("/contact", response_model=ComplaintResponseSchema, status_code=201)
async def create_complaint(complaint: ComplaintCreateSchema):
    """Public endpoint to submit a contact/complaint message."""
    return await create(complaint)


@complaintRouter.get("/complaints", response_model=ComplaintsListResponseSchema)
async def get_all_complaints(
    status: str = Query(None, regex="^(new|in-progress|resolved|closed)$"),
    limit: int = Query(100, ge=1, le=500),
    offset: int = Query(0, ge=0),
    admin_user: dict = Depends(verify_admin)
):
    """Admin-only endpoint to get all complaints."""
    return await get_all(status, limit, offset)


@complaintRouter.patch("/complaints/{complaint_id}/status")
async def update_complaint_status(
    complaint_id: uuid.UUID,
    status_update: ComplaintStatusUpdateSchema,
    admin_user: dict = Depends(verify_admin)
):
    """Admin-only endpoint to update complaint status."""
    return await update_status(complaint_id, status_update)
