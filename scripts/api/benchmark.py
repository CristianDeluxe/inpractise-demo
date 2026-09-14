import json
from pathlib import Path
import time
import urllib.request
from token_fixture import token


def benchmark():
    samples = []
    for index in range(220):
        request = urllib.request.Request('http://127.0.0.1:4397/api/v1/me', headers={'Authorization': 'Bearer ' + token('benchmark-' + str(index))})
        started = time.perf_counter()
        with urllib.request.urlopen(request, timeout=15) as response:
            response.read()
            metrics = dict(item.strip().split(';dur=') for item in response.headers['server-timing'].split(','))
        if index >= 20:
            samples.append({'loopbackMs': (time.perf_counter() - started) * 1000, 'backendMs': float(metrics['backend']), 'facadeMs': float(metrics['facade'])})
    summary = {'sampleSize': len(samples), 'warmupRequests': 20, 'method': 'Sequential GET /api/v1/me through the built origin to a local fixture. Server-Timing measures facade handler minus awaited backend fetch/body time. Loopback time includes HTTP transport. No production or real backend inference.', 'metrics': {key: {'p50': sorted(sample[key] for sample in samples)[99], 'p95': sorted(sample[key] for sample in samples)[189]} for key in samples[0]}}
    Path('docs/api-latency.json').write_text(json.dumps(summary, indent=2) + '\n')
    print(json.dumps(summary), flush=True)


