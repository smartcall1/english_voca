import os, glob
from PIL import Image

brain_dir = r"C:\Users\p123_\.gemini\antigravity-cli\brain\732c423a-edf5-4141-a4c3-d0368bb15b18"
panels_dir = r"D:\Codes\english_voca\scratch\panels"
os.makedirs(panels_dir, exist_ok=True)

# Sources list in order
sources = [
    ("c01", "comic_01_test_1789255004170.jpg"),
    ("c02", "comic_02_test_1789255155209.jpg"),
    ("c03_ex", "comic_03_test_1789255165778.jpg"),
    ("c03", "comic_03_1789255569936.jpg"),
    ("c04", "comic_04_1789255581646.jpg"),
    ("c05", "comic_05_1789255591390.jpg"),
    ("c06", "comic_06_1789255602976.jpg"),
    ("c07", "comic_07_1789255615728.jpg"),
    ("c08", "comic_08_1789255691238.jpg"),
    ("c09", "comic_09_1789255703162.jpg"),
    ("c10", "comic_10_1789255715005.jpg"),
    ("c11", "comic_11_1789255725617.jpg"),
    ("c12", "comic_12_1789255738933.jpg"),
]

total_panels = 0
for prefix, fname in sources:
    fpath = os.path.join(brain_dir, fname)
    if not os.path.exists(fpath):
        print(f"Missing {fname}")
        continue
    im = Image.open(fpath).convert("RGB")
    w, h = im.size
    half_w, half_h = w // 2, h // 2
    
    # 4 cuts: top-left, top-right, bottom-left, bottom-right
    cuts = [
        ("tl", (0, 0, half_w, half_h)),
        ("tr", (half_w, 0, w, half_h)),
        ("bl", (0, half_h, half_w, h)),
        ("br", (half_w, half_h, w, h)),
    ]
    for idx, (cname, box) in enumerate(cuts):
        cut_im = im.crop(box)
        cut_path = os.path.join(panels_dir, f"panel_{prefix}_{idx}_{cname}.png")
        cut_im.save(cut_path, "PNG")
        total_panels += 1

print(f"Successfully extracted {total_panels} high-res boy-protagonist panels!")
