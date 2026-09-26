// Prints a pacing trace of a bot playthrough of the first half.
const { createGame } = require('../harness');
const { firstHalfPolicy, play } = require('../bot');
const args = Object.fromEntries(process.argv.slice(2).map(a => a.split('=')).map(([k, v]) => [k, isNaN(+v) ? v : +v]));
const g = createGame({ seed: 1 });
const pol = firstHalfPolicy(g, args);
const seen = new Set();
let lastLog = 0;
const t0 = Date.now();
play(g, () => {
  pol();
  const c = g.ctx;
  for (const p of c.projects) if (p.flag == 1 && !seen.has(p.id)) { seen.add(p.id); console.log(`${(c.Days/120).toFixed(1).padStart(5)}m ${c.DateCruncher(c.Days).padEnd(20)} ${p.title}`); }
  if (c.Days - lastLog >= 600) { lastLog = c.Days;
    console.log(`   -- t=${(c.Days/120).toFixed(0)}m GPUs=${c.GPUs.toExponential(2)} model=${c.AIcapabilities.toExponential(2)} BaseCap=${c.BaseCapability.toFixed(1)} hype=${c.hype.toFixed(1)} att=${c.attitudeBalance.toFixed(0)} R=${c.Researchers} I=${c.Insights.toFixed(1)} $=${c.jFunds.toExponential(2)}`); }
}, () => g.ctx.Nationalized, (args.maxMin || 120) * 60000, 500);
const c = g.ctx;
console.log(`END t=${(c.Days/120).toFixed(1)}m ${c.DateCruncher(c.Days)} nat=${c.Nationalized} model=${c.AIcapabilities.toExponential(2)} BaseCap=${c.BaseCapability.toFixed(1)} GPUs=${c.GPUs.toExponential(2)} hype=${c.hype.toFixed(1)} att=${c.attitudeBalance.toFixed(0)} path=${c.natStartingPath} (sim ${(Date.now()-t0)/1000}s)`);
