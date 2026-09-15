export const footerColumns = [
  {
    heading: 'Account',
    links: [
      { label: 'Log in', to: '/login' },
      {
        label: 'Request access',
        to: '/login',
        description: 'Demo sign-in; no access request form',
      },
      { label: 'Workspace', to: '/app' },
    ],
  },
  {
    heading: 'Research',
    links: [
      { label: 'Interview library', to: '/app' },
      { label: 'Ask the corpus', to: '/app' },
      { label: 'Research standards', to: '/method' },
    ],
  },
  {
    heading: 'Services',
    links: [
      { label: 'Connect your tools', to: '/connect' },
      { label: 'Coverage and sourcing', to: '/method' },
      { label: 'Retrieval diagnostics', to: '/inspect' },
    ],
  },
  {
    heading: 'About',
    links: [
      { label: 'How we work', to: '/method' },
      { label: 'Built with agents', to: '/built' },
      {
        label: 'For executives',
        to: '/login',
        description: 'Demo sign-in; no source recruitment form',
      },
      {
        label: 'Contact',
        to: '/login',
        description: 'Demo sign-in; no contact form',
      },
    ],
  },
] as const
