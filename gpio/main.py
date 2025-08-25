from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from gpiozero import DigitalOutputDevice
from contextlib import asynccontextmanager
from fastapi.responses import JSONResponse

@asynccontextmanager
async def lifespan(app: FastAPI):
    global pin_17, pin_27, pin_21, pin_20
    pin_17 = DigitalOutputDevice(17, initial_value=True)
    pin_27 = DigitalOutputDevice(27, initial_value=True)
    pin_21 = DigitalOutputDevice(21, initial_value=True)
    pin_20 = DigitalOutputDevice(20, initial_value=True)
    yield

app = FastAPI(lifespan=lifespan)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=False,
    allow_methods=["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allow_headers=["*"],
    expose_headers=["*"],
)
@app.put("/power17/{state}")
def set_power_17(state: str):
    if state.lower() == "on":
        pin_17.off()
        return {"message": "Relay 17 turned ON"}
    elif state.lower() == "off":
        pin_17.on()
        return {"message": "Relay 17 turned OFF"}
    else:
        return {"error": "Invalid state. Use 'on' or 'off'"}

@app.put("/power27/{state}")
def set_power_27(state: str):
    if state.lower() == "on":
        pin_27.off()
        return {"message": "Relay 27 turned ON"}
    elif state.lower() == "off":
        pin_27.on()
        return {"message": "Relay 27 turned OFF"}
    else:
        return {"error": "Invalid state. Use 'on' or 'off'"}

@app.put("/power21/{state}")
def set_power_21(state: str):
    if state.lower() == "on":
        pin_21.off()
        return {"message": "Relay 21 turned ON"}
    elif state.lower() == "off":
        pin_21.on()
        return {"message": "Relay 21 turned OFF"}
    else:
        return {"error": "Invalid state. Use 'on' or 'off'"}

@app.put("/power20/{state}")
def set_power_20(state: str):
    if state.lower() == "on":
        pin_20.off()
        return {"message": "Relay 20 turned ON"}
    elif state.lower() == "off":
        pin_20.on()
        return {"message": "Relay 20 turned OFF"}
    else:
        return {"error": "Invalid state. Use 'on' or 'off'"}


@app.get("/power17")
def get_power_17_status():
    return {"power": "on" if not pin_17.value else "off"}

@app.get("/power27")
def get_power_27_status():
    return {"power": "on" if not pin_27.value else "off"}

@app.get("/power21")
def get_power_21_status():
    return {"power": "on" if not pin_21.value else "off"}

@app.get("/power20")
def get_power_20_status():
    return {"power": "on" if not pin_20.value else "off"}

@app.options("/power17/{state}")
@app.options("/power27/{state}")
@app.options("/power21/{state}")
@app.options("/power20/{state}")
async def options_power(state: str):
    return JSONResponse(
        content={},
        status_code=200,
        headers={
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
            "Access-Control-Allow-Headers": "*",
            "Access-Control-Allow-Credentials": "false"
        }
    )
