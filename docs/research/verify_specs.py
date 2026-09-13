"""Read-only validation of Briefing C specifications; no runtime feature claims."""
import argparse
import hashlib
import json
from pathlib import Path
import re
import shutil
import subprocess
import tempfile


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument('--document', choices=['03', '04', '05', '06'])
    args = parser.parse_args()
    base = Path(__file__).resolve().parent
    names = ['03-lovable-landing-brief.md', '04-members-and-admin-spec.md', '05-askbot-and-mcp-spec.md', '06-build-plan.md']
    docs = {name[:2]: (base / name).read_text() for name in names}
    for key, body in docs.items():
        if args.document and key != args.document:
            continue
        assert len(body) > 5000, key
        assert len(re.findall(r'^```', body, re.M)) % 2 == 0, (key, 'fences')
        assert 'UNVERIFIED' in body, key
        assert 'verify_specs.py' in body, key
        assert not re.search(r'\bTBD\b', body), key
        for destination in re.findall(r'\]\(([^\s)]+)\)', body):
            if destination.startswith(('https://', 'http://', '#')):
                continue
            assert (base / destination.split('#')[0]).exists(), (key, destination)
        for payload in re.findall(r'```json\n(.*?)\n```', body, re.S):
            json.loads(payload)
    prompt = re.search(r'<!-- LOVABLE_PROMPT_START -->\s*```text\n(.*?)\n```', docs['03'], re.S).group(1)
    word_count = len(prompt.split())
    assert word_count <= 400, word_count
    assert all(f'### S{i:02d}' in docs['03'] for i in range(1, 11))
    for quote in ['For complex installations, migration requires rebuilding integrations and retraining teams.', 'Our small deployment moved in six weeks because we used only standard connectors.']:
        assert quote in docs['03'] and quote in docs['05'], quote
    sources = re.findall(r'^\| (S[1-6])/P([1-4]) \| (.+) \|$', docs['05'], re.M)
    assert len(sources) == 24 and len({(x[0], x[1]) for x in sources}) == 24
    assert all(f'| G{i:02d} |' in docs['05'] for i in range(1, 19))
    sql = '\n'.join(re.findall(r'```sql\n(.*?)\n```', docs['04'], re.S))
    tables = set(re.findall(r'create table public\.(\w+)', sql))
    enabled = set(re.findall(r'alter table public\.(\w+) enable row level security', sql))
    assert tables == enabled, (tables - enabled, enabled - tables)
    assert len(tables) == 37, len(tables)
    referenced = set(re.findall(r'references public\.(\w+)', sql))
    assert referenced <= tables, referenced - tables
    assert 'extensions.vector(1536)' in sql
    assert 'grant update(display_name,locale)' in sql
    assert 'before insert or update or delete' in sql
    assert 'create unique index messages_one_pending' in sql
    registry = json.loads(re.search(r'```json\n(.*?)\n```', docs['05'], re.S).group(1))
    defs = registry['$defs']
    refs = re.findall(r'"\$ref":\s*"#\/\$defs\/([^\"]+)"', json.dumps(registry))
    assert set(refs) <= set(defs)
    assert len(registry['tools']) == 5
    assert {t['name'] for t in registry['tools']} == {'search_research', 'fetch_document', 'fetch_transcript_span', 'list_companies', 'lookup_entity'}
    assert set(defs['citation']['required']) == set(defs['citation']['properties'])
    for line in docs['05'].splitlines():
        match = re.match(r'Agent → (\w+): (\{.*\})$', line)
        if match:
            request = json.loads(match[2])
            assert match[1] in {t['name'] for t in registry['tools']}
            assert isinstance(request, dict)
    ts = '\n'.join(re.findall(r'```ts\n(.*?)\n```', docs['04'], re.S))
    declared = set(re.findall(r'export type (\w+)', ts))
    assert {'Answer', 'Citation', 'StreamEvent', 'Api', 'ApiError'} <= declared
    compiler = shutil.which('tsc')
    assert compiler, 'TypeScript compiler is required for this verification'
    version = subprocess.run([compiler, '--version'], capture_output=True, text=True, check=True).stdout.strip()
    with tempfile.TemporaryDirectory(prefix='briefing-c-types-') as temporary:
        contract = Path(temporary) / 'contract.ts'
        contract.write_text(ts)
        command = [compiler, '--noEmit', '--strict', '--skipLibCheck', '--target', 'ES2022', '--lib', 'ES2022,DOM']
        if int(re.search(r'(\d+)\.', version)[1]) >= 7:
            command.append('--ignoreConfig')
        result = subprocess.run([*command, str(contract)], cwd=temporary, capture_output=True, text=True)
        assert result.returncode == 0, result.stdout + result.stderr
    snapshots = json.loads((base / 'verification-input-hashes.json').read_text())
    for file, expected in snapshots.items():
        assert hashlib.sha256(Path(file).read_bytes()).hexdigest() == expected, f'Input changed: {file}'
    routes = re.findall(r"^ '(?:GET|POST|PUT|PATCH|DELETE) [^']+':", ts, re.M)
    assert len(routes) == len(set(routes))
    print(f'PASS: four specs; {word_count}-word main prompt; 24 synthetic paragraphs; 18 gold cases; {len(tables)} tables with RLS; {len(routes)} API routes; five MCP schemas; {version} strict typecheck; {len(snapshots)} unchanged input hashes.')
    print('Boundary: document/type checks only. See 06 for separate isolated PostgreSQL results and unrun hosted/model/OAuth checks.')


if __name__ == '__main__':
    main()
