Write-Output "Html report generation..."
allure generate --clean
Write-Output "Opening report on Allure server..."
allure serve