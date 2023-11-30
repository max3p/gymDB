@echo off

start cmd /c "cd /d front-end && npx http-server --cors -o /index.html"

start cmd /c "cd /d back-end && node api.js"

:: Open the default web browser with the URL
:: start http://localhost:8080/


