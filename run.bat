@REM Open new cmd window and run "dotnet watch run" in the root folder
@start cmd /k "cd %~dp0 && dotnet watch run"
@REM  Open new cmd window and cd to ClientApp folder and run "yarn dev" in the ClientApp folder
@start cmd /k "cd %~dp0ClientApp && yarn dev"

