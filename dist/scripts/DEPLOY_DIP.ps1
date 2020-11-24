# AMVARA
# 2020-11-24 ABP Add command line script parameters
# 2020-11-23 ABP Create menu to deploy on INT / PROD and TRUCKS / VANS
# 2019-10-01 ABP Modify script deploy path and better code
# 2019-09-30 ABP Add manifest modification
# Deploy script to DIP PROD Vans

param (
    [Parameter()][ValidateSet('int','prod')][string[]]$env,
    [Parameter()][ValidateSet('trucks','vans')][string[]]$target,
    [Switch]$sure
)

# Functions

# Show menu to select either INT or PROD and assign result to $env
function EnvMenu {
    Write-Host "`n"
    Write-Host "Select environment to deploy:"
    Write-Host "1. INT"
    Write-Host "2. PROD"
    $envInput = Read-Host "Selection"
    switch ($envInput) {
        1 {
            return "int"
        }
        2 {
            return "prod"
        }
        Default {
          EnvMenu  
        }
    }
}

# Show menu to select either TRUCKS or VANS and assign result to $target
function TargetMenu {
    Write-Host "`n"
    Write-Host "Select target to deploy:"
    Write-Host "1. TRUCKS"
    Write-Host "2. VANS"
    $envInput = Read-Host "Selection"
    switch ($envInput) {
        1 {
            return "trucks"
        }
        2 {
            return "vans"
        }
        Default {
          TargetMenu  
        }
    }
}

function Sure {
    $input = Read-Host "Are you sure you want to proceed?(y/n)"
    return $input -eq "y"
}

# Set path to script folder
$scriptPath = $MyInvocation.MyCommand.Path
$dir = Split-Path $scriptPath
cd $dir

# Backup files

cd ..
if (!(Test-Path "manifest.json" -PathType Leaf)) {
    Get-Location
    echo "Wrong directory, please create a 'scripts' folder behind the build files and move or copy this script inside the just created 'scripts' folder."
    Exit
}

# Run prompts
cls
Write-Host "========= DEPLOY DIP ========="
if ($env -eq $null) {
    $env = EnvMenu
}
if ($target -eq $null) {
    $target = TargetMenu
}
Write-Host "`n"
Write-Host "Selected environment: $env"
Write-Host "Selected target: $target"

if ($sure -eq $False) {
    if ( (!(Sure)) ) {
        cd ..
        exit
    }
}

# Make backup of destiny files

$baseFolder = "\\sedcspi1001f.emea.isn.corpintra.net\eedc_o00030\ibiss-isn-shared-$env\shared-internal\webcontent\DIPRE\"
if (Test-Path $baseFolder) {
    Write-Host "Destiny network folder is accessible"
} else {
    Write-Host "Destiny network folder is not accessible, exiting..."
    cd ..
    exit
}
Write-Host "Making backup..."
$subfolder = ""
if ( $env -eq "int" ) {
    if ( $target -eq "trucks" ) {
        $subFolder = "v2\"
    } else {
        $subFolder = "vans\"
    }
} else {
    if ( $target -eq "vans" ) {
        $subFolder = "vans\" 
    }
}
$destiny = $baseFolder + $subfolder
$backupsFolder = "$($baseFolder)bkp\"
$time = Get-Date -UFormat "%Y_%m_%d__%H_%M_%S__$target"
# Copy destiny files to backup folder
$null = New-Item -ItemType directory -Path $backupsFolder$time
Copy-Item -Path $destiny"*.*" -Destination $backupsFolder$time -ErrorAction SilentlyContinue
Copy-Item $destiny"assets" -Recurse -Destination $backupsFolder$time"\assets" -ErrorAction SilentlyContinue

# Copy files to destiny

echo "Removing destiny files..."
# Remove main files of destiny folder except for more.html
Get-ChildItem $destiny"*.*" -exclude more.html | Where { ! $_.PSIsContainer } | remove-item -ErrorAction SilentlyContinue
# Remove assets folder of destiny folder
Remove-Item $destiny"assets" -Force -Recurse -ErrorAction SilentlyContinue

echo "Copying new files..."
# Create assets folder in destiny
Start-Sleep -s 2
$null = New-Item -ItemType directory -Path $destiny"assets"
# Rename index.cognos.html to index.html
Rename-Item -Path index.cognos.html -NewName index.html
# Copy all files to destiny, including assets folder
Copy-item -Force -Recurse -Path "*" -Destination $destiny
# Copy-item more.html -Destination $destiny

# Edit Config JSON file and modify environment variables

echo "Modifying cognos.json..."
$configFile = $destiny+"assets\config_daimler.json"
$config = Get-Content $configFile -Encoding UTF8 -Raw | ConvertFrom-Json
$config.scenario = $env
$config.target = $target
# Enable debug only in INT
if ( $env -eq "int" ) {
    $config.debug = $True
} else {
    $config.debug = $False
}
$config | ConvertTo-Json -Depth 50 | set-content $configFile

# Edit Manifest JSON file to have the correct parameters

echo "Modifying manifest.json..."
$manifestFile = $destiny+"manifest.json"
$manifest = Get-Content $manifestFile -Encoding UTF8 -Raw | ConvertFrom-Json
# Replace \ to / in subfolder path
$subfolder = $subfolder.replace("\", "/")
$manifest.scope = "/internal/bi/app/DIPRE/$subfolder"
$manifest.start_url = "/internal/bi/app/DIPRE/$subfolder"
$manifest | ConvertTo-Json -Depth 50 | set-content $manifestFile

cd scripts
echo "Done!"
Start-Sleep -s 2