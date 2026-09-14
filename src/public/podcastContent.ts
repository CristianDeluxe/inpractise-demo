export const podcastContent = {
  eyebrow: 'Our primary research podcast',
  title: 'IP Fieldwork',
  description:
    'Long conversations about single business models and the people who ran them, hosted by the analysts behind the written research.',
  episode: 'Latest episode · 52 min',
  disclosure:
    'Independent demo presentation. Artwork and episode duration are illustrative; external links open the public podcast. This demo does not host or produce IP Fieldwork.',
  spotify: 'https://open.spotify.com/show/0pNE11TzOo3pblGfBqeFI7',
  platforms: [
    {
      label: 'Spotify',
      href: 'https://open.spotify.com/show/0pNE11TzOo3pblGfBqeFI7',
      external: true,
    },
    {
      label: 'Apple Podcasts',
      href: 'https://podcasts.apple.com/us/podcast/ip-fieldwork/id1786321203',
      external: true,
    },
    { label: 'RSS feed', href: '/feed.xml', external: false },
  ],
} as const
