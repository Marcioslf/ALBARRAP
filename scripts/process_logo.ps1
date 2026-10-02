Add-Type -AssemblyName System.Drawing

$sourcePath = "C:\Users\Marcio Lira\.gemini\antigravity-ide\brain\49515671-f807-4f11-9a23-a0ebbc410a2a\.user_uploaded\media_1790015149426.png"
$destOriginal = "c:\Users\Marcio Lira\TATTO 2\public\images\wm-logo-original.png"
$destTransparent = "c:\Users\Marcio Lira\TATTO 2\public\images\wm-logo.png"

# Ensure destination directory exists
$dir = [System.IO.Path]::GetDirectoryName($destTransparent)
if (-not (Test-Path $dir)) {
    New-Item -ItemType Directory -Path $dir -Force | Out-Null
}

Copy-Item -Path $sourcePath -Destination $destOriginal -Force

$bmp = [System.Drawing.Bitmap]::FromFile($sourcePath)
$width = $bmp.Width
$height = $bmp.Height

$outputBmp = New-Object System.Drawing.Bitmap($width, $height, [System.Drawing.Imaging.PixelFormat]::Format32bppArgb)

for ($y = 0; $y -lt $height; $y++) {
    for ($x = 0; $x -lt $width; $x++) {
        $pixel = $bmp.GetPixel($x, $y)
        $r = [int]$pixel.R
        $g = [int]$pixel.G
        $b = [int]$pixel.B
        
        # Check if pixel is white or near white background
        if ($r -gt 245 -and $g -gt 245 -and $b -gt 245) {
            $outputBmp.SetPixel($x, $y, [System.Drawing.Color]::FromArgb(0, 0, 0, 0))
        } elseif ($r -gt 215 -and $g -gt 215 -and $b -gt 215) {
            $avg = ($r + $g + $b) / 3.0
            $alpha = [int]([Math]::Max(0, [Math]::Min(255, (255.0 - $avg) * 6.0)))
            $outputBmp.SetPixel($x, $y, [System.Drawing.Color]::FromArgb($alpha, $r, $g, $b))
        } else {
            $outputBmp.SetPixel($x, $y, $pixel)
        }
    }
}

$bmp.Dispose()
$outputBmp.Save($destTransparent, [System.Drawing.Imaging.ImageFormat]::Png)
$outputBmp.Dispose()

Write-Host "WM Logo processed successfully to: $destTransparent"
