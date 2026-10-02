Add-Type -AssemblyName System.Drawing

$sourcePath = Join-Path (Get-Location) "public\images\wm-hero-action-clean.png"
$destPath = Join-Path (Get-Location) "public\images\wm-hero-action-flipped.png"

$srcBitmap = New-Object System.Drawing.Bitmap($sourcePath)

# Flip horizontally
$srcBitmap.RotateFlip([System.Drawing.RotateFlipType]::RotateNoneFlipX)

$srcBitmap.Save($destPath, [System.Drawing.Imaging.ImageFormat]::Png)
$srcBitmap.Dispose()

Write-Host "Success! Flipped image saved to $destPath"
