import podcastCover from '@/assets/podcast-cover.jpg'
import { PlayGlyph } from '@/components/PlayGlyph'
import { podcastContent } from './podcastContent'

export function PodcastPlayCard() {
  return (
    <a
      href={podcastContent.spotify}
      target="_blank"
      rel="noreferrer"
      aria-label="Listen to IP Fieldwork on Spotify"
      aria-describedby="podcast-disclosure"
      className="group relative block overflow-hidden border border-ink-border md:col-span-5"
    >
      <img
        src={podcastCover}
        alt=""
        className="aspect-[4/3] w-full object-cover transition-transform duration-700 motion-safe:group-hover:scale-105"
        loading="lazy"
        width={1024}
        height={768}
      />
      <span className="absolute inset-0 bg-ink/30 transition-colors group-hover:bg-ink/10" />
      <span className="absolute inset-0 flex items-center justify-center">
        <span className="flex size-20 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-lift transition-transform duration-300 motion-safe:group-hover:scale-110">
          <PlayGlyph />
        </span>
      </span>
      <span className="meta-text absolute bottom-3 left-4 text-ink-foreground/80">
        {podcastContent.episode}
      </span>
    </a>
  )
}
