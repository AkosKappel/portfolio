#!/usr/bin/env bash
# Builds both CVs from LaTeX, copies the PDFs to public/ and renders the page images
# that the CV viewer shows on phones and tablets.
set -euo pipefail
cd "$(dirname "$0")/.."

(cd latex && latexmk -pdf -interaction=nonstopmode -quiet main-english.tex main-slovak.tex)

tmp=$(mktemp -d)
trap 'rm -rf "$tmp"' EXIT
mkdir -p public/images/cv

for pair in english:en slovak:sk; do
  name=${pair%%:*}
  code=${pair##*:}
  cp "latex/main-$name.pdf" "public/CV_Akos_Kappel_(${code^^}).pdf"
  rm -f public/images/cv/cv-"$code"-*.webp
  # 150 dpi: an A4 page is 1241 px wide, enough for a phone screen at 3x.
  pdftoppm -r 150 -png "latex/main-$name.pdf" "$tmp/cv-$code"
  for png in "$tmp/cv-$code"-*.png; do
    page=$(basename "$png" .png | sed 's/.*-0*//')
    magick "$png" -quality 85 "public/images/cv/cv-$code-$page.webp"
  done
done

ls -l public/CV_Akos_Kappel_*.pdf public/images/cv
