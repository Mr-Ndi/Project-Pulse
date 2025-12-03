
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import uvicorn

from src.routes.authRouter import authRouter
from src.routes.projRouter import projRouter

app = FastAPI(
    docs_url="/docs",
    title="Project Pulse Backend API",
    redoc_url=None,
    swagger_ui_parameters={"defaultModelsExpandDepth": -1}
)

# Allow CORS from anywhere
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
async def health():
    return {"message": "Satisfied ?"}

app.include_router(authRouter, prefix="/api", tags=["Authentication"])
app.include_router(projRouter, prefix="/plan", tags=["Project"])

if __name__ == "__main__":
    uvicorn.run("index:app", reload=True, host="127.0.0.1", port=5000)