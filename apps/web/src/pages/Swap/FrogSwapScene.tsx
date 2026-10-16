import '~/pages/Swap/frog-swap.css'
import { Flex } from '@universe/mycelium'
import type { PropsWithChildren } from 'react'

function PondPal(): JSX.Element {
  return (
    <svg viewBox="0 0 300 310" aria-hidden="true" className="pond-pal">
      <ellipse cx="150" cy="282" rx="137" ry="21" fill="var(--pond-deep)" />
      <path d="M26 278Q70 239 150 260Q225 238 275 279L164 288Z" fill="var(--pond-lime)" />
      <g stroke="var(--pond-ink)" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round">
        <ellipse cx="82" cy="247" rx="48" ry="22" fill="var(--pond-frog)" transform="rotate(-18 82 247)" />
        <ellipse cx="218" cy="247" rx="48" ry="22" fill="var(--pond-frog)" transform="rotate(18 218 247)" />
        <ellipse cx="150" cy="209" rx="76" ry="62" fill="var(--pond-frog)" />
        <ellipse cx="150" cy="223" rx="44" ry="37" fill="var(--pond-lime)" stroke="none" />
        <path d="M90 207L69 239M210 207L231 239" fill="none" />
        <path d="M56 124Q55 78 94 71L206 71Q245 78 244 124Q250 182 150 190Q50 182 56 124Z" fill="var(--pond-frog)" />
        <circle cx="98" cy="77" r="38" fill="var(--pond-frog)" />
        <circle cx="202" cy="77" r="38" fill="var(--pond-frog)" />
        <circle cx="100" cy="76" r="23" fill="var(--pond-cream)" stroke="none" />
        <circle cx="200" cy="76" r="23" fill="var(--pond-cream)" stroke="none" />
        <ellipse cx="106" cy="79" rx="9" ry="14" fill="var(--pond-ink)" stroke="none" />
        <ellipse cx="194" cy="79" rx="9" ry="14" fill="var(--pond-ink)" stroke="none" />
        <circle cx="108" cy="74" r="3" fill="white" stroke="none" />
        <circle cx="196" cy="74" r="3" fill="white" stroke="none" />
        <path d="M110 142Q150 176 190 142" fill="none" />
        <ellipse cx="83" cy="134" rx="15" ry="8" fill="var(--pond-peach)" stroke="none" />
        <ellipse cx="217" cy="134" rx="15" ry="8" fill="var(--pond-peach)" stroke="none" />
      </g>
      <path
        d="M31 52L36 38L41 52L55 57L41 62L36 76L31 62L17 57Z"
        fill="var(--pond-yellow)"
        stroke="var(--pond-ink)"
        strokeWidth="3"
      />
      <path
        d="M260 173L264 162L268 173L279 177L268 181L264 192L260 181L249 177Z"
        fill="var(--pond-yellow)"
        stroke="var(--pond-ink)"
        strokeWidth="3"
      />
    </svg>
  )
}

export function FrogSwapScene({ children }: PropsWithChildren): JSX.Element {
  return (
    <section className="frog-scene" aria-labelledby="pond-heading">
      <header className="pond-intro">
        <span className="pond-eyebrow">
          <span aria-hidden="true">✳</span> WELCOME TO THE POND
        </span>
        <h1 id="pond-heading">
          Good swaps.
          <br />
          <span>Great leaps.</span>
        </h1>
        <p>A fresh little place to swap your favorite tokens.</p>
      </header>
      <Flex className="pond-friend" aria-hidden="true">
        <Flex className="pond-speech">
          less scrolling.
          <br />
          more ribbit.
        </Flex>
        <PondPal />
        <span className="pond-friend-label">YOUR FRIENDLY POND PAL</span>
      </Flex>
      <Flex className="pond-sticker" aria-hidden="true">
        <span>100%</span>
        <br />
        pond energy.<span className="pond-sticker-star">✳</span>
      </Flex>
      <Flex className="pond-swap-card">
        <Flex className="pond-card-label">
          <span>POND SWAP</span>
          <span>TAKE A LITTLE LEAP</span>
        </Flex>
        {children}
      </Flex>
      <footer className="pond-footer">
        <span aria-hidden="true">✳</span> Your tokens. Your call. <span className="pond-footer-dot">·</span> Built on
        Uniswap.
      </footer>
    </section>
  )
}
