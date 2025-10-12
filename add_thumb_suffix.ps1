# Script pour ajouter la terminaison -thumb uniquement aux fichiers dans les dossiers thumbnails
# Exemple: Personal-Bookmark-1.webp devient Personal-Bookmark-1-thumb.webp

function Add-ThumbSuffix {
    param(
        [string]$BasePath
    )
    
    Write-Host "Traitement du dossier thumbnails: $BasePath" -ForegroundColor Green
    
    # Obtenir tous les sous-dossiers
    $subFolders = Get-ChildItem -Path $BasePath -Directory -Recurse
    
    foreach ($folder in $subFolders) {
        $folderPath = $folder.FullName
        $relativePath = $folder.FullName.Substring($BasePath.Length)
        
        Write-Host "  Processing folder: $relativePath" -ForegroundColor Yellow
        
        # Obtenir tous les fichiers image dans le dossier
        $imageFiles = Get-ChildItem -Path $folderPath -File | Where-Object { 
            $_.Extension -match '\.(jpg|jpeg|png|gif|webp|bmp|tiff)$' 
        }
        
        if ($imageFiles.Count -gt 0) {
            foreach ($file in $imageFiles) {
                $baseName = [System.IO.Path]::GetFileNameWithoutExtension($file.Name)
                $extension = $file.Extension
                
                # Vérifier si le fichier n'a pas déjà la terminaison -thumb
                if (-not $baseName.EndsWith('-thumb')) {
                    $newName = "$baseName-thumb$extension"
                    
                    try {
                        Write-Host "    Renaming: $($file.Name) -> $newName" -ForegroundColor Cyan
                        Rename-Item -Path $file.FullName -NewName $newName -ErrorAction Stop
                    }
                    catch {
                        Write-Host "    Erreur lors du renommage de $($file.Name): $($_.Exception.Message)" -ForegroundColor Red
                    }
                }
                else {
                    Write-Host "    Fichier déjà avec -thumb: $($file.Name)" -ForegroundColor Gray
                }
            }
        }
        else {
            Write-Host "    Aucune image trouvée dans ce dossier" -ForegroundColor Gray
        }
    }
}

# Dossier thumbnails à traiter
$thumbnailsPath = "public\images\thumbnails"
$fullThumbnailsPath = Join-Path (Get-Location) $thumbnailsPath

Write-Host "=== Début de l'ajout de la terminaison -thumb ===" -ForegroundColor Magenta
Write-Host ""

if (Test-Path $fullThumbnailsPath) {
    Add-ThumbSuffix -BasePath $fullThumbnailsPath
}
else {
    Write-Host "Dossier thumbnails non trouvé: $fullThumbnailsPath" -ForegroundColor Red
}

Write-Host ""
Write-Host "=== Ajout de la terminaison -thumb terminé ===" -ForegroundColor Magenta