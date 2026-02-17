@echo off
echo.
echo ==========================================
echo   COLLEGEHUB.SITE - SYSTEM CHECK
echo ==========================================
echo.

echo [1/6] Checking Node.js...
node --version 2>nul
if errorlevel 1 (
    echo    X Node.js NOT installed
) else (
    echo    √ Node.js installed
)

echo.
echo [2/6] Checking npm packages...
if exist "node_modules\" (
    echo    √ Frontend dependencies installed
) else (
    echo    X Frontend dependencies missing - Run: npm install
)

if exist "backend\node_modules\" (
    echo    √ Backend dependencies installed
) else (
    echo    X Backend dependencies missing - Run: cd backend ^&^& npm install
)

echo.
echo [3/6] Checking environment files...
if exist ".env" (
    echo    √ Frontend .env exists
) else (
    echo    X Frontend .env missing
)

if exist "backend\.env" (
    echo    √ Backend .env exists
) else (
    echo    X Backend .env missing
)

echo.
echo [4/6] Checking running processes...
netstat -ano 2>nul | findstr ":3001" | findstr "LISTENING" >nul 2>&1
if errorlevel 1 (
    echo    X Frontend NOT running on port 3001
    echo      Start with: npm run dev
) else (
    echo    √ Frontend running on http://localhost:3001
)

netstat -ano 2>nul | findstr ":5000" | findstr "LISTENING" >nul 2>&1
if errorlevel 1 (
    echo    X Backend NOT running on port 5000
    echo      Check MongoDB connection
) else (
    echo    √ Backend running on http://localhost:5000
)

echo.
echo [5/6] Checking MongoDB...
netstat -ano 2>nul | findstr ":27017" | findstr "LISTENING" >nul 2>&1
if errorlevel 1 (
    echo    X MongoDB NOT running locally
    echo      Use MongoDB Atlas or install MongoDB locally
) else (
    echo    √ MongoDB running on port 27017
)

echo.
echo [6/6] Checking build status...
if exist ".next\BUILD_ID" (
    echo    √ Production build completed
) else (
    echo    - Production build not run yet
    echo      Run: npm run build
)

echo.
echo ==========================================
echo   NEXT STEPS
echo ==========================================
echo.
echo 1. Setup MongoDB (see SETUP_GUIDE.md)
echo 2. Start Backend: cd backend ^&^& npm run dev
echo 3. Frontend is already running on port 3001
echo 4. Access: http://localhost:3001
echo.
echo For complete setup: See SETUP_GUIDE.md
echo ==========================================
echo.
pause
