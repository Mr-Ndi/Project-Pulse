from sqlmodel import select
from src.model.projectmodel import ProjectBase
from dbhandler import get_session_maker


async def create_proj(engine, project, user_id):
    session = get_session_maker()
    async with session() as db_session:
        proj_obj = ProjectBase(
            name=project.name,
            description=project.description,
            owner_id=user_id,
        )
        if proj_obj.name:
            existing_project = await db_session.execute(
                select(ProjectBase).filter(ProjectBase.name == proj_obj.name)
            )
            if existing_project.scalar_one_or_none():
                return None

        db_session.add(proj_obj)
        await db_session.commit()
        await db_session.refresh(proj_obj)
        return proj_obj
    
async def update_project(engine, old_project, project_update):
    session = get_session_maker()
    async with session() as db_session:
        old_project.name = project_update.name
        old_project.description = project_update.description
        old_project.status = project_update.status
        await db_session.commit()
        await db_session.refresh(old_project)
        return old_project

async def get_project_by_id(engine, id):
    session = get_session_maker()
    async with session() as db_session:
        project = await db_session.execute(ProjectBase, id)
        return project
    
async def get_all_projects(engine):
    session = get_session_maker()
    async with session() as db_session:
        projects = await db_session.execute(select(ProjectBase))
        return projects.scalars().all()
    
async def delete_project(engine, project_id):
    session = get_session_maker()
    async with session() as db_session:
        project = await db_session.get(ProjectBase, project_id)
        if not project:
            return None
        await db_session.delete(project)
        await db_session.commit()
        return project
