import os, glob, re
from PIL import Image

brain_dir = r"C:\Users\p123_\.gemini\antigravity-cli\brain\732c423a-edf5-4141-a4c3-d0368bb15b18"
assets_dir = r"D:\Codes\english_voca\assets"

def convert_image(src_path, dest_filename):
    im = Image.open(src_path)
    im = im.convert("RGB")
    dest_path = os.path.join(assets_dir, dest_filename)
    im.save(dest_path, "PNG")
    print(f"Saved {dest_filename} ({im.size})")

# Find images matching comic_XX
for d in range(1, 51):
    d_str = f"{d:02d}"
    # check for pattern comic_DD_*.jpg or comic_DD_test_*.jpg
    pattern = os.path.join(brain_dir, f"comic_{d_str}_*.jpg")
    matches = glob.glob(pattern)
    if not matches:
        pattern = os.path.join(brain_dir, f"comic_{d_str}_test_*.jpg")
        matches = glob.glob(pattern)
    if matches:
        # take the most recent one
        latest = max(matches, key=os.path.getmtime)
        dest_name = f"comic-{d_str}.png"
        convert_image(latest, dest_name)

print("Check finished.")
