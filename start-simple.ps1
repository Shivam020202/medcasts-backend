#!/usr/bin/env pwsh
# Start the server without nodemon

Set-Location $PSScriptRoot

Write-Host "Starting server with ts-node..." -ForegroundColor Cyan

& npx ts-node ./src/server.ts
