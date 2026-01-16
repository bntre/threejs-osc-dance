@echo off
setlocal enabledelayedexpansion

:: ==========================================================
:: WebSocket Broadcast Server launcher (auto-deps)
:: Choose engine: js  or  py
set "ENGINE=js"
:: ==========================================================

if /i "%ENGINE%"=="js" goto :RUN_JS
if /i "%ENGINE%"=="py" goto :RUN_PY

echo [ERROR] ENGINE must be "js" or "py". Current: "%ENGINE%"
exit /b 1


:RUN_JS
echo [JS] Starting Node.js version...

where node >nul 2>nul || (
  echo [ERROR] Node.js is not found in PATH. Install Node.js and try again.
  exit /b 1
)

where npm >nul 2>nul || (
  echo [ERROR] npm is not found in PATH. Reinstall Node.js ^(npm should be included^).
  exit /b 1
)

if not exist "package.json" (
  echo [JS] package.json not found - running: npm init -y
  npm init -y >nul
  if errorlevel 1 (
    echo [ERROR] npm init failed.
    exit /b 1
  )
)

if not exist "node_modules\ws" (
  echo [JS] Dependency "ws" not found - running: npm install ws
  npm install ws
  if errorlevel 1 (
    echo [ERROR] npm install ws failed.
    exit /b 1
  )
)

node ws_broadcast_server.js
exit /b %errorlevel%


:RUN_PY
echo [PY] Starting Python version...

where python >nul 2>nul || (
  echo [ERROR] Python is not found in PATH. Install Python and try again.
  exit /b 1
)

python -c "import websockets" >nul 2>nul
if errorlevel 1 (
  echo [PY] Dependency "websockets" not found - installing...
  python -m pip install --user websockets
  if errorlevel 1 (
    echo [ERROR] pip install websockets failed.
    exit /b 1
  )
)

python ws_broadcast_server.py
exit /b %errorlevel%
