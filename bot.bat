@echo off
set SCRIPT="%TEMP%\CreateShortcut.vbs"
echo Set WshShell = WScript.CreateObject("WScript.Shell") > %SCRIPT%
echo Set oShellLink = WshShell.CreateShortcut(WshShell.SpecialFolders("Desktop") ^& "\Bot UCP Gyu.lnk") >> %SCRIPT%
echo oShellLink.TargetPath = "%~dp0bot.bat" >> %SCRIPT%
echo oShellLink.WorkingDirectory = "%~dp0" >> %SCRIPT%
echo oShellLink.WindowStyle = 1 >> %SCRIPT%
echo oShellLink.IconLocation = "%SystemRoot%\system32\SHELL32.dll, 1" >> %SCRIPT%
echo oShellLink.Description = "Untuk Running Bot Node JS" >> %SCRIPT%
echo oShellLink.Save >> %SCRIPT%
cscript /nologo %SCRIPT%
del %SCRIPT%

:start
echo =================================================================
echo                  BOT MANAGEMENT FORGE NETWORK
echo =================================================================
echo.
timeout /t 3 /nobreak >nul
echo =================================================================
echo                  WELCOME OWNER, FORGE NETWORK
echo =================================================================
echo.
timeout /t 2 /nobreak >nul
echo.
echo =================================================================
echo         Wajib Menginstall Resource Terlebih Dahulu Dengan CMD:
echo                               npm install
echo =================================================================
echo.
cls
echo =================================================================
echo             MENJALANKAN BOT MANAGEMENT HARAP TUNGGU
echo =================================================================

node index.js

if %errorlevel% neq 0 (
    echo Menjalankan Bot Kembali Jika Error Silahkan Close
    timeout /t 5 /nobreak >nul
    goto start
)

pause
