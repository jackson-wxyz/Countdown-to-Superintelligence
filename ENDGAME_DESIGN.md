# Endgame design notes

These notes explain the design of the second half of the game ("The Project", everything after
*Nationalize the AI Labs*) and the math behind its balance.

## Where the design came from

The endgame is built out of the plans already sketched in the code and HTML comments:

- *"Replace manually buying GPUs & training models with a continuous snowball of GDP -> model size -> more
  GDP, inspired by Tom Davidson's 'Takeoff Speeds' report... the vision is for the player to switch from
  thinking impatiently about scaling to essentially 'playing against the clock' of growing AI capabilities."*
- *"Recruit a (fixed-size) team of 50 researchers.  Individual researchers can be allocated to different
  categories of defensive effort... Eventually get autonomous virtual researchers, which just follow the main
  ones & multiply their efficacy."*
- The panels already laid out in `index2.html`: National Economy, Geopolitical Competition (95% pause
  treaty, 70% joint alignment, <30% war, <5% nukes), Deceptive Misalignment (99% pivotal act; hurdles at
  10^27-10^30 FLOPs), and threat panels for bio / cyber / media / military with their thresholds
  (bioterror at 50%, stolen weights at 50%, self-exfiltration at 75%, steganographic collusion at 90%,
  takeover at 110%...).
- The design notes in `projectN`: the four starting paths (doomer / regulatory / arms race /
  accelerationist), free either/or tradeoff decisions (NATO vs UN, share vs hoard medicine, compute
  governance treaty vs sanctions vs none, ban vs encourage open source), the war story (attrition by relative
  strength, slaughterbots for an alignment penalty, ceasefire, surrender, nuclear launch), the escaped AI
  ("alignment field shuts down, only choice left is global ban"), and *"each type of win/loss takes you to a
  modified ending page with a picture and comment on the ending, then a 'thanks for playing'."*

An earlier Claude session (the "claude's version" commit) had started on this.  It added the 2025-era
first-half projects and a set of endgame project stubs, but its `endgame.js` was never committed.  The
endgame here is a fresh implementation.  I kept those ideas (and some of the project text) where they fit.

## Core loop

The central tension is Jackson's "racing through a minefield": **go fast enough to stay ahead of the rival,
slow enough that alignment and defenses keep up.**

| | makes it better | makes it worse |
|---|---|---|
| Your AI's threat levels | experts, defense projects, "defensive AI" (d/acc) projects, a slower pace | capability growth (every point of BaseCapability adds 2-2.5% skill), accelerant projects |
| Alignment (CEV) | alignment researchers, alignment projects, a slower pace, pausing | capability growth (-0.35 CEV per point), hurdles at each OOM, militarization, neuralese |
| Rival's position | sanctions, treaties, sabotage, winning a war, racing | slowing down (they're a fast follower), stolen weights, open-sourcing |
| Cooperation (COOP) | diplomats, treaties, sharing research/medicine, warning shots, a common enemy | great-power rivalry (constant drag toward 25%), racing, a big lead, sanctions, sabotage, surveillance |

Every lever moves at least two of these in opposite directions, so there isn't a dominant strategy; the
scripted strategies in `docs/dev.js` confirm that different styles reach different endings.

## The math

All rates are per in-game day.  After nationalization the calendar slows to one day per real second.

**Capability growth.** Frontier compute grows at `pace * (G_HW * sqrt(econ) + G_SW * (1 + 4*autoRD))`:

- `G_HW = 0.003`: chip buildout, scaled by the square root of how much the AI economy has grown.
- `G_SW = 0.0022`: algorithmic progress, multiplied by up to 5x as AI automates AI research.  `autoRD` goes
  linearly from 0 at BaseCapability 60 (10^24 FLOPs) to 1 at 115 (10^29.5 FLOPs).

At nationalization (~10^24.3 FLOPs) that's a doubling time of about 4 months at 1x pace.  By 10^28 FLOPs,
with half the economy automated and most AI research done by AI, it's about 7 weeks.  At 2x pace it's roughly
twice as fast.  That's the takeoff the player feels: a slow start, then the clock visibly accelerating.

