#!/usr/bin/env bash
set -e
cd "$(dirname "$0")/.."

# Deploy main → gh-pages (the branch GitHub Pages actually serves)
#
# Usage: bash scripts/deploy.sh
#
# Safe by design:
#   - Builds to a TEMP dir (does NOT touch ./docs on main)
#   - Refuses to run on a dirty working tree
#   - Always returns you to your starting branch, even on failure
#   - Only updates `assets/` and `index.html` on gh-pages
#   - Pushes only the gh-pages branch — main is never modified

# 0. Pre-flight: working tree must be clean (untracked files allowed)
if [[ -n "$(git status --porcelain | grep -v '^??')" ]]; then
  echo "✗ Working tree has uncommitted tracked changes. Commit or stash first."
  git status --short
  exit 1
fi

ORIG_BRANCH=$(git rev-parse --abbrev-ref HEAD)
echo "→ Starting branch: $ORIG_BRANCH (we will return here)"

# Trap to restore branch on any failure
cleanup_branch() {
  CURRENT=$(git rev-parse --abbrev-ref HEAD 2>/dev/null || echo "")
  if [[ "$CURRENT" != "$ORIG_BRANCH" ]] && [[ -n "$ORIG_BRANCH" ]]; then
    echo "→ Restoring branch to $ORIG_BRANCH..."
    git checkout "$ORIG_BRANCH" >/dev/null 2>&1 || true
  fi
}
trap cleanup_branch EXIT

# 1. Build to a temp dir — main's working tree stays untouched
TMP=$(mktemp -d)
echo "→ Building to $TMP/build (main's docs/ is NOT touched)..."
npx vite build --outDir "$TMP/build" --emptyOutDir

if [[ ! -f "$TMP/build/index.html" ]] || [[ -z "$(ls "$TMP/build/assets/"*.js 2>/dev/null)" ]]; then
  echo "✗ Build did not produce expected output."
  rm -rf "$TMP"
  exit 1
fi

# 2. Switch to gh-pages
echo "→ Fetching gh-pages..."
git fetch origin gh-pages
echo "→ Switching to gh-pages..."
git checkout gh-pages
git pull --ff-only origin gh-pages 2>/dev/null || true

# 3. Replace deployed files
echo "→ Replacing assets/ and index.html..."
rm -rf assets
mkdir -p assets
cp -r "$TMP/build/assets/"* assets/
cp "$TMP/build/index.html" index.html
# CNAME / favicons already on gh-pages — leave them as-is.

# 4. Commit + push (gh-pages only)
git add index.html assets/
if git diff --cached --quiet; then
  echo "→ No changes to deploy (gh-pages already up to date)."
else
  COMMIT_FROM=$(git rev-parse --short "$ORIG_BRANCH")
  git commit -m "deploy: rebuild bundle (from $ORIG_BRANCH @ $COMMIT_FROM)"
  echo "→ Pushing origin/gh-pages..."
  git push origin gh-pages
  echo "✓ Deployed gh-pages."
fi

# 5. Cleanup (the EXIT trap will restore your branch)
rm -rf "$TMP"
echo "✓ Done. GitHub Pages redeploys in ~30-60s. Your $ORIG_BRANCH branch is unchanged."
