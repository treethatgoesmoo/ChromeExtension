#!/usr/bin/env python3
"""
Icon Generator for Universal Media Controller Chrome Extension

This script generates PNG icons from the SVG source file.
Requires: pip install cairosvg pillow

If you don't have the dependencies, you can use online SVG to PNG converters
or image editing software to manually convert icons/icon.svg to the required sizes:
- icon16.png (16x16)
- icon32.png (32x32)
- icon48.png (48x48)
- icon128.png (128x128)
"""

import os
import sys

try:
    import cairosvg
    from PIL import Image
    import io
except ImportError:
    print("ERROR: Required dependencies not found!")
    print("\nPlease install dependencies:")
    print("  pip install cairosvg pillow")
    print("\nOr manually convert icons/icon.svg to PNG files:")
    print("  - icon16.png (16x16)")
    print("  - icon32.png (32x32)")
    print("  - icon48.png (48x48)")
    print("  - icon128.png (128x128)")
    sys.exit(1)

# Icon sizes needed for Chrome extension
SIZES = [16, 32, 48, 128]

def generate_icons():
    """Generate PNG icons from SVG source"""
    script_dir = os.path.dirname(os.path.abspath(__file__))
    icons_dir = os.path.join(script_dir, 'icons')
    svg_path = os.path.join(icons_dir, 'icon.svg')

    if not os.path.exists(svg_path):
        print(f"ERROR: SVG file not found at {svg_path}")
        sys.exit(1)

    print(f"Generating icons from {svg_path}...")

    for size in SIZES:
        output_path = os.path.join(icons_dir, f'icon{size}.png')

        # Convert SVG to PNG
        png_data = cairosvg.svg2png(
            url=svg_path,
            output_width=size,
            output_height=size
        )

        # Save PNG
        with open(output_path, 'wb') as f:
            f.write(png_data)

        print(f"  Created {output_path} ({size}x{size})")

    print("\nIcons generated successfully!")

if __name__ == '__main__':
    generate_icons()
