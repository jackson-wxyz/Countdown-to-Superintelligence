// Distribution of endings for the 'novice' strategy across random seeds.
const { gameAtNationalization, playEndgame } = require('../helpers');
const n = +(process.argv[2] || 20);
const strat = process.argv[3] || 'novice';
const counts = {};
let totalDays = 0;
for (let seed = 1; seed <= n; seed++) {
  const g = gameAtNationalization(seed);
  const r = playEndgame(g, strat);
  counts[r.ending] = (counts[r.ending] || 0) + 1;
  totalDays += r.days;
}
console.log(strat, JSON.stringify(counts), 'avg days', Math.round(totalDays / n));
