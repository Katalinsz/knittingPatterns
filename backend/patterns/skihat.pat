{
  "type": "hat",
  "defaults": {
    "slider-tension": { "min": 8, "max": 40, "x": 24, "y": 34 },
    "slider-size": { "name": "Hat size flat", "min": 10, "max": 34, default: 56, "measurement": "cm"},
    "bounds-max-cm": {"width": 26, "height": 17}
    "head-circumference-cm": 56,
    "hat-height-cm": 28,
    "ribbing-height-cm": 3,
    "cast-on": 67,
    "hat-top-height": 8
  }
  "dependencies": {
    "before-motif-stitches": 2,
    "before-motif-rows": 2,
    "motif-height-rows": 27,
    "after-motif-row": 3,
    "decrease-steps-line": {decrease-steps-line(<current-stitches>, '1-4', {hat-top-height}, tension)}
  },
  "content": "###SIZE###\nSki Hat Dimensions:\n• Head circumference: {head-circumference-cm} cm\n• Hat height: {hat-height-cm} cm\n• Ribbing height: {ribbing-height-cm} cm\n• Gauge: {slider-tension.x} stitches × {slider-tension.y} rows = 10 × 10 cm in stockinette stitch\n• Motif size: {motif-width-stitches} stitches × {motif-height-rows} rows\n• Motif position: centered horizontally ({before-motif-stitches} stitches before motif)\n\n###MATERIALS###\n🧵 Skill Level:\nBeginner / Intermediate – Basic knowledge of knittiing with 2 colors is required.\n\nAlways check your gauge before starting.\n\n###INSTRUCTIONS###\nRibbing:\nCast on {cast-on} stitches.\nKnit {ribbing-height-cm} rows of 1×1 rib stitch (k1, p1) using your smaller needles.\n\nMain body:\nChange to larger needles.\nKnit {before-motif-rows} rows in stockinette stitch.\n\nMotif placement:\nKnit {before-motif-stitches} stitches. Place a stitch marker to mark the beginning of the motif.\nStart knitting according to the chart below for {motif-height-rows} rows.\nAfter completing the motif, knit a further {rows-after-motif} rows in stockinette stitch.\n\nCrown decreases:\n{decrease-steps-line, <current-stitches>, '1-4', {hat-top-height}, tension}. Finishing:\nSew together the back seam (if working flat). Weave in all ends.\n\n###NOTES###\nEnjoy your handmade ski hat — cosy, stylish and just for you. 🧶❤️\nHappy Knitting!\n\n• Total cast-on stitches: {cast-on}\n• Ribbing height: {ribbing-height-cm}\n• Stockinette rows before motif: {before-motif-rows}\n• Stockinette rows after motif: {after-motif-rows}\n• Crown decrease rows: {??}\n• Total rows: {total-rows}"
}
