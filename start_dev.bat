@echo off
echo ==========================================
echo      INNOBUS - STARTING DEVELOPMENT ENV
echo ==========================================

echo [1/5] Starting Backend & Database (Docker)...
docker-compose up -d --build
if %errorlevel% neq 0 (
    echo Error starting Docker. Make sure Docker Desktop is running.
    pause
    exit /b %errorlevel%
)

echo Waiting 15 seconds for Database to initialize...
timeout /t 15 /nobreak >nul

echo [2/5] Populating Mock Data...
python scripts/simulate_data.py

echo [3/5] Starting Web App (React)...
start "INNOBUS Web" cmd /k "cd web && "C:\Program Files\nodejs\npm.cmd" install && "C:\Program Files\nodejs\npm.cmd" run dev"

echo [4/5] Starting Admin Panel (React)...
start "INNOBUS Admin" cmd /k "cd admin && "C:\Program Files\nodejs\npm.cmd" install && "C:\Program Files\nodejs\npm.cmd" run dev"

echo [5/5] Mobile App Instructions...
echo To run the mobile app, open a new terminal, go to the 'mobile' folder and run:
echo flutter run

echo ==========================================
echo      ALL SERVICES STARTED
echo ==========================================
echo Backend: http://localhost:8000/docs
echo Web App: http://localhost:3000
echo Admin:   http://localhost:3001
echo ==========================================
pause
