import { createRoot } from 'react-dom/client'
import { ConfiguredApp } from './app/ConfiguredApp'
import './styles.css'

createRoot(document.getElementById('root') ?? document.body).render(
  <ConfiguredApp />,
)
