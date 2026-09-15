import type { AskChatProps } from './AskChatProps'
import { AskComposer } from './AskComposer'
import { AskStarters } from './AskStarters'
import { AskTranscript } from './AskTranscript'
import { useAskChat } from './hooks/useAskChat'

export function AskChat({ company }: AskChatProps) {
  const chat = useAskChat(company)
  return (
    <div className="flex min-h-0 flex-1 flex-col">
      <div className="min-h-0 flex-1 overflow-y-auto px-4 py-4">
        {chat.exchanges.length === 0 ? (
          <AskStarters onSelect={chat.setQuery} />
        ) : (
          <AskTranscript
            exchanges={chat.exchanges}
            pending={chat.pending}
            stages={chat.progress.stages}
          />
        )}
      </div>
      <AskComposer
        query={chat.query}
        pending={chat.pending}
        onChange={chat.setQuery}
        onSubmit={chat.submit}
      />
    </div>
  )
}
