export const corsHeaders: Readonly<Record<string, string>> = {
  'access-control-allow-origin': '*',
  'access-control-allow-headers':
    'apikey, authorization, content-type, x-client-info',
  'access-control-allow-methods': 'POST, OPTIONS',
}
