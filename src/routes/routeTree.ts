import { accessRoute } from './accessRoute'
import { askAliasRoute } from './askAliasRoute'
import { authAliasRoute } from './authAliasRoute'
import { connectRoute } from './connectRoute'
import { debugAliasRoute } from './debugAliasRoute'
import { inspectionRoute } from './inspectionRoute'
import { landingRoute } from './landingRoute'
import { libraryAliasRoute } from './libraryAliasRoute'
import { loginRoute } from './loginRoute'
import { methodRoute } from './methodRoute'
import { readerRoute } from './readerRoute'
import { resetAliasRoute } from './resetAliasRoute'
import { rootRoute } from './rootRoute'
import { runtimeRoute } from './runtimeRoute'
import { workspaceRoute } from './workspaceRoute'

export const routeTree = rootRoute.addChildren([
  landingRoute,
  methodRoute,
  connectRoute,
  authAliasRoute,
  resetAliasRoute,
  libraryAliasRoute,
  askAliasRoute,
  debugAliasRoute,
  runtimeRoute.addChildren([
    loginRoute,
    accessRoute.addChildren([workspaceRoute, readerRoute, inspectionRoute]),
  ]),
])
