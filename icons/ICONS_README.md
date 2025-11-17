# Extension Icons

This extension requires icon files in PNG format at the following sizes:
- icon16.png (16x16)
- icon32.png (32x32)
- icon48.png (48x48)
- icon128.png (128x128)

## How to Create Icons

### Option 1: Use the SVG file
Convert the `icon.svg` file in this directory to PNG using:

**Online Tools:**
- https://cloudconvert.com/svg-to-png
- https://convertio.co/svg-png/
- https://svgtopng.com/

**Command Line (if you have ImageMagick):**
```bash
convert icon.svg -resize 16x16 icon16.png
convert icon.svg -resize 32x32 icon32.png
convert icon.svg -resize 48x48 icon48.png
convert icon.svg -resize 128x128 icon128.png
```

**Command Line (if you have rsvg-convert):**
```bash
rsvg-convert -w 16 -h 16 icon.svg > icon16.png
rsvg-convert -w 32 -h 32 icon.svg > icon32.png
rsvg-convert -w 48 -h 48 icon.svg > icon48.png
rsvg-convert -w 128 -h 128 icon.svg > icon128.png
```

### Option 2: Use Python script
If you have Python with PIL/Pillow installed:
```bash
pip install pillow
python3 ../create_placeholder_icons.py
```

### Option 3: Create your own
Design your own icons using any image editor (Photoshop, GIMP, Figma, etc.) and export them as PNG files with the required dimensions.

## Temporary Workaround

While testing the extension without proper icons, Chrome will display a default icon, but you'll see warnings. The extension will still function correctly.
