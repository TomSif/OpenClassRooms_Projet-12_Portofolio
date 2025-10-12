# Script pour déplacer tous les fichiers d'images vers un dossier "travaux" à plat
# Tous les fichiers seront déplacés dans un seul répertoire sans structure de dossiers

function Move-AllImagesToTravaux {
    param(
        [string]$SourcePath,
        [string]$DestinationPath
    )
    
    Write-Host "Déplacement de tous les fichiers depuis: $SourcePath" -ForegroundColor Green
    Write-Host "Vers le dossier: $DestinationPath" -ForegroundColor Green
    Write-Host ""
    
    # Créer le dossier de destination s'il n'existe pas
    if (-not (Test-Path $DestinationPath)) {
        New-Item -Path $DestinationPath -ItemType Directory -Force
        Write-Host "Dossier 'travaux' créé: $DestinationPath" -ForegroundColor Yellow
    }
    
    # Obtenir tous les fichiers image récursivement
    $allImageFiles = Get-ChildItem -Path $SourcePath -File -Recurse | Where-Object { 
        $_.Extension -match '\.(jpg|jpeg|png|gif|webp|bmp|tiff)$' 
    }
    
    $totalFiles = $allImageFiles.Count
    $currentFile = 0
    
    Write-Host "Nombre total de fichiers à déplacer: $totalFiles" -ForegroundColor Cyan
    Write-Host ""
    
    foreach ($file in $allImageFiles) {
        $currentFile++
        $relativePath = $file.FullName.Substring($SourcePath.Length + 1)
        $destinationFilePath = Join-Path $DestinationPath $file.Name
        
        # Gérer les conflits de noms (si un fichier avec le même nom existe déjà)
        $counter = 1
        $originalName = [System.IO.Path]::GetFileNameWithoutExtension($file.Name)
        $extension = $file.Extension
        
        while (Test-Path $destinationFilePath) {
            $newName = "$originalName-duplicate$counter$extension"
            $destinationFilePath = Join-Path $DestinationPath $newName
            $counter++
        }
        
        try {
            Write-Host "[$currentFile/$totalFiles] Déplacement: $relativePath -> $(Split-Path $destinationFilePath -Leaf)" -ForegroundColor Cyan
            Move-Item -Path $file.FullName -Destination $destinationFilePath -ErrorAction Stop
        }
        catch {
            Write-Host "    Erreur lors du déplacement de $relativePath : $($_.Exception.Message)" -ForegroundColor Red
        }
    }
}

# Chemins source et destination
$imagesPath = "public\images"
$travauxPath = "travaux"

$fullImagesPath = Join-Path (Get-Location) $imagesPath
$fullTravauxPath = Join-Path (Get-Location) $travauxPath

Write-Host "=== Début du déplacement des fichiers vers 'travaux' ===" -ForegroundColor Magenta
Write-Host ""

if (Test-Path $fullImagesPath) {
    Move-AllImagesToTravaux -SourcePath $fullImagesPath -DestinationPath $fullTravauxPath
    
    # Optionnel: Supprimer les dossiers vides après le déplacement
    Write-Host ""
    Write-Host "Suppression des dossiers vides..." -ForegroundColor Yellow
    
    try {
        Get-ChildItem -Path $fullImagesPath -Directory -Recurse | 
        Where-Object { (Get-ChildItem -Path $_.FullName -Recurse -File).Count -eq 0 } |
        Sort-Object FullName -Descending |
        ForEach-Object {
            Write-Host "Suppression du dossier vide: $($_.FullName.Substring($fullImagesPath.Length + 1))" -ForegroundColor Gray
            Remove-Item -Path $_.FullName -Force
        }
        
        # Vérifier si le dossier images principal est vide et le supprimer si nécessaire
        $remainingItems = Get-ChildItem -Path $fullImagesPath -Recurse
        if ($remainingItems.Count -eq 0) {
            Write-Host "Le dossier 'images' est maintenant vide et sera conservé pour la structure." -ForegroundColor Gray
        }
    }
    catch {
        Write-Host "Erreur lors de la suppression des dossiers vides: $($_.Exception.Message)" -ForegroundColor Red
    }
}
else {
    Write-Host "Dossier images non trouvé: $fullImagesPath" -ForegroundColor Red
}

Write-Host ""
Write-Host "=== Déplacement terminé ===" -ForegroundColor Magenta
Write-Host "Tous les fichiers ont été déplacés vers le dossier 'travaux'" -ForegroundColor Green