#!/usr/bin/env python3
"""
Create placeholder icons for the Chrome extension.
This creates simple gradient icons with a play symbol.
"""

try:
    from PIL import Image, ImageDraw
except ImportError:
    print("PIL/Pillow not found. Install with: pip install pillow")
    print("\nAlternatively, manually create PNG icons in the icons/ folder:")
    print("  - icon16.png (16x16)")
    print("  - icon32.png (32x32)")
    print("  - icon48.png (48x48)")
    print("  - icon128.png (128x128)")
    exit(1)

import os

SIZES = [16, 32, 48, 128]

def create_icon(size):
    """Create a simple icon with a play button"""
    # Create image with gradient background
    img = Image.new('RGB', (size, size), color='white')
    draw = ImageDraw.Draw(img)

    # Draw gradient-like background (purple)
    for i in range(size):
        color_val = int(102 + (118 - 102) * (i / size))
        draw.rectangle([(0, i), (size, i+1)], fill=(color_val, 78, 170))

    # Draw play triangle (white)
    triangle_size = size // 2
    offset = size // 4

    triangle = [
        (offset, offset),
        (offset, offset + triangle_size),
        (offset + triangle_size, offset + triangle_size // 2)
    ]

    draw.polygon(triangle, fill='white')

    return img

def main():
    script_dir = os.path.dirname(os.path.abspath(__file__))
    icons_dir = os.path.join(script_dir, 'icons')

    # Create icons directory if it doesn't exist
    os.makedirs(icons_dir, exist_ok=True)

    print("Creating placeholder icons...")

    for size in SIZES:
        icon = create_icon(size)
        output_path = os.path.join(icons_dir, f'icon{size}.png')
        icon.save(output_path, 'PNG')
        print(f"  Created {output_path} ({size}x{size})")

    print("\nPlaceholder icons created successfully!")
    print("You can replace these with custom designs later.")

if __name__ == '__main__':
    main()
