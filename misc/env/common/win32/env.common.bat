ECHO OFF
ECHO.
IF EXIST ..\..\local\win32\env.local.bat call ..\..\local\win32\env.local.bat

IF NOT EXIST ..\..\local\win32\env.local.bat ECHO Error: env.local.bat Not Found!!! Look at ..\..\local_examples directory.
IF NOT EXIST ..\..\local\win32\env.local.bat mkdir ..\..\local\win32
IF NOT EXIST ..\..\local\win32\env.local.bat PAUSE

REM Cygwin must come before GIT to avoid ssh.exe conflicts in rsync
REM SET CYGWIN_HOME=C:\Cygwin
SET PATH=%PATH%;%GIT_HOME%\bin

SET PATH=%PATH%;%NODEJS_HOME%
SET PATH=%PATH%;%AppData%\npm

SET PATH=%PATH%;%PROJECT_HOME%\misc\env\common\win32\scripts
SET PATH=%PATH%;%PROJECT_HOME%\misc\env\local\win32
SET PATH=%PATH%;%windir%
SET PATH=%PATH%;%windir%\System32

cd "%PROJECT_HOME%"

ECHO Common Environment Setup.

IF EXIST "%PROJECT_HOME%\misc\env\user\win32\env.user.bat" call "%PROJECT_HOME%\misc\env\user\win32\env.user.bat"

ECHO.

