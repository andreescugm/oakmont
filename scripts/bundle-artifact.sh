#!/usr/bin/env bash
set -e
cd "$(dirname "$0")/.."

echo "→ Building..."
npx vite build 2>/dev/null

DIST=dist
CSS_FILE=$(ls $DIST/assets/*.css | head -1)
JS_FILE=$(ls $DIST/assets/*.js | head -1)

python3 - "$DIST/index.html" "$CSS_FILE" "$JS_FILE" << 'PYEOF'
import sys, re

html_path, css_path, js_path = sys.argv[1], sys.argv[2], sys.argv[3]

with open(html_path) as f:  html = f.read()
with open(css_path)  as f:  css  = f.read()
with open(js_path)   as f:  js   = f.read()

# Use lambda to avoid re.sub interpreting backslashes in replacement string
html = re.sub(
    r'<link rel="stylesheet"[^>]*/?>',
    lambda _: f'<style>{css}</style>',
    html
)
html = re.sub(
    r'<script type="module" crossorigin src="[^"]*"></script>',
    lambda _: f'<script type="module">{js}</script>',
    html
)

with open('artifact.html', 'w') as f:
    f.write(html)
PYEOF

SIZE=$(du -sh artifact.html | cut -f1)
echo "✓ artifact.html listo — $SIZE"
