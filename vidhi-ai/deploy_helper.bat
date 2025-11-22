@echo off
REM VIDHI AI - Deployment Helper Script
REM This script helps you prepare your code for deployment

echo ========================================
echo VIDHI AI - Deployment Helper
echo ========================================
echo.

REM Check if Git is installed
git --version >nul 2>&1
if %errorlevel% neq 0 (
    echo [ERROR] Git is not installed!
    echo Please download and install Git from: https://git-scm.com/download/win
    echo.
    pause
    exit /b 1
)

echo [OK] Git is installed
echo.

REM Check if we're in a git repository
if not exist ".git" (
    echo [INFO] This is not a Git repository yet.
    echo.
    choice /C YN /M "Do you want to initialize a Git repository"
    if errorlevel 2 goto :skip_init
    if errorlevel 1 (
        echo Initializing Git repository...
        git init
        echo [OK] Git repository initialized
        echo.
    )
)

:skip_init

REM Check for .gitignore
if not exist ".gitignore" (
    echo [WARNING] .gitignore file not found!
    echo This file is important to prevent sensitive data from being uploaded.
    echo.
) else (
    echo [OK] .gitignore file exists
    echo.
)

REM Check for sensitive files
if exist "server\.env" (
    echo [WARNING] Found server\.env file
    echo Make sure this file is listed in .gitignore!
    echo.
)

REM Show current git status
echo Current Git Status:
echo -------------------
git status
echo.

REM Ask if user wants to commit changes
choice /C YN /M "Do you want to commit your changes"
if errorlevel 2 goto :skip_commit
if errorlevel 1 (
    echo.
    set /p commit_message="Enter commit message: "
    git add .
    git commit -m "%commit_message%"
    echo [OK] Changes committed
    echo.
)

:skip_commit

REM Check if remote is set
git remote -v | findstr "origin" >nul 2>&1
if %errorlevel% neq 0 (
    echo [INFO] No remote repository configured
    echo.
    echo To push to GitHub:
    echo 1. Create a new repository on GitHub
    echo 2. Run: git remote add origin https://github.com/YOUR_USERNAME/vidhi-ai.git
    echo 3. Run: git push -u origin main
    echo.
) else (
    echo [OK] Remote repository is configured
    echo.
    choice /C YN /M "Do you want to push to GitHub"
    if errorlevel 2 goto :skip_push
    if errorlevel 1 (
        echo Pushing to GitHub...
        git push
        echo [OK] Pushed to GitHub
        echo.
    )
)

:skip_push

echo ========================================
echo Deployment Preparation Complete!
echo ========================================
echo.
echo Next Steps:
echo 1. Go to https://render.com and deploy your backend
echo 2. Go to https://vercel.com and deploy your frontend
echo 3. Update VITE_API_URL in Vercel environment variables
echo.
echo For detailed instructions, see DEPLOYMENT_GUIDE.md
echo.

pause
