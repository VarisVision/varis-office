#!/bin/bash

echo "Starting Varis Office development environment..."

cd "$(dirname "$0")"

echo "Starting GPIO backend..."
cd gpio
python3 -m uvicorn main:app --host 0.0.0.0 --port 8000 --reload &
GPIO_PID=$!
cd ..

echo "Starting Frontend..."
cd FE
npm run dev &
FE_PID=$!
cd ..

echo "Starting Cloudflare tunnel..."
if [ -z "$CLOUDFLARE_TUNNEL_ID" ]; then
    echo "Warning: CLOUDFLARE_TUNNEL_ID environment variable not set"
    echo "Tunnel will not be started"
    TUNNEL_PID=""
else
    cloudflared tunnel run "$CLOUDFLARE_TUNNEL_ID" &
    TUNNEL_PID=$!
fi

echo "All services are starting..."
echo "Frontend will be available at: http://localhost:3000"
echo "GPIO API will be available at: http://localhost:8000"
echo "Tunnel will be available at: varis-office.webbyvaris.com and varis-office-api.webbyvaris.com"
echo ""
echo "Press Ctrl+C to stop all services"

trap 'echo ""; echo "Stopping services..."; kill $GPIO_PID $FE_PID 2>/dev/null; if [ ! -z "$TUNNEL_PID" ]; then kill $TUNNEL_PID 2>/dev/null; fi; echo "Services stopped"; exit 0' INT

wait 