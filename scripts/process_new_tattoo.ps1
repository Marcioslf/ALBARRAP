Add-Type -AssemblyName System.Drawing

$sourcePath = "C:\Users\Marcio Lira\.gemini\antigravity-ide\brain\49515671-f807-4f11-9a23-a0ebbc410a2a\.user_uploaded\media_1790014857915.png"
$destPath = Join-Path (Get-Location) "public\tattoos\wm-valkyrie-eagle.png"

$srcBitmap = New-Object System.Drawing.Bitmap($sourcePath)
$width = $srcBitmap.Width
$height = $srcBitmap.Height

Write-Host "Original Dimensions: ${width}x${height}"

# Trim bottom ~3.5% to remove any UI icon
$cropWidth = $width
$cropHeight = [int]($height * 0.965)

$rect = New-Object System.Drawing.Rectangle(0, 0, $cropWidth, $cropHeight)
$cropBitmap = $srcBitmap.Clone($rect, $srcBitmap.PixelFormat)

$cropBitmap.Save($destPath, [System.Drawing.Imaging.ImageFormat]::Png)
$cropBitmap.Dispose()
$srcBitmap.Dispose()

Write-Host "Success! Clean tattoo saved to $destPath"
