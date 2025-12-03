import uuid
from fastapi import APIRouter, Depends, HTTPException, Body, Query
from fastapi.security import HTTPAuthorizationCredentials, HTTPBearer
from src.middleware.pvalidation import newProjectSchema, updateProjectSchema
from src.controller.projectController import create, update, get_project, get_all, delete
from utilities.jwtGenerator import decode_access_token

projRouter = APIRouter()
bearer_scheme = HTTPBearer(auto_error=True)

async def get_token(credentials: HTTPAuthorizationCredentials = Depends(bearer_scheme)):
    return credentials.credentials

@projRouter.post("/register", dependencies=[Depends(bearer_scheme)], response_model=newProjectSchema)
async def new_project(
    project: newProjectSchema = Body(...),
    credentials: HTTPAuthorizationCredentials = Depends(bearer_scheme)
):
    user_id = decode_access_token(credentials.credentials)
    if not user_id:
        raise HTTPException(status_code=401, detail="Invalid or expired token")
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
    project_id: uuid.UUID = Body(...),
    project_update: updateProjectSchema = Body(...)
):
    user_id = decode_access_token(credentials.credentials)
    if not user_id:
        raise HTTPException(status_code=401, detail="Invalid or expired token")
    return await update(project_id, project_update)
