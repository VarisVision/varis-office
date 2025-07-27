from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from gpiozero import PWMLED
from contextlib import asynccontextmanager

@asynccontextmanager
async def lifespan(app: FastAPI):
    global led
    led = PWMLED(17)
    yield

app = FastAPI(lifespan=lifespan)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000", "http://127.0.0.1:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.put("/brightness/{value}")
def set_brightness(value: float):
    led.value = value / 100
    return {"message": f"LED brightness set to {value}"}