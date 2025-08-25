#!/bin/bash

case "$1" in
    start)
        echo "Starting all Varis Office services..."
        sudo systemctl start varis-office-gpio.service
        sudo systemctl start varis-office-frontend.service
        sudo systemctl start varis-office-tunnel.service
        echo "All services started!"
        ;;
    stop)
        echo "Stopping all Varis Office services..."
        sudo systemctl stop varis-office-gpio.service
        sudo systemctl stop varis-office-frontend.service
        sudo systemctl stop varis-office-tunnel.service
        echo "All services stopped!"
        ;;
    restart)
        echo "Restarting all Varis Office services..."
        sudo systemctl restart varis-office-gpio.service
        sudo systemctl restart varis-office-frontend.service
        sudo systemctl restart varis-office-tunnel.service
        echo "All services restarted!"
        ;;
    status)
        echo "Varis Office Services Status:"
        echo "============================="
        sudo systemctl status varis-office-gpio.service --no-pager -l
        echo ""
        sudo systemctl status varis-office-frontend.service --no-pager -l
        echo ""
        sudo systemctl status varis-office-tunnel.service --no-pager -l
        ;;
    logs)
        case "$2" in
            gpio)
                sudo journalctl -u varis-office-gpio.service -f
                ;;
            frontend)
                sudo journalctl -u varis-office-frontend.service -f
                ;;
            tunnel)
                sudo journalctl -u varis-office-tunnel.service -f
                ;;
            *)
                echo "Usage: $0 logs {gpio|frontend|tunnel}"
                exit 1
                ;;
        esac
        ;;
    *)
        echo "Usage: $0 {start|stop|restart|status|logs}"
        echo ""
        echo "Commands:"
        echo "  start    - Start all services"
        echo "  stop     - Stop all services"
        echo "  restart  - Restart all services"
        echo "  status   - Show status of all services"
        echo "  logs     - Show logs for specific service (gpio|frontend|tunnel)"
        echo ""
        echo "Examples:"
        echo "  $0 start"
        echo "  $0 logs gpio"
        echo "  $0 status"
        exit 1
        ;;
esac
