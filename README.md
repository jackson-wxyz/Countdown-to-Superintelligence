# Countdown to Superintelligence

A clicker game about AI takeoff, by Jackson Wagner, forked from (and with permission from) Frank Lantz's
[Universal Paperclips](https://www.decisionproblem.com/paperclips/).  Think of it as a quick, videogame
version of "AI 2027": you start in 2016 with a single gaming GPU and an image classifier, and end up running
the nationalized Project, racing a rival superpower to superintelligence.

- Play it: https://jackson-wxyz.github.io/Countdown-to-Superintelligence/ (also mirrored at https://jacksonw.xyz/countdown/)
- Expect roughly an hour: ~30 minutes to nationalization, then ~15-30 minutes of endgame.
- Best played on a wide desktop screen.

## How the game works

**The first half (the startup era)** is a linear clicker in the Paperclips mold.  Buy GPUs, train
successively bigger models, unlock products (image classifiers, chatbots, coding agents...), hire researchers,
and spend their insights on projects -- including the modern paradigm shifts: RLHF, Constitutional AI,
chain-of-thought reasoning, inference-time compute, RL from verifiable rewards, synthetic data, and
autonomous agents.  Misuse harms feed public opinion; when AI becomes prominent enough, the government
**nationalizes the labs**.  How the public feels about AI at that moment picks one of four starting paths
(doomer / regulator / arms race / accelerationist), and your first-half safety work carries over as a head start.

**The second half (The Project)** flips the game around.  Capabilities now snowball on their own -- AI revenue
buys chips, and AI increasingly automates its own research (a la Tom Davidson's takeoff-speeds model) -- so
instead of impatiently scaling up, you're racing against the clock of your own AI's growing power.

Two clocks are always ticking:

1. **Your own AI.**  In each of four domains -- biosecurity, cybersecurity, media & persuasion, and
   robotics/military -- *threat = AI skill - defenses*.  Crossing 50% / 75% / 90% triggers incidents
   (bioterror, stolen weights, self-exfiltration, propaganda, drone attacks...), each with a visible
   countdown so you can react.  Past 110%, a misaligned AI takes over.
2. **The rival superpower's AI.**  If it reaches 10^29.5 FLOPs ahead of you, you lose.  It's a fast
   follower: the further behind it is, the faster it catches up.

...and two victory meters can stop them:

- **Alignment (CEV)** -- at 99%+ you can safely deploy superintelligence for a "pivotal act".  Smarter models
  are harder to align: every order of magnitude costs alignment, plus big hurdles at 10^27-10^30 FLOPs.
- **International cooperation (COOP)** -- at 95%+ (with verification infrastructure) you can ratify a
  **Global Pause**.  Great-power rivalry constantly drags it back down; below 30% the rival declares war,
  and below 5% (or if you win a war too decisively without a missile shield) it goes nuclear.

Your levers:

- the **frontier scaling pace** slider (race vs. buy time -- and racing alarms the rival),
- assigning your 50-person team to **alignment, diplomacy, four defense teams**, or leaving them unassigned to
  generate insights,
- ~60 **projects** and either/or **dilemmas** (NATO vs. UN treaty, compute treaty vs. export sanctions vs.
  nothing, open vs. closed weights, legible reasoning vs. neuralese, share vs. hoard medicine, share vs.
  classify alignment research, censorship and surveillance, slaughterbots, the hypnodrones...),
- crisis choices: ceasefires, surrender, nuclear first strikes, hunting down an escaped model, and the final
  choice of what to do with an aligned superintelligence.

### The 18 endings

| Good | Mixed | Bad |
|---|---|---|
| The Long Reflection (pivotal act, shared) | Pax Americana (pivotal act, seized) | Close Enough (deployment gamble fails) |
| The Commonwealth of Minds (pause, then build it together) | The Great Unplugging (escaped AI shut down) | Diamondoid / Skynet Was Too Optimistic / Hypnodrones / The Autofactories (takeovers) |
| The Long Pause (pause made permanent) | The Other Century (an aligned rival wins) | The Treacherous Turn, The Escape, They Got There First |
| | Terms (surrender) | Midnight (nuclear war), Unconditional (defeat), The Long Dark (collapse) |

Each ending gets a Doomsday Clock, a short epilogue, your stats, a "what went wrong?" hint for bad endings,
and a tally of which endings you've discovered (saved in your browser).

## Developer tools (cheats)

Open the game with **`?dev=1`** in the URL (e.g. `index2.html?dev=1`), or press the **backtick (`)** key at any
time.  The panel lets you:

- change the game speed (pause, 1x-30x) or skip ahead 1 / 5 minutes,
- **autoplay to nationalization** with the same bot the tests use, then autoplay the endgame for 40 / 300 /
  800 days (or to the end) using any of the scripted strategies (`balanced`, `aligner`, `diplomat`, `racer`...),
- add insights / researchers / money, nudge CEV and COOP, raise or lower all threats, 10x your AI or the
  rival's, start a war, make the AI escape,
- preview or trigger any ending screen, save, and reset.

The game autosaves to localStorage every 10 seconds; "reset game" is at the bottom of the page.

## Running it locally

It's a static site; open `docs/index.html` in a browser, or serve it:

```sh
npm run serve        # http://localhost:8000
```

## Tests and balance tools

No dependencies needed beyond Node 18+.

```sh
npm test                               # 50+ tests: first-half pacing, save/load, every ending, strategies, invariants
node tests/tools/pace.js               # trace of a bot playing the first half (when each project gets bought)
node tests/tools/endgame.js            # every scripted strategy's ending and duration
node tests/tools/endgame.js balanced --verbose     # 100-day trace of one strategy
node tests/tools/sweep.js RIVALRY 0.0012 0.0018 -- diplomat balanced   # sweep a tuning constant
```

`tests/harness.js` loads the real game scripts into a Node `vm` sandbox with a fake DOM and a fake clock, so a
whole playthrough simulates in a few seconds.  The autoplay bots live in `docs/dev.js` and are shared by the
tests and the in-game dev panel.  Almost every endgame tuning number lives in the `EG` table at the top of
`docs/endgame.js`; if you change one, rerun `npm test` -- the strategy tests check that each playstyle still
reaches its intended ending in a sensible amount of time.

## Files

| File | What's in it |
|---|---|
| `docs/index.html` | Title screen |
| `docs/index2.html` | The game page |
| `docs/boot.js` | Tiny bootstrap (Plotly fallback; remembers built-in globals for the save system) |
| `docs/globals.js` | First-half state |
| `docs/projects.js` | All projects: first half (hand-written, Paperclips-style) and endgame (via `natProject()`) |
| `docs/endgame.js` | The whole second half: tuning table, simulation, events, endings, rendering |
| `docs/main.js` | First-half mechanics and the game loops |
| `docs/save.js` | Autosave / load |
| `docs/dev.js` | Dev panel and autoplay bots |
| `tests/` | Harness, helpers, test files, and balance tools |
| `tools/sync-to-blog.sh` | Copies the game into the jacksonw.xyz Hugo site at `static/countdown/` |

See [ENDGAME_DESIGN.md](ENDGAME_DESIGN.md) for the design rationale and the math behind the balance.

## Credits

Universal Paperclips by Frank Lantz and Bennett Foddy; mirrored from https://www.decisionproblem.com/paperclips/
by [jgmize/paperclips](https://github.com/jgmize/paperclips), then modded into this game.
