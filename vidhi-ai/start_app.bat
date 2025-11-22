@echo off
cd /d "%~dp0"
echo ===================================================
echo      VIDHI AI - Automatic Setup & Start Script
echo ===================================================
echo.
echo Current Directory: %CD%
echo.

echo Step 1/4: Checking Node.js installation...
node -v >nul 2>&1
if %errorlevel% neq 0 (
    echo Error: Node.js is not installed or not found.
    echo Please install Node.js from https://nodejs.org/ and restart your computer.
    pause
    exit
)
echo Node.js is installed!
echo.

echo Step 2/4: Checking npm installation...
call npm -v >nul 2>&1
if %errorlevel% neq 0 (
    echo Error: npm is not installed or not found.
    echo This usually comes with Node.js. Please reinstall Node.js.
    pause
    exit
)
echo npm is installed!
echo.

echo Step 3/4: Installing Client Dependencies...
if not exist "client" (
    echo Error: 'client' folder not found!
    pause
    exit
)
cd client
call npm install
if %errorlevel% neq 0 (
    echo Error installing client dependencies.
    pause
    exit
)
echo Client dependencies installed.
echo.

echo Step 4/4: Installing Server Dependencies...
cd ..\server
if not exist "package.json" (
    echo Error: 'server' folder or package.json not found!
    pause
    exit
)
call npm install
if %errorlevel% neq 0 (
    echo Error installing server dependencies.
    pause
    exit
)
echo Server dependencies installed.
echo.

echo ===================================================
echo      Starting VIDHI AI...
echo ===================================================
echo.
echo Opening Backend Server...
start "VIDHI AI Backend" cmd /k "npm start"

echo Opening Frontend Client...
cd ..\client
start "VIDHI AI Frontend" cmd /k "npm run dev"

echo.
echo Success! The application is starting up.
echo Please wait for the browser to open http://localhost:5173
echo.
pause
