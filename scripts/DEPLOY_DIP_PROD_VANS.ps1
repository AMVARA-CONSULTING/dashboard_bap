
# AMVARA
# 2019-09-30 ABP Add manifest modification
# Deploy script to DIP PROD Vans

# Backup files

echo "Making backup..."
$baseFolder = "D:\NAS\ibiss-isn-shared-prod\shared-internal\webcontent\DIPRE\"
$backupsFolder = "D:\NAS\ibiss-isn-shared-prod\shared-internal\webcontent\DIPRE\vans\bkp\"
$time = Get-Date -UFormat "v2_vans__%d_%m_%Y__%H_%M_%S"
New-Item -ItemType directory -Path $backupsFolder$time
Copy-Item -Path $baseFolder"*.*" -Destination $backupsFolder$time
Copy-Item $baseFolder"assets" -Recurse -Destination $backupsFolder$time"\assets"

# Copy files

echo "Copying new files..."
Get-ChildItem $baseFolder"*.*" -exclude more.html | Where { ! $_.PSIsContainer } | remove-item
Remove-Item $baseFolder"assets" -Force -Recurse
$codeSrc = "./src/"
New-Item -ItemType directory -Path $baseFolder"assets"
Copy-item -Force -Recurse -Path $codeSrc"*" -Destination $baseFolder
Copy-item more.html -Destination $baseFolder

# Edit Config JSON file and modify environment variables

echo "Modifying cognos.json..."
$configFile = $baseFolder+"assets\cognos.json"
$config = Get-Content $configFile -Encoding UTF8 -Raw | ConvertFrom-Json
$config.scenario = "prod"
$config.target = "vans"
$config.debug = $False
$config | ConvertTo-Json -Depth 50 | set-content $configFile

# Edit Manifest JSON file to have the correct parameters

echo "Modifying manifest.json..."
$manifestFile = $baseFolder+"manifest.json"
$manifest = Get-Content $manifestFile -Encoding UTF8 -Raw | ConvertFrom-Json
$manifest.scope = "/internal/bi/app/DIPRE/vans/"
$manifest.start_url = "/internal/bi/app/DIPRE/vans/"
$manifest | ConvertTo-Json -Depth 50 | set-content $manifestFile

echo "Done!"
Start-Sleep -s 2