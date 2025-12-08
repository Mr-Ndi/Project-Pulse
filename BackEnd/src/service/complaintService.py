from sqlmodel import select
from src.model.complaintmodel import ComplaintBase, ComplaintStatus
from dbhandler import get_session_maker
from datetime import datetime
from typing import Optional


async def create_complaint(engine, complaint_data):
    """Create a new complaint/contact message."""
    session = get_session_maker()
    async with session() as db_session:
        complaint_obj = ComplaintBase(
            name=complaint_data.name,
            email=complaint_data.email,
            message=complaint_data.message,
            status=ComplaintStatus.NEW,
            created_at=datetime.utcnow(),
            updated_at=datetime.utcnow()
        )
        db_session.add(complaint_obj)
        await db_session.commit()
        await db_session.refresh(complaint_obj)
        return complaint_obj


async def get_all_complaints(engine, status: Optional[str] = None, limit: int = 100, offset: int = 0):
    """Get all complaints with optional filtering."""
    session = get_session_maker()
    async with session() as db_session:
        query = select(ComplaintBase)
        
        if status:
            query = query.where(ComplaintBase.status == status)
        
        query = query.order_by(ComplaintBase.created_at.desc())
        query = query.limit(limit).offset(offset)
        
        result = await db_session.execute(query)
        complaints = result.scalars().all()
        
        # Get total count
        count_query = select(ComplaintBase)
        if status:
            count_query = count_query.where(ComplaintBase.status == status)
        count_result = await db_session.execute(count_query)
        total = len(count_result.scalars().all())
        
        return complaints, total


async def update_complaint_status(engine, complaint_id: str, new_status: str):
    """Update the status of a complaint."""
    session = get_session_maker()
    async with session() as db_session:
        result = await db_session.execute(
            select(ComplaintBase).where(ComplaintBase.id == complaint_id)
        )
        complaint = result.scalar_one_or_none()
        
        if not complaint:
            return None
        
        complaint.status = ComplaintStatus(new_status)
        complaint.updated_at = datetime.utcnow()
        
        db_session.add(complaint)
        await db_session.commit()
        await db_session.refresh(complaint)
        
        return complaint
