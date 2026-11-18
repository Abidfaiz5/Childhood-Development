#!/usr/bin/env python3
"""Build index.html for the ECD Consultancy Brain dashboard.

Takes the Google Stitch export (code.html) and transforms it into the
real project shell:
  - header name without placeholder brackets
  - invented 68.4% capacity figure replaced with the real derived
    break-even utilisation (75%, Standard model)
  - inline <style> moved out to css/style.css
  - inline fake-chat <script> replaced with <script src="js/app.js">
  - chat content wrapped in <section id="view-chat">
  - empty module sections added for Market / Competitors / Feasibility /
    Location / Services / Reports (rendered by js/app.js)
"""
import os

BASE = os.path.dirname(os.path.abspath(__file__))
SRC = os.path.expanduser("~/workspace/user/files/code.html")
OUT = os.path.join(BASE, "index.html")
CSS_OUT = os.path.join(BASE, "css", "style.css")

with open(SRC, encoding="utf-8") as f:
    html = f.read()

# --- 1. Header: drop placeholder brackets (agent name still TBD by Bilal) ---
html = html.replace("[Childhood Development Centre]", "Childhood Development Centre")

# --- 2. Capacity card: replace invented 68.4% with real derived figure ---
html = html.replace(
    '<span class="font-headline-sm text-headline-sm text-on-surface">68.4%</span>',
    '<span class="font-headline-sm text-headline-sm text-on-surface">75%</span>',
)
html = html.replace(
    '<span class="font-caption text-caption text-primary font-medium">Target Utilization</span>',
    '<span class="font-caption text-caption text-primary font-medium">Break-even utilization</span>',
)
html = html.replace(
    '<span class="font-caption text-caption text-secondary">Modeled across 4 clinical treatment suites</span>',
    '<span class="font-caption text-caption text-secondary">Standard model &middot; 3 therapists, 24 days, 60% occupancy</span>',
)

# --- 3. Move the inline <style> block to css/style.css ---
style_start = html.find("<style>")
style_end = html.find("</style>", style_start) + len("</style>")
style_block = html[style_start:style_end]
# inner CSS between <style> and </style>
css_inner = style_block[len("<style>"):-len("</style>")]
os.makedirs(os.path.join(BASE, "css"), exist_ok=True)
with open(CSS_OUT, "w", encoding="utf-8") as f:
    f.write(css_inner.strip() + "\n")
html = html[:style_start] + '<link rel="stylesheet" href="css/style.css"/>' + html[style_end:]

# --- 4. Replace the inline fake-chat <script> with js/app.js ---
script_start = html.find("<script>\n  function injectPrompt")
script_end = html.find("</script>", script_start) + len("</script>")
assert script_start != -1 and script_end != -1, "body script block not found"
html = html[:script_start] + '<script src="js/app.js"></script>' + html[script_end:]

# --- 5. Wrap chat content in <section id="view-chat"> and add module sections ---
lines = html.split("\n")
# max-w-7xl opening div is the line containing 'max-w-7xl mx-auto'
open_idx = next(i for i, ln in enumerate(lines) if "max-w-7xl mx-auto" in ln)
# max-w-7xl closing </div> is the 4th </div> after the 'Local currency' line
lc_idx = next(i for i, ln in enumerate(lines) if "Local currency" in ln)
close_count = 0
close_idx = None
for i in range(lc_idx + 1, len(lines)):
    if lines[i].strip() == "</div>":
        close_count += 1
        if close_count == 4:
            close_idx = i
            break
assert close_idx is not None, "max-w-7xl closing div not found"

MODULE_SECTIONS = """</section>
<section id="view-market" class="hidden"><div id="marketView"></div></section>
<section id="view-competitors" class="hidden"><div id="competitorsView"></div></section>
<section id="view-feasibility" class="hidden"><div id="feasibilityView"></div></section>
<section id="view-location" class="hidden"><div id="locationView"></div></section>
<section id="view-services" class="hidden"><div id="servicesView"></div></section>
<section id="view-reports" class="hidden"><div id="reportsView"></div></section>"""

# insert module sections + close view-chat BEFORE the max-w-7xl closing div
lines[close_idx:close_idx] = MODULE_SECTIONS.split("\n")
# insert <section id="view-chat"> right after the max-w-7xl opening div
lines[open_idx + 1:open_idx + 1] = ['<section id="view-chat">']

html = "\n".join(lines)

with open(OUT, "w", encoding="utf-8") as f:
    f.write(html)

print("index.html written:", len(html), "bytes")
print("css/style.css written")
print("sections present:", all(s in html for s in
      ["view-chat", "view-market", "view-competitors", "view-feasibility",
       "view-location", "view-services", "view-reports"]))
print("app.js linked:", 'src="js/app.js"' in html)
print("no fake chat left:", "injectPrompt" not in html and "Simulate instant" not in html)
print("no 68.4 left:", "68.4%" not in html)
print("no brackets left:", "[Childhood Development Centre]" not in html)
