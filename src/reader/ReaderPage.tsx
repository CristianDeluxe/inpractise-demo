import { useReaderParams } from '@/reader/hooks/useReaderParams'
import { Link } from '@tanstack/react-router'
import { PassageLoader } from './PassageLoader'

export function ReaderPage() {
  const reference = useReaderParams()
  return (
    <main id="main-content" className="mx-auto max-w-4xl px-5 py-10 md:px-10">
      <Link to="/app" className="text-sm text-primary">
        ← Research workspace
      </Link>
      <h1 className="mt-6 text-3xl">Read the source.</h1>
      <PassageLoader
        key={`${reference.documentId}:${reference.revisionId}:${reference.passageId}`}
        {...reference}
      />
    </main>
  )
}
