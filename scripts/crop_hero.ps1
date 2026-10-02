Add-Type -AssemblyName System.Drawing

$sourcePath = Join-Path (Get-Location) "public\images\wm-hero-action.jpg"
$destPath = Join-Path (Get-Location) "public\images\wm-hero-action-clean.png"

$srcBitmap = New-Object System.Drawing.Bitmap($sourcePath)
$width = $srcBitmap.Width
$height = $srcBitmap.Height

Write-Host "Original Dimensions: ${width}x${height}"

# The left ~19% is the vertical thumbnails strip from Instagram/screenshot.
# Let's crop from X = 19% of width to the right edge.
$cropX = [int]($width * 0.19)
$cropY = 0
$cropWidth = $width - $cropX
# Also trim bottom ~4% to remove audio icon / ui bar
$cropHeight = [int]($height * 0.96)

$rect = New-Object System.Drawing.Rectangle($cropX, $cropY, $cropWidth, $cropHeight)
$cropBitmap = $srcBitmap.Clone($rect, $srcBitmap.PixelFormat)

# Save to destination
$cropBitmap.Save($destPath, [System.Drawing.Imaging.ImageFormat]::Png)

Write-Host "Cropped Dimensions: $($cropBitmap.Width)x$($cropBitmap.Height)"

$cropBitmap.Dispose()
$srcBitmap.Dispose()

Write-Host "Success! Clean image saved to $destPath"
