
# AMVARA
# Deploy script to DIP PROD Trucks

# Backup

echo "Making backup..."
$baseFolder = "D:\NAS\ibiss-isn-shared-prod\shared-internal\webcontent\DIPRE\"
$backupsFolder = "D:\NAS\ibiss-isn-shared-prod\shared-internal\webcontent\DIPRE\bkp\"
$time = Get-Date -UFormat "v2__%d_%m_%Y__%H_%M_%S"
New-Item -ItemType directory -Path $backupsFolder$time
Copy-Item -Path $baseFolder"*.*" -Destination $backupsFolder$time
Copy-Item $baseFolder"assets" -Recurse -Destination $backupsFolder$time"\assets"

# Copy

echo "Copying new files..."
Get-ChildItem $baseFolder"*.*" -exclude more.html | Where { ! $_.PSIsContainer } | remove-item
Remove-Item $baseFolder"assets" -Force -Recurse
$codeSrc = "./src/"
New-Item -ItemType directory -Path $baseFolder"assets"
Copy-item -Force -Recurse -Path $codeSrc"*" -Destination $baseFolder
$configFile = $baseFolder+"assets\cognos.json"
$config = Get-Content $configFile -Encoding UTF8 -Raw | ConvertFrom-Json
$config.scenario = "prod"
$config.target = "trucks"
$config | ConvertTo-Json -Depth 50 | set-content $configFile