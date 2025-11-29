@echo off
title Aether - Full Stack Startup

echo Starting Backend...
start cmd /k "cd backend && node server.js"

echo Starting Frontend...
start cmd /k "cd frontend && npm run dev"

echo All systems starting. Closing launcher window.
exit
