import { accessRoute } from './accessRoute'
import { askRoute } from './askRoute'
import { authAliasRoute } from './authAliasRoute'
import { builtRoute } from './builtRoute'
import { compareRoute } from './compareRoute'
import { connectRoute } from './connectRoute'
import { debugAliasRoute } from './debugAliasRoute'
import { inspectionRoute } from './inspectionRoute'
import { labMemoryRoute } from './labMemoryRoute'
import { labReportRoute } from './labReportRoute'
import { labTranscriptRoute } from './labTranscriptRoute'
import { labTranscriptsRoute } from './labTranscriptsRoute'
import { landingRoute } from './landingRoute'
import { libraryRoute } from './libraryRoute'
import { loginRoute } from './loginRoute'
import { methodRoute } from './methodRoute'
import { notesRoute } from './notesRoute'
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
  labTranscriptsRoute,
  labTranscriptRoute,
  labReportRoute,
  labMemoryRoute,
  runtimeRoute.addChildren([
    loginRoute,
    accessRoute.addChildren([
      workspaceRoute,
      askRoute,
      compareRoute,
      libraryRoute,
      notesRoute,
      standardsRoute,
      readerRoute,
      inspectionRoute,
      provenanceRoute,
    ]),
  ]),
])