**The rival** grows the same way, with a fast-follower bonus of up to +80% when it's behind by an order of
magnitude.  It races harder when behind and slows when relations are warm.  At equal pace, your lead slowly
erodes, so you have to either keep racing or slow them down diplomatically or coercively.

**Cooperation** has equilibrium
`COOP* = 25 + (diplomats * 0.0035 * expert_mod - racing pressure - lead pressure) / 0.0018`.
With 8 diplomats at 1x pace that's about 45%, which is safe from war but nowhere near a treaty.  A Global Pause
(95%) needs roughly half the team on diplomacy at a slow pace, plus the verification chain (compute treaty ->
inspectors -> hardware-enabled verification).  One-off project bonuses decay back toward the equilibrium
over about 18 months, so COOP can't be bought once and forgotten.

**Alignment.** Each alignment researcher adds `0.001 * expert_mod` CEV per day, times up to 3x once the
Automated Alignment Researcher is running (its boost scales with how aligned the AI already is).  Against
that: -0.35 CEV per BaseCapability point, plus four -10 hurdles (halved by Deliberative Alignment).  A
balanced player (12 alignment researchers plus most alignment projects) reaches 99% at around 10^28.5-10^29.5
FLOPs.  That's right where the pivotal act becomes possible, and also where the threats start to get scary.

**Threats.** At *Defense in Depth*, existing institutions are set so that each threat starts around 25-35%
(lower if your first-half RLHF/evals suppressed more harm).  Skills then rise 2-2.5 points per BaseCapability
point, i.e. 100+ points over the endgame, against 50 researchers.  Players have to lean on the
virtual-researcher multipliers (x1.5, x1.3, x2, x1.5) and the "defensive AI" projects (which neutralize 35% of
future growth in a domain, scaled by how trustworthy the AI is).

**Events** use fuses rather than dice: when a condition holds (say, bio threat > 50%), a countdown starts
("Bioterror incident in 23 days").  It fires when the fuse burns down, and burns back at double speed if you
fix the condition.  The only randomness in the endgame is the deployment gamble, whose odds are shown.

**Insights** come from unassigned researchers at 0.006/day each, times `expert_mod`.  That's roughly 150-300
over an endgame, against ~500 worth of projects, so you have to choose.

## Paths through the endgame (as played by the scripted strategies)

| Strategy | What it does | Typical ending | Endgame length |
|---|---|---|---|
| passive | nothing | nuclear war (rivalry drags COOP under 30%, then 5%) | ~15 min |
| racer | 2x pace, accelerants, minimal safety | nuclear war or a takeover | ~5 min |
| aligner | 0.9x pace, big alignment team, adaptive defense | The Long Reflection | ~21 min |
| balanced | 1x pace, a bit of everything | The Long Reflection (or a gamble) | ~20 min |
| diplomat | 0.5x pace, half the team diplomats | The Long Pause | ~12 min |
| commonwealth | diplomat, then all-in alignment under the pause | The Commonwealth of Minds | ~14 min |
| hawk | sanctions, no diplomats | nuclear war | ~7 min |
| warlord | waits for a missile shield, then provokes and wins a war | varies (e.g. The Escape) | ~20 min |

The bots allocate researchers near-optimally, so humans should expect to find this somewhat harder.

## Knobs worth playtesting

- `EG.RIVALRY` and `EG.DIPLO_RATE` (how hard the pause is).  The pause path is quite sensitive to these;
  see `node tests/tools/sweep.js RIVALRY ...`.
- `EG.ALIGN_RATE` and `EG.CEV_EROSION` (how hard the pivotal act is).
- `EG.G_HW` / `EG.G_SW` (overall endgame length).
- Project costs in `projects.js`.  Insight income is `EG.INSIGHT_RATE`.
- `EG.START_THREAT` (how much breathing room the endgame starts with).

## Ideas not (yet) implemented

- A treemap of military power (you / your AI / rival / rival's AI), as sketched in the HTML comments.
- More one-off dilemma events (rival summit invitations, whistleblowers, model-welfare questions).
- Letting the escaped AI actively attack (raising threats) rather than just growing.
