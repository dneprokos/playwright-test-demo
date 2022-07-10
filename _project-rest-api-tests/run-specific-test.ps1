param([Parameter(Mandatory)]$testName)
Write-Output "Running UI test $testName"
npx playwright test -g "$testName"