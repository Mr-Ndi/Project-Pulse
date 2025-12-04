from sqlmodel import select
from src.model.projectmodel import ProjectBase
from dbhandler import get_session_maker


async def create_proj(engine, project, user_id):
    session = get_session_maker()
    async with session() as db_session:
        # Check for duplicate project name for THIS user only
        if project.name:
            existing_project = await db_session.execute(
                select(ProjectBase).filter(
                    ProjectBase.name == project.name,
                    ProjectBase.owner_id == user_id
                )
            )
            if existing_project.scalar_one_or_none():
                return None

        proj_obj = ProjectBase(
            name=project.name,
            description=project.description,
            owner_id=user_id,
            status=project.status if project.status else "not_started"
        )
        db_session.add(proj_obj)
        await db_session.commit()
        await db_session.refresh(proj_obj)
        return proj_obj
    
async def update_project(engine, project_id, project_update, user_id):
    session = get_session_maker()
    async with session() as db_session:
        project = await db_session.get(ProjectBase, project_id)
        if not project:
            return None
        # Verify ownership
        if project.owner_id != user_id:
            return None
        if project_update.name is not None:
            project.name = project_update.name
        if project_update.description is not None:
            project.description = project_update.description
        if project_update.status is not None:
            project.status = project_update.status
        await db_session.commit()
        await db_session.refresh(project)
        return project

async def get_project_by_id(engine, project_id, user_id):
    session = get_session_maker()
    async with session() as db_session:
        project = await db_session.get(ProjectBase, project_id)
        if not project:
            return None
        # Verify ownership
        if project.owner_id != user_id:
            return None
        return project
    
async def get_all_projects(engine, user_id):
    session = get_session_maker()
    async with session() as db_session:
        # Filter projects by owner_id to show only user's projects
        projects = await db_session.execute(
            select(ProjectBase).filter(ProjectBase.owner_id == user_id)
        )
        return projects.scalars().all()
    
async def delete_project(engine, project_id, user_id):
    session = get_session_maker()
    async with session() as db_session:
        project = await db_session.get(ProjectBase, project_id)
        if not project:
            return None
        # Verify ownership
        if project.owner_id != user_id:
            return None
        await db_session.delete(project)
        await db_session.commit()
        return project
