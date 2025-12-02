import uuid
from fastapi import APIRouter, Depends
from fastapi.security import HTTPAuthorizationCredentials, HTTPBearer
from src.middleware.pvalidation import newProjectSchema, updateProjectSchema
from src.controller.projectController import create, update, get_project, get_all, delete

projRouter = APIRouter()
bearer_scheme = HTTPBearer(auto_error=True)

async def get_token(credentials: HTTPAuthorizationCredentials = Depends(bearer_scheme)):
    return credentials.credentials

@projRouter.post("/register", response_model=newProjectSchema)
async def new_project(user: newProjectSchema):
    return await create(user)

@projRouter.patch("/delete")
async def delete_project(project_id: uuid.UUID):
    return await delete(project_id)

@projRouter.get("/details")
async def get_project_details(project_id: uuid.UUID):
    return await get_project(project_id)

@projRouter.get("/all")
async def get_all_projects():
    return await get_all()

@projRouter.put("/edit", dependencies=[Depends(bearer_scheme)])
async def update_project_profile(project_id: uuid.UUID, project_update: updateProjectSchema):
    return await update(project_id, project_update)
