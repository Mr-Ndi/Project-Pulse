import uuid
from dbhandler import engine
from fastapi import HTTPException
from src.middleware.pvalidation import newProjectSchema, updateProjectSchema
from src.service.projectService import create_proj, update_project, get_project_by_id, get_all_projects, delete_project

async def create(project: newProjectSchema, user_id: uuid.UUID):
    result = await create_proj(engine, project, user_id)
    if not result:
        raise HTTPException(status_code=400, detail="Project with this name already exists")
    return result

async def update(project_id: uuid.UUID, project_update: updateProjectSchema, user_id: uuid.UUID):
    result = await update_project(engine, project_id, project_update, user_id)
    if not result:
        raise HTTPException(status_code=404, detail="Project not found or you don't have permission")
    return result

async def get_project(project_id: uuid.UUID, user_id: uuid.UUID):
    result = await get_project_by_id(engine, project_id, user_id)
    if not result:
        raise HTTPException(status_code=404, detail="Project not found or you don't have permission")
    return result

async def get_all(user_id: uuid.UUID):
    result = await get_all_projects(engine, user_id)
    return result if result else []

async def delete(project_id: uuid.UUID, user_id: uuid.UUID):
    result = await delete_project(engine, project_id, user_id)
    if not result:
        raise HTTPException(status_code=404, detail="Project not found or you don't have permission")
    return result