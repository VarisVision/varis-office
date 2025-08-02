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

echo "Both services are starting..."
echo "Frontend will be available at: http://localhost:3000"
echo "GPIO API will be available at: http://localhost:8000"
echo ""
echo "Press Ctrl+C to stop both services"

trap 'echo ""; echo "Stopping services..."; kill $GPIO_PID $FE_PID 2>/dev/null; echo "Services stopped"; exit 0' INT

wait 