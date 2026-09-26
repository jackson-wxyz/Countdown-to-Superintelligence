// Sweep an EG tuning constant across values and report each strategy's ending.
//   node tests/tools/sweep.js RIVALRY 0.0012 0.0015 0.0018 -- diplomat balanced
const { gameAtNationalization, playEndgame } = require('../helpers');
const argv = process.argv.slice(2);
const sep = argv.indexOf('--');
const [key, ...vals] = sep >= 0 ? argv.slice(0, sep) : argv;
const strats = sep >= 0 ? argv.slice(sep + 1) : ['passive', 'racer', 'aligner', 'diplomat', 'commonwealth', 'hawk', 'balanced'];
for (const v of vals) {
  const row = [];
  for (const s of strats) {
    const g = gameAtNationalization();
    g.ctx.EG[key] = +v;
    const r = playEndgame(g, s);
    row.push(`${s}:${r.ending}@${Math.round(r.days)}`);
  }
  console.log(`${key}=${v}  ` + row.join('  '));
}
