export const responseHeaders = Object.fromEntries(
  [
    [
      'X-Request-Id',
      'Backend request ID when available; otherwise facade request ID.',
    ],
    [
      'X-Correlation-Id',
      'Accepted inbound X-Request-Id or generated UUID; forwarded to the backend.',
    ],
    ['Cache-Control', 'no-store except scoped passage private, no-cache.'],
    [
      'RateLimit',
      'Current draft-11 structured field: "principal";r=remaining;t=seconds. Authenticated requests only.',
    ],
    [
      'RateLimit-Policy',
      'Current draft-11 structured field: "principal";q=60;w=60.',
    ],
  ].map(
    ([name, description]) =>
      [
        name ?? '',
        { description: description ?? '', schema: { type: 'string' } },
      ] as const,
  ),
)
