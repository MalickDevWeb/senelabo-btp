import json

with open("senelabo_parsed.json", "r", encoding="utf-8") as f:
    data = json.load(f)

for page, content in data.items():
    print(f"\n==================== PAGE: {page} ====================")
    for i, line in enumerate(content["lines"]):
        print(f"[{i+1}] {line}")
