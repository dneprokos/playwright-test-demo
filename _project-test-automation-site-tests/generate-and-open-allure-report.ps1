Write-Output "Html report generation..."
allure generate
Write-Output "Opening report on Allure server..."
allure serve