import { RuntimeContext } from '@/runtime/RuntimeContext'
import { Outlet } from '@tanstack/react-router'
import { useContext } from 'react'
import { ConfigurationNotice } from './ConfigurationNotice'

export function RuntimeGate() {
  const runtime = useContext(RuntimeContext)
  return runtime ? <Outlet /> : <ConfigurationNotice />
}
