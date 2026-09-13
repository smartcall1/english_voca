import os, glob
from PIL import Image, ImageEnhance, ImageOps

brain_dir = r"C:\Users\p123_\.gemini\antigravity-cli\brain\732c423a-edf5-4141-a4c3-d0368bb15b18"
panels_dir = r"D:\Codes\english_voca\scratch\panels"
assets_dir = r"D:\Codes\english_voca\assets"
os.makedirs(assets_dir, exist_ok=True)

# 1. First 12 days use direct AI generated full 4-panel images
direct_images = {
    1: "comic_01_test_1789255004170.jpg",
    2: "comic_02_test_1789255155209.jpg",
    3: "comic_03_1789255569936.jpg",
    4: "comic_04_1789255581646.jpg",
    5: "comic_05_1789255591390.jpg",
    6: "comic_06_1789255602976.jpg",
    7: "comic_07_1789255615728.jpg",
    8: "comic_08_1789255691238.jpg",
    9: "comic_09_1789255703162.jpg",
    10: "comic_10_1789255715005.jpg",
    11: "comic_11_1789255725617.jpg",
    12: "comic_12_1789255738933.jpg",
}

for day, fname in direct_images.items():
    src = os.path.join(brain_dir, fname)
    im = Image.open(src).convert("RGB")
    dest = os.path.join(assets_dir, f"comic-{day:02d}.png")
    im.save(dest, "PNG")
    print(f"Saved direct Day {day:02d} -> comic-{day:02d}.png")

# 2. Collect all 52 panel files
panel_files = sorted(glob.glob(os.path.join(panels_dir, "*.png")))
print(f"Loaded {len(panel_files)} panel pieces.")

# Filter and categorize panels by atmosphere
# School / Study: c01, c02, c04, c05
# Playground / Park / Outdoor: c03_ex, c06, c07, c08, c09, c10
# Home / Kitchen / Dining: c03, c11, c12

def get_panels_for_day(d):
    region = (d - 1) // 10
    # Create deterministic variety for days 13 to 50
    # Pick 4 distinct panels for the 4 cuts
    # Rotate offset based on day
    offset = (d * 7) % len(panel_files)
    idx0 = (offset) % len(panel_files)
    idx1 = (offset + 13) % len(panel_files)
    idx2 = (offset + 27) % len(panel_files)
    idx3 = (offset + 39) % len(panel_files)
    return [panel_files[idx0], panel_files[idx1], panel_files[idx2], panel_files[idx3]]

def apply_region_theme(img, region):
    # img is PIL RGB Image
    # 0: Forest, 1: Village, 2: Harbor, 3: Jungle/Island, 4: Mountain
    if region == 1: # Warm Village: warm cozy amber/honey tint
        r, g, b = img.split()
        r = r.point(lambda i: min(255, int(i * 1.05)))
        b = b.point(lambda i: int(i * 0.94))
        img = Image.merge("RGB", (r, g, b))
        img = ImageEnhance.Color(img).enhance(1.08)
    elif region == 2: # Rainbow Harbor: bright vibrant sky/aqua contrast
        r, g, b = img.split()
        b = b.point(lambda i: min(255, int(i * 1.06)))
        g = g.point(lambda i: min(255, int(i * 1.02)))
        img = Image.merge("RGB", (r, g, b))
        img = ImageEnhance.Color(img).enhance(1.15)
        img = ImageEnhance.Contrast(img).enhance(1.06)
    elif region == 3: # Jungle Exploration: rich emerald green lushness
        r, g, b = img.split()
        g = g.point(lambda i: min(255, int(i * 1.07)))
        r = r.point(lambda i: int(i * 0.96))
        img = Image.merge("RGB", (r, g, b))
        img = ImageEnhance.Color(img).enhance(1.12)
    elif region == 4: # Mountain of Imagination: mystical twilight / starlight glow
        r, g, b = img.split()
        r = r.point(lambda i: min(255, int(i * 1.03)))
        b = b.point(lambda i: min(255, int(i * 1.08)))
        g = g.point(lambda i: int(i * 0.97))
        img = Image.merge("RGB", (r, g, b))
        img = ImageEnhance.Contrast(img).enhance(1.08)
        img = ImageEnhance.Color(img).enhance(1.18)
    return img

for day in range(13, 51):
    cuts = get_panels_for_day(day)
    region = (day - 1) // 10
    
    # Create blank 1024x1024 canvas with thin cream gutter
    canvas = Image.new("RGB", (1024, 1024), (252, 250, 245))
    
    # 4 panels: (0,0), (514, 0), (0, 514), (514, 514) - leaving 4px gutter
    positions = [
        (0, 0),
        (514, 0),
        (0, 514),
        (514, 514)
    ]
    
    for i, cut_file in enumerate(cuts):
        p_img = Image.open(cut_file).convert("RGB")
        p_img = p_img.resize((510, 510), Image.Resampling.LANCZOS)
        p_img = apply_region_theme(p_img, region)
        canvas.paste(p_img, positions[i])
        
    dest = os.path.join(assets_dir, f"comic-{day:02d}.png")
    canvas.save(dest, "PNG")
    print(f"Assembled Day {day:02d} -> comic-{day:02d}.png (Region {region})")

print("All 50 comic PNG assets built successfully!")
