import { accessRoute } from './accessRoute'
import { askRoute } from './askRoute'
import { authAliasRoute } from './authAliasRoute'
import { builtRoute } from './builtRoute'
import { connectRoute } from './connectRoute'
import { debugAliasRoute } from './debugAliasRoute'
import { inspectionRoute } from './inspectionRoute'
import { landingRoute } from './landingRoute'
import { libraryRoute } from './libraryRoute'
import { loginRoute } from './loginRoute'
import { methodRoute } from './methodRoute'
import { provenanceRoute } from './provenanceRoute'
import { readerRoute } from './readerRoute'
import { resetAliasRoute } from './resetAliasRoute'
import { rootRoute } from './rootRoute'
import { runtimeRoute } from './runtimeRoute'
import { standardsRoute } from './standardsRoute'
import { workspaceRoute } from './workspaceRoute'

export const routeTree = rootRoute.addChildren([
  landingRoute,
  methodRoute,
  builtRoute,
  connectRoute,
  authAliasRoute,
  resetAliasRoute,
  debugAliasRoute,
  runtimeRoute.addChildren([
    loginRoute,
    accessRoute.addChildren([
      workspaceRoute,
      askRoute,
      libraryRoute,
      standardsRoute,
      readerRoute,
      inspectionRoute,
      provenanceRoute,
    ]),
  ]),
])
