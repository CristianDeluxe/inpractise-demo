import json
import os
from pathlib import Path
import socket
import subprocess
from verify_origin import verify_origin
from wait_port import wait_port
from capture import capture
from benchmark import benchmark


def main():
    processes = []
    outputs = []
    Path('work/api').mkdir(parents=True, exist_ok=True)
    try:
        for port in (4397, 4398):
            with socket.socket() as probe:
                probe.bind(('127.0.0.1', port))
        for name, args, extra, port in [
            ('fixture', ['node_modules/.bin/tsx', '--tsconfig', 'tsconfig.node.json', 'scripts/api/fixtureBackend.ts'], {'FIXTURE_PORT': '4398'}, 4398),
            ('origin', ['node_modules/.bin/node', 'server.js'], {'PORT': '4397', 'RESEARCH_URL': 'http://127.0.0.1:4398/functions/v1/research'}, 4397),
        ]:
            output = open('work/api/' + name + '.log', 'w')
            outputs.append(output)
            process = subprocess.Popen(args, env={**os.environ, **extra}, stdout=output, stderr=subprocess.STDOUT)
            processes.append(process)
            wait_port(port, process)
        results = []
        for name, path, options, expected in [
            ('health', '/api/v1/health', {'authorized': False}, 200),
            ('openapi', '/api/v1/openapi.json', {'authorized': False}, 200),
            ('me', '/api/v1/me', {}, 200),
            ('documents', '/api/v1/documents?pageSize=1&company=northstar&kind=synthetic_interview', {}, 200),
            ('passage', '/api/v1/documents/northstar/revisions/rev-1/passages/p-1', {}, 200),
            ('search', '/api/v1/search', {'method': 'POST', 'data': {'query': 'evidence'}}, 200),
            ('answers', '/api/v1/answers', {'method': 'POST', 'data': {'query': 'evidence'}}, 200),
            ('unauthenticated', '/api/v1/me', {'authorized': False}, 401),
            ('provider', '/api/v1/answers', {'method': 'POST', 'data': {'query': 'provider-failure'}}, 503),
        ]:
            result = capture(name, path, **options)
            assert result['status'] == expected, result
            if name == 'openapi':
                assert result['body'] == json.loads(Path('docs/openapi.json').read_text())
                result['body'] = {'openapi': result['body']['openapi'], 'pathCount': len(result['body']['paths']), 'note': 'Full returned document equals docs/openapi.json; condensed here.'}
            results.append(result)
        first_page = next(result for result in results if result['name'] == 'documents')
        results.append(capture('next-page', '/api/v1/documents?pageSize=1&company=northstar&kind=synthetic_interview&cursor=' + first_page['body']['nextCursor']))
        passage = next(result for result in results if result['name'] == 'passage')
        results.append(capture('not-modified', passage['path'], headers={'If-None-Match': passage['headers']['etag']}))
        assert results[-1]['status'] == 304
        for attempt in range(61):
            result = capture('rate', '/api/v1/me')
            if result['status'] == 429:
                results.append(result)
                break
        else:
            raise RuntimeError('No rate-limit response')
        assert results[-1]['headers']['retry-after']
        verify_origin()
        Path('docs/api-examples.json').write_text(json.dumps(results, ensure_ascii=False, indent=2) + '\n')
        benchmark()
    finally:
        for process in reversed(processes):
            process.terminate()
            try:
                process.wait(timeout=5)
            except subprocess.TimeoutExpired:
                process.kill()
                process.wait(timeout=5)
        for output in outputs:
            output.close()


