@echo off
if "%1" EQU "" goto runserver
if "%1" EQU "new" goto new
if "%1" EQU "rundev" goto rundev

:new
docker run -p 6379:6379 -d redis:6.0.6

:rundev
cd www && npm run dev && cd .. && python manage.py runserver
goto end

:runserver
python manage.py runserver

:end