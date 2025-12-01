from fastApi import FASTAPI

app = FASTAPI()
@app.get("")
async def health():
    return {"message": "Satisied ?"}