import json
import subprocess
from token_fixture import token


def capture(name, path, *, method='GET', data=None, authorized=True, headers=None):
    command = ['curl', '--silent', '--show-error', '--max-time', '15', '-i', '-X', method, 'http://127.0.0.1:4397' + path, '-H', 'X-Request-Id: example-' + name]
    if data is not None:
        command += ['-H', 'Content-Type: application/json', '--data', json.dumps(data, separators=(',', ':'))]
    for key, value in (headers or {}).items():
        command += ['-H', key + ': ' + value]
    # The fixture token travels through stdin, never process arguments or output.
    config = 'header = "Authorization: Bearer ' + token() + '"\n' if authorized else ''
    command += ['--config', '-']
    output = subprocess.run(command, input=config, capture_output=True, text=True, timeout=20, check=True).stdout
    head, _, body = output.partition('\n\n')
    status = int(head.splitlines()[0].split()[1])
    result = {'name': name, 'path': path, 'status': status, 'headers': dict(line.split(': ', 1) for line in head.splitlines()[1:] if ': ' in line)}
    result['body'] = json.loads(body) if body else None
    if name != 'rate' or status == 429:
        print(name + ': HTTP ' + str(status), flush=True)
    return result


