#!/bin/bash

echo "Setting up Varis Office GPIO Service..."

cd /home/varis/varis-office/gpio

echo "Creating virtual environment..."
python3 -m venv venv

echo "Activating virtual environment and installing dependencies..."
source venv/bin/activate
pip install -r requirements.txt

echo "Making start script executable..."
chmod +x start_server.py

echo "Installing systemd service..."
sudo cp varis-office.service /etc/systemd/system/
sudo systemctl daemon-reload
sudo systemctl enable varis-office.service

echo "Starting the service..."
sudo systemctl start varis-office.service

echo "Checking service status..."
sudo systemctl status varis-office.service

echo "Setup complete! The service will now start automatically on boot."
echo "To check logs: sudo journalctl -u varis-office.service -f"
echo "To restart: sudo systemctl restart varis-office.service"
echo "To stop: sudo systemctl stop varis-office.service"
