Add-Type -AssemblyName System.Drawing

$sourcePath = Join-Path (Get-Location) "public\images\wm-hero-cinematic.jpg"
$destPath = Join-Path (Get-Location) "public\images\wm-hero-cinematic-flipped.jpg"

$srcBitmap = New-Object System.Drawing.Bitmap($sourcePath)
$srcBitmap.RotateFlip([System.Drawing.RotateFlipType]::RotateNoneFlipX)
$srcBitmap.Save($destPath, [System.Drawing.Imaging.ImageFormat]::Jpeg)
$srcBitmap.Dispose()

Write-Host "Success! Flipped cinematic image saved to $destPath"
