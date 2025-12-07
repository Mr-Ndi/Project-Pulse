import uuid
from dbhandler import engine
from fastapi import HTTPException
from src.middleware.cvalidation import ComplaintCreateSchema, ComplaintStatusUpdateSchema
from src.service.complaintService import (
    create_complaint,
    get_all_complaints,
    update_complaint_status
)


async def create(complaint: ComplaintCreateSchema):
    """Create a new complaint."""
    result = await create_complaint(engine, complaint)
    if not result:
        raise HTTPException(status_code=400, detail="Failed to create complaint")
    return result


async def get_all(status: str = None, limit: int = 100, offset: int = 0):
    """Get all complaints with optional filtering."""
    complaints, total = await get_all_complaints(engine, status, limit, offset)
    return {"complaints": complaints, "total": total}


async def update_status(complaint_id: uuid.UUID, status_update: ComplaintStatusUpdateSchema):
    """Update complaint status."""
    result = await update_complaint_status(engine, str(complaint_id), status_update.status)
    if not result:
        raise HTTPException(status_code=404, detail="Complaint not found")
    
    return {
        "message": "Status updated successfully",
        "complaint": {
            "id": result.id,
            "status": result.status.value,
            "updated_at": result.updated_at
        }
    }
