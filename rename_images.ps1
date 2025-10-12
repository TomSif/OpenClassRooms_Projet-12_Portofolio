# Script pour renommer toutes les images selon le format dossier-parent-dossier-numéro
# Exemple: photography/ayutthaya-1 devient photography-ayutthaya-1, etc.

function Rename-ImagesInFolder {
    param(
        [string]$BasePath
    )
    
    Write-Host "Traitement du dossier: $BasePath" -ForegroundColor Green
    
    # Extraire le nom du dossier parent pour le préfixe
    $parentFolderName = Split-Path $BasePath -Leaf
    $cleanParentName = $parentFolderName -replace '=', '' -replace '\s', ''
    
    # Obtenir tous les sous-dossiers
    $subFolders = Get-ChildItem -Path $BasePath -Directory
    
    foreach ($folder in $subFolders) {
        $folderPath = $folder.FullName
        $folderName = $folder.Name
        
        # Nettoyer le nom du dossier (enlever les = si présents)
        $cleanFolderName = $folderName -replace '=', ''
        
        Write-Host "  Processing folder: $folderName -> $cleanParentName-$cleanFolderName" -ForegroundColor Yellow
        
        # Obtenir tous les fichiers image dans le dossier
        $imageFiles = Get-ChildItem -Path $folderPath -File | Where-Object { 
            $_.Extension -match '\.(jpg|jpeg|png|gif|webp|bmp|tiff)$' 
        } | Sort-Object Name
        
        if ($imageFiles.Count -gt 0) {
            $counter = 1
            
            foreach ($file in $imageFiles) {
                $extension = $file.Extension
                $newName = "$cleanParentName-$cleanFolderName-$counter$extension"
                $newPath = Join-Path $folderPath $newName
                
                # Éviter de renommer si le nom est déjà correct
                if ($file.Name -ne $newName) {
                    try {
                        Write-Host "    Renaming: $($file.Name) -> $newName" -ForegroundColor Cyan
                        Rename-Item -Path $file.FullName -NewName $newName -ErrorAction Stop
                    }
                    catch {
                        Write-Host "    Erreur lors du renommage de $($file.Name): $($_.Exception.Message)" -ForegroundColor Red
                    }
                }
                else {
                    Write-Host "    Fichier déjà nommé correctement: $newName" -ForegroundColor Gray
                }
                
                $counter++
            }
        }
        else {
            Write-Host "    Aucune image trouvée dans ce dossier" -ForegroundColor Gray
        }
    }
}

# Dossiers à traiter
$imagePaths = @(
    "public\images\photography",
    "public\images\graphic",
    "public\images\projects",
    "public\images\thumbnails\=photography=",
    "public\images\thumbnails\=graphic=",
    "public\images\thumbnails\= Personal =",
    "public\images\thumbnails\=Selected Works=",
    "public\images\works"
)

Write-Host "=== Début du renommage des images ===" -ForegroundColor Magenta
Write-Host ""

foreach ($imagePath in $imagePaths) {
    $fullPath = Join-Path (Get-Location) $imagePath
    
    if (Test-Path $fullPath) {
        Rename-ImagesInFolder -BasePath $fullPath
        Write-Host ""
    }
    else {
        Write-Host "Dossier non trouvé: $fullPath" -ForegroundColor Red
        Write-Host ""
    }
}

Write-Host "=== Renommage terminé ===" -ForegroundColor Magenta