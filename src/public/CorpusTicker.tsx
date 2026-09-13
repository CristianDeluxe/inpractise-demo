import { animationDelay } from './animationDelay'
import { corpusTickerEntries } from './corpusTickerEntries'

export function CorpusTicker() {
  return (
    <div className="page-shell pt-12" aria-hidden="true">
      <div
        className="intro-fade overflow-hidden border-y border-border py-3"
        style={animationDelay(1250)}
      >
        <div className="ticker-track meta-text">
          {[0, 1].map((copy) => (
            <span key={copy} className="inline-flex gap-12">
              {corpusTickerEntries.map((entry) => (
                <span key={entry} className="uppercase tracking-[0.18em]">
                  {entry}
                </span>
              ))}
            </span>
          ))}
        </div>
      </div>
    </div>
  )
}
