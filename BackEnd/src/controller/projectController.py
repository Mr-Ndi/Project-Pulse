import uuid
from dbhandler import engine
from fastapi import HTTPException
from src.middleware.pvalidation import newProjectSchema, updateProjectSchema
from src.service.projectService import create_proj, update_project, get_project_by_id, get_all_projects, delete_project

async def create(project: newProjectSchema, user_id: str):
    result = await create_proj(engine, project, user_id)
    if not result:
        raise HTTPException(status_code=400, detail="Project with this name already exists")
    return result

async def update(project_id: uuid.UUID, project_update: updateProjectSchema):
    result = await update_project(engine, project_id, project_update)
    if not result:
        raise HTTPException(status_code=404, detail="Project not found")
    return result

async def get_project(project_id: uuid.UUID):
    result = await get_project_by_id(engine, id = project_id)
    if not result:
        raise HTTPException(status_code=404, detail="Project not found")
    return result

async def get_all():
    result = await get_all_projects(engine)
    if not result:
        raise HTTPException(status_code=404, detail="No projects found")
    return result

async def delete(project_id: uuid.UUID):
    result = await delete_project(engine, project_id)
    if not result:
        raise HTTPException(status_code=404, detail="Project not found")
    return result