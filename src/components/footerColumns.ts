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
      { label: 'Interviews', to: '/app' },
      { label: 'Ask the interviews', to: '/app/ask' },
      { label: 'How quotes are checked', to: '/method' },
    ],
  },
  {
    heading: 'Services',
    links: [
      { label: 'Connect your tools', to: '/connect' },
      { label: 'Sources and limits', to: '/method' },
      { label: 'Search diagnostics', to: '/inspect' },
    ],
  },
  {
    heading: 'About',
    links: [
      { label: 'How quotes are checked', to: '/method' },
      {
        label: 'Contact',
        to: '/login',
        description: 'Demo sign-in; no contact form',
      },
    ],
  },
] as const
