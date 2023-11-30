@echo off
cd /d "%~dp0back-end"
start /B cmd /c "node dbDriver.js ^& pause"

cd /d "%~dp0front-end"
start /B cmd /c "npx http-server --cors -o /index.html ^& pause"

:: Open the default web browser with the URL
:: start http://localhost:8080/


