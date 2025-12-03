#!/usr/bin/env pwsh
# Start the MedCast backend server

Write-Host "🚀 Starting MedCast Backend Server..." -ForegroundColor Cyan

# Change to the script's directory
Set-Location $PSScriptRoot

# Check if node_modules exists
if (!(Test-Path "./node_modules")) {
    Write-Host "📦 Installing dependencies..." -ForegroundColor Yellow
    npm install
}

# Start the server
Write-Host "🎯 Launching server on port 5000..." -ForegroundColor Green
npm run dev
