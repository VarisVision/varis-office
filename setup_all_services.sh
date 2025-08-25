#!/bin/bash

echo "Setting up Varis Office Services..."

cd /home/varis/varis-office

echo "Setting up GPIO Backend..."
cd gpio

if [ ! -d "venv" ]; then
    echo "Creating virtual environment for GPIO..."
    python3 -m venv venv
fi

echo "Installing GPIO dependencies..."
source venv/bin/activate
pip install -r requirements.txt

echo "Making GPIO start script executable..."
chmod +x start_server.py

cd ..

echo "Setting up Frontend..."
cd FE

if [ ! -d "node_modules" ]; then
    echo "Installing frontend dependencies..."
    npm install
fi

echo "Building frontend for production..."
npm run build

cd ..

echo "Installing systemd services..."

echo "Installing GPIO service..."
sudo cp gpio/varis-office-gpio.service /etc/systemd/system/

echo "Installing Frontend service..."
sudo cp FE/varis-office-frontend.service /etc/systemd/system/

echo "Installing Tunnel service..."
sudo cp varis-office-tunnel.service /etc/systemd/system/

echo "Reloading systemd daemon..."
sudo systemctl daemon-reload

echo "Enabling services to start on boot..."
sudo systemctl enable varis-office-gpio.service
sudo systemctl enable varis-office-frontend.service
sudo systemctl enable varis-office-tunnel.service

echo "Starting services..."
sudo systemctl start varis-office-gpio.service
sudo systemctl start varis-office-frontend.service
sudo systemctl start varis-office-tunnel.service

echo "Checking service status..."
echo ""
echo "GPIO Backend Status:"
sudo systemctl status varis-office-gpio.service --no-pager -l

echo ""
echo "Frontend Status:"
sudo systemctl status varis-office-frontend.service --no-pager -l

echo ""
echo "Tunnel Status:"
sudo systemctl status varis-office-tunnel.service --no-pager -l

echo ""
echo "Setup complete! All services will now start automatically on boot."
echo ""
echo "Useful commands:"
echo "  Check all services: sudo systemctl status varis-office-*"
echo "  View GPIO logs: sudo journalctl -u varis-office-gpio.service -f"
echo "  View Frontend logs: sudo journalctl -u varis-office-frontend.service -f"
echo "  View Tunnel logs: sudo journalctl -u varis-office-tunnel.service -f"
echo "  Restart all: sudo systemctl restart varis-office-*"
echo "  Stop all: sudo systemctl stop varis-office-*"
echo ""
echo "Services will be available at:"
echo "  Frontend: http://localhost:3000"
echo "  GPIO API: http://localhost:8000"
echo "  Tunnel: varis-office.webbyvaris.com and varis-office-api.webbyvaris.com"
