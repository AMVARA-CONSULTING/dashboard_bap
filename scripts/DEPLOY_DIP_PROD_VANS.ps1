
# AMVARA
# 2019-10-01 ABP Modify script deploy path and better code
# 2019-09-30 ABP Add manifest modification
# Deploy script to DIP PROD Vans

# Backup files

cd ..
if (!(Test-Path "manifest.json" -PathType Leaf)) {
    echo "Wrong directory, please create a 'scripts' folder behind the build files and move or copy this script inside the just created 'scripts' folder."
    Exit
}
echo "DEPLOY DIP TO PROD"

echo "Making backup..."
$baseFolder = "\\sedcspi1001f.emea.isn.corpintra.net\eedc_o00030\ibiss-isn-shared-prod\shared-internal\webcontent\DIPRE\vans\"
$backupsFolder = "$($baseFolder)bkp\"
$time = Get-Date -UFormat "v2__%d_%m_%Y__%H_%M_%S"
$null = New-Item -ItemType directory -Path $backupsFolder$time
Copy-Item -Path $baseFolder"*.*" -Destination $backupsFolder$time -ErrorAction SilentlyContinue
Copy-Item $baseFolder"assets" -Recurse -Destination $backupsFolder$time"\assets" -ErrorAction SilentlyContinue

# Copy files

echo "Copying new files..."
Get-ChildItem $baseFolder"*.*" -exclude more.html | Where { ! $_.PSIsContainer } | remove-item -ErrorAction SilentlyContinue
Remove-Item $baseFolder"assets" -Force -Recurse -ErrorAction SilentlyContinue

$null = New-Item -ItemType directory -Path $baseFolder"assets"
Copy-item -Force -Recurse -Path "*" -Destination $baseFolder
Copy-item more.html -Destination $baseFolder

# Edit Config JSON file and modify environment variables

echo "Modifying cognos.json..."
$configFile = $baseFolder+"assets\cognos.json"
$config = Get-Content $configFile -Encoding UTF8 -Raw | ConvertFrom-Json
$config.scenario = "prod"
$config.target = "trucks"
$config.debug = $False
$config | ConvertTo-Json -Depth 50 | set-content $configFile

# Edit Manifest JSON file to have the correct parameters

echo "Modifying manifest.json..."
$manifestFile = $baseFolder+"manifest.json"
$manifest = Get-Content $manifestFile -Encoding UTF8 -Raw | ConvertFrom-Json
$manifest.scope = "/internal/bi/app/DIPRE/"
$manifest.start_url = "/internal/bi/app/DIPRE/"
$manifest | ConvertTo-Json -Depth 50 | set-content $manifestFile

cd scripts
echo "Done!"
Start-Sleep -s 2