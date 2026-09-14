from pathlib import Path
import socket
import urllib.request


def verify_origin():
    for path in ('/', '/app', '/read/northstar/rev-1/p-1'):
        with urllib.request.urlopen('http://127.0.0.1:4397' + path) as response:
            assert response.status == 200 and response.headers['cache-control'] == 'no-cache'
            assert response.read() == Path('dist/index.html').read_bytes()
    asset = next(Path('dist/assets').glob('index-*.js'))
    with urllib.request.urlopen('http://127.0.0.1:4397/assets/' + asset.name) as response:
        assert response.headers['cache-control'] == 'public, max-age=31536000, immutable'
    with socket.create_connection(('127.0.0.1', 4397), timeout=5) as connection:
        connection.sendall(b'GET http://[ HTTP/1.1\r\nHost: localhost\r\nConnection: close\r\n\r\n')
        assert connection.recv(4096).startswith(b'HTTP/1.1 400')
    with urllib.request.urlopen('http://127.0.0.1:4397/api/v1/health') as response:
        assert response.status == 200
