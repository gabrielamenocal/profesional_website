@echo off
cd /d "%~dp0"
where node >nul 2>nul
if errorlevel 1 (
  echo Node.js was not found on this computer.
  echo Install the LTS version from https://nodejs.org/ and reopen this file.
  pause
  exit /b 1
)
start "" http://localhost:3000
node server.js
pause
