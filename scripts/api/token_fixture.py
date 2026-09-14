import base64
import json


def token(subject='member-one'):
    payload = base64.urlsafe_b64encode(json.dumps({'iss': 'https://fixture.invalid', 'sub': subject}).encode()).decode().rstrip('=')
    return 'fixture.' + payload + '.fixture'


