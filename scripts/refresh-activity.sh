#!/usr/bin/env bash
# Refreshes the activity page with the work sources that GitHub Actions cannot reach (the
# IGT repositories and the IGT GitLab behind the VPN) and pushes the data. Runs weekly on
# the home server from a systemd user timer (scripts/systemd/, see the README).
set -euo pipefail
cd "$(dirname "$0")/.."

data=src/content/activity.json

# Push nothing but the refreshed data: skip when main has local commits or edits to it.
[ "$(git branch --show-current)" = main ] || { echo "Not on main, skipped."; exit 0; }
git fetch --quiet origin main
[ -z "$(git rev-list origin/main..main)" ] || { echo "main has unpushed commits, skipped."; exit 0; }
git diff --quiet HEAD -- "$data" || { echo "$data has local changes, skipped."; exit 0; }
git pull --quiet --ff-only --autostash

# The collector reads every branch of the work clones, so bring their remote branches up to date.
for repo in ../IGT-systems/*/*/; do
  [ -d "$repo.git" ] || continue
  git -C "$repo" fetch --quiet --all --prune || echo "Fetch failed: $repo"
done

pnpm activity

git diff --quiet -- "$data" && { echo "No new activity."; exit 0; }
git commit --quiet -m "Refresh activity data with work sources" -- "$data"
git push --quiet origin main
echo "Pushed refreshed activity data."
