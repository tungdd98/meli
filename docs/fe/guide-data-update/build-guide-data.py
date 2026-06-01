"""Transform scraped mali.me xlsx into typed GuideWeek[] blocks for -data.ts.
Source: apps/web/src/assets/mali-me-2026-06-01-2.xlsx (cols: data, data2, text_0).
text_0 is the article body without breadcrumb noise (cleaner than the first scrape).
Run: uv run --with openpyxl python3 docs/fe/guide-data-update/build-guide-data.py
"""
import openpyxl, re, json, sys

XLSX = "docs/fe/guide-data-update/source/mali-me-2026-06-01-2.xlsx"
TEXT_COL = "text_0"

def nws(s):
    return re.sub(r'[ \t\xa0]+', ' ', s or '').strip()

# In text_0 a '\n' marks the end of EVERY heading (and emphasis sub-label).
# Section headings are a near-closed vocabulary (3 families + disclaimer); we
# split only on those, optionally preceded by an emoji and/or a trailing colon.
# ':'-only sub-labels (e.g. "Đau quặn bụng:") are kept inline in the paragraph.
EMOJI = r'[\U0001F000-\U0001FAFF☀-➿️]*'
HEAD_ALT = (
    r'Sự phát triển của con của mẹ'
    r'|(?:Những |Sự )?[Tt]hay đổi của mẹ'
    r'|(?:Những (?:việc|điều) mẹ (?:có thể|nên) làm|Mẹ nên làm gì'
    r'|Nên làm gì|Làm gì)(?: (?:lúc này|vào thời điểm này|trong thời gian này))?'
    r'|Xin vui lòng xác nhận|Vui lòng xin xác nhận'
)
SECTION = re.compile(r'\s*' + EMOJI + r'\s*(' + HEAD_ALT + r')\s*:?\s*$')

def strip_intro(chunk, intro):
    # Remove the leading intro (= data2, already shown as the italic block) from
    # the first paragraph via a word-level longest-common-prefix.
    cw = nws(chunk).split(' '); iw = intro.split(' '); i = 0
    while i < len(iw) and i < len(cw) and cw[i].strip('.,') == iw[i].strip('.,'):
        i += 1
    rest = ' '.join(cw[i:]).lstrip(' .,').rstrip()
    # data2 is a hand-edited teaser that can differ from the body, leaving a
    # mid-sentence tail; if so, advance to the next clean sentence boundary.
    if rest and rest[0].islower():
        m = re.search(r'[\.\?\!…]\s+', rest)
        rest = rest[m.end():].lstrip() if m else ''
    return rest

def parse(r, idx):
    title = (r[idx['data']] or '').strip()
    intro = nws(r[idx['data2']])
    raw = r[idx[TEXT_COL]] or ''
    issues = []
    if not (('Đã chứng nhận' in raw) or ('Nguồn:' in raw)):
        issues.append('no-footer')
    # 1. strip footer (text_0 already has no breadcrumb prefix to strip)
    t = raw
    for m in ['Đã chứng nhận', 'Nguồn:']:
        p = t.find(m)
        if p != -1: t = t[:p]
    # 2. drop inline images; '\n' must survive as the heading delimiter
    t = t.replace('\xa0', ' ')
    t = re.sub(r'<img[^>]*>', '', t)
    # source glues sentences (".Capital"); add a space before an uppercase letter
    # that directly follows sentence punctuation (skips decimals like 1.5)
    t = re.sub(r'([\.\?\!…])([A-ZÀ-ỸĐ])', r'\1 \2', t)

    blocks = [{'type': 'italic', 'text': intro}]
    buf = ''; first_para = True

    def flush():
        nonlocal buf, first_para
        para = nws(buf)
        if first_para:
            para = strip_intro(para, intro); first_para = False
        if para:
            blocks.append({'type': 'paragraph', 'text': para})
        buf = ''

    segs = t.split('\n')
    for i, seg in enumerate(segs):
        seg = nws(seg)
        m = None if i == len(segs) - 1 else SECTION.search(seg)
        if m:
            head = m.group(1).strip().rstrip(':').strip()
            buf = (buf + ' ' + seg[:m.start()]).strip()
            if 'xác nhận' in head.lower():
                flush(); break          # disclaimer -> stop here
            flush()
            blocks.append({'type': 'heading', 'text': head})
        else:
            buf = (buf + ' ' + seg).strip()
    else:
        flush()

    # safety: no breadcrumb / footer / disclaimer leaked
    joined = ' '.join(b['text'] for b in blocks)
    if 'Hướng dẫn' in joined and 'hàng tuần' in joined:
        issues.append('breadcrumb-noise')
    if 'Đã chứng nhận' in joined or 'Nguồn:' in joined:
        issues.append('footer-leak')
    return {'week': None, 'title': title, 'blocks': blocks, 'issues': issues}

def main():
    wb = openpyxl.load_workbook(XLSX, read_only=True, data_only=True)
    ws = wb.worksheets[0]; rows = list(ws.iter_rows(values_only=True))
    idx = {k: i for i, k in enumerate(rows[0])}
    weeks = []
    for i, r in enumerate(rows[1:]):
        w = parse(r, idx); w['week'] = i + 1; weeks.append(w)
    return weeks

if __name__ == '__main__':
    weeks = main()
    allissues = {w['week']: w['issues'] for w in weeks if w['issues']}
    hc = [sum(1 for b in w['blocks'] if b['type'] == 'heading') for w in weeks]
    pc = [sum(1 for b in w['blocks'] if b['type'] == 'paragraph') for w in weeks]
    print("weeks:", len(weeks), "| issues:", allissues or "NONE")
    print("headings/wk min,max:", min(hc), max(hc), "| paras/wk min,max:", min(pc), max(pc))
    print("heading-count distribution:", {n: hc.count(n) for n in sorted(set(hc))})
    if '--samples' in sys.argv:
        for wk in (1, 19, 27, 41):
            w = weeks[wk-1]
            print(f"\n==== WEEK {wk}: {w['title']} ====")
            for b in w['blocks']:
                tx = b['text'] if len(b['text']) <= 120 else b['text'][:120]+'…'
                print(f"  [{b['type']:<9}] {tx}")
    if '--emit-ts' in sys.argv:
        def q(s):
            return "'" + s.replace('\\', '\\\\').replace("'", "\\'") + "'"
        lines = ['const weeklyPregnancyWeeks: GuideWeek[] = [']
        for w in weeks:
            lines.append('  {')
            lines.append(f"    week: {w['week']},")
            lines.append(f"    title: {q(w['title'])},")
            lines.append('    subtitle: WEEKLY_PREGNANCY_SUBTITLE,')
            lines.append('    body: [')
            for b in w['blocks']:
                lines.append(f"      {{ type: '{b['type']}', text: {q(b['text'])} }},")
            lines.append('    ],')
            lines.append('  },')
        lines.append('];')
        with open('docs/fe/guide-data-update/weeks.generated.ts', 'w') as f:
            f.write('\n'.join(lines) + '\n')
        print('\nwrote docs/fe/guide-data-update/weeks.generated.ts')
