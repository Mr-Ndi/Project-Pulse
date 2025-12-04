import uuid
from fastapi import APIRouter, Depends, HTTPException, Body, Query
from fastapi.security import HTTPAuthorizationCredentials, HTTPBearer
from src.middleware.pvalidation import newProjectSchema, updateProjectSchema, updateProjectRequestSchema
from src.controller.projectController import create, update, get_project, get_all, delete
from utilities.jwtGenerator import decode_access_token

projRouter = APIRouter()
bearer_scheme = HTTPBearer(auto_error=True)

async def get_token(credentials: HTTPAuthorizationCredentials = Depends(bearer_scheme)):
    return credentials.credentials

@projRouter.post("/register", dependencies=[Depends(bearer_scheme)])
async def new_project(
    project: newProjectSchema = Body(...),
    credentials: HTTPAuthorizationCredentials = Depends(bearer_scheme)
):
    user_id_str = decode_access_token(credentials.credentials)
    if not user_id_str:
        raise HTTPException(status_code=401, detail="Invalid or expired token")
    try:
        user_id = uuid.UUID(user_id_str)
    except (ValueError, TypeError):
        raise HTTPException(status_code=401, detail="Invalid user ID in token")
    project.owner_id = user_id
    return await create(project, user_id)

@projRouter.patch("/delete", dependencies=[Depends(bearer_scheme)])
async def delete_project(
    credentials: HTTPAuthorizationCredentials = Depends(bearer_scheme),
    project_id: uuid.UUID = Body(..., embed=True, alias="id")
):
    user_id = decode_access_token(credentials.credentials)
    if not user_id:
        raise HTTPException(status_code=401, detail="Invalid or expired token")
    return await delete(project_id)

@projRouter.get("/details", dependencies=[Depends(bearer_scheme)])
async def get_project_details(
    credentials: HTTPAuthorizationCredentials = Depends(bearer_scheme),
    project_id: uuid.UUID = Query(..., alias="id")
):
    user_id = decode_access_token(credentials.credentials)
    if not user_id:
        raise HTTPException(status_code=401, detail="Invalid or expired token")
    return await get_project(project_id)

@projRouter.get("/all", dependencies=[Depends(bearer_scheme)])
async def get_all_projects(
    credentials: HTTPAuthorizationCredentials = Depends(bearer_scheme)
):
    user_id = decode_access_token(credentials.credentials)
    if not user_id:
        raise HTTPException(status_code=401, detail="Invalid or expired token")
    return await get_all()

@projRouter.put("/edit", dependencies=[Depends(bearer_scheme)])
async def update_project_profile(
    credentials: HTTPAuthorizationCredentials = Depends(bearer_scheme),
    request_data: updateProjectRequestSchema = Body(...)
):
    user_id = decode_access_token(credentials.credentials)
    if not user_id:
        raise HTTPException(status_code=401, detail="Invalid or expired token")
    project_update = updateProjectSchema(
        name=request_data.name,
        description=request_data.description,
        status=request_data.status
    )
    return await update(request_data.project_id, project_update)

@projRouter.post("/debug", response_model=dict)
async def debug_project_payload(payload: str = Body(...)):
    print("[DEBUG] Raw payload received:", payload, flush=True)
    return {"received": payload}
