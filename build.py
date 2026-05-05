import os

major = 1
minor = 2
patch = 0

version = f"{major}.{minor}.{patch}"

src_path = "src/index.html"
dist_dir = f"dist/{version}"
dist_path = f"{dist_dir}/index.html"

os.makedirs(dist_dir, exist_ok=True)

with open(src_path, "r", encoding="utf-8") as f:
    html = f.read()

# Read CSS and JS
with open("src/style.css", "r", encoding="utf-8") as f:
    css = f.read()

with open("src/index.js", "r", encoding="utf-8") as f:
    js = f.read()

html = html.replace(
    '<link rel="stylesheet" href="style.css" />',
    f"<style>\n{css}\n</style>"
)

html = html.replace(
    '<script src="index.js" type="module"></script>',
    f"<script type=\"module\">\n{js}\n</script>"
)

with open(dist_path, "w", encoding="utf-8") as f:
    f.write(html)

print(f"Built: {dist_path}")