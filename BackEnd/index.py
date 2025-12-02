from fastapi import FastAPI
import uvicorn

from src.routes.authRouter import authRouter

app = FastAPI()

@app.get("/")
async def health():
    return {"message": "Satisfied ?"}

app.include_router(authRouter, prefix="/api", tags=["Auth"])

if __name__ == "__main__":
    uvicorn.run("index:app", reload=True, host="127.0.0.1", port=5000)