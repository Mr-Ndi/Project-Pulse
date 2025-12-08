
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import uvicorn
import os

from src.routes.authRouter import authRouter
from src.routes.projRouter import projRouter
from src.routes.complaintRouter import complaintRouter

app = FastAPI(
    docs_url="/docs",
    title="Project Pulse Backend API",
    redoc_url=None,
    swagger_ui_parameters={"defaultModelsExpandDepth": -1}
)

# CORS: explicitly allow local dev and production origin
prod_origin = os.getenv("PROD_ORIGIN")
origins = ["http://localhost:5173"] + ([prod_origin] if prod_origin else [])
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
async def health():
    return {"message": "Satisfied ?"}

app.include_router(authRouter, prefix="/api", tags=["Authentication"])
app.include_router(projRouter, prefix="/plan", tags=["Project"])
app.include_router(complaintRouter, prefix="/api", tags=["Complaints"])

if __name__ == "__main__":
    port = int(os.environ.get("PORT", 5000))
    uvicorn.run("index:app", reload=True, host="0.0.0.0", port=port)