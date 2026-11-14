import re

for filename in ['web/dashboard.html', 'web/index.html']:
    text = open(filename, encoding='utf-8').read()
    
    # 1. Check all on* attributes
    on_handlers = re.findall(r'on[a-z]+=["\']([^"\']+)["\']', text)
    print(f'=== {filename} ===')
    print('Total inline handlers:', len(on_handlers))
    
    missing = set()
    for h in on_handlers:
        calls = re.findall(r'([a-zA-Z0-9_]+)\(', h)
        for fn in calls:
            # check if defined
            if not re.search(r'(function\s+' + fn + r'\b|' + fn + r'\s*=\s*(function|\([^)]*\)\s*=>))', text):
                missing.add(fn)
    print('Missing functions from on* handlers:', sorted(missing))

    # 2. Check all getElementById calls in script
    ids_referenced = set(re.findall(r'getElementById\(["\']([^"\']+)["\']\)', text))
    html_ids = set(re.findall(r'id=["\']([^"\']+)["\']', text))
    missing_ids = ids_referenced - html_ids
    print('Referenced IDs missing from DOM:', sorted(missing_ids))
