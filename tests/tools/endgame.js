// Prints a trace of scripted strategies playing the endgame.
//   node tests/tools/endgame.js [strategy ...] [--seed=N] [--verbose]
const { createGame } = require('../harness');
const { strategies, playToNationalization, playEndgame } = require('../endgameBot');
const args = process.argv.slice(2);
const verbose = args.includes('--verbose');
const seedArg = args.find(a => a.startsWith('--seed='));
const seed = seedArg ? +seedArg.split('=')[1] : 1;
const names = args.filter(a => !a.startsWith('--'));
for (const name of (names.length ? names : strategies(createGame()))) {
  const g = createGame({ seed });
  playToNationalization(g);
  const natMin = g.ctx.Days / 120;
  const r = playEndgame(g, name);
  console.log(`== ${name.padEnd(12)} ending=${r.ending} after ${Math.round(r.days)} days (${(r.days/60).toFixed(1)} min; total ${(natMin + r.days/60).toFixed(1)} min) ${g.ctx.DateCruncher(g.ctx.Days)}`);
  if (verbose) {
    for (const t of r.trace) console.log('   ', JSON.stringify(t));
    console.log('    bought:', r.log.map(([d, id]) => `${Math.round(d)}:${id}`).join(' '));
    for (const m of r.messages.filter(m => /^[A-Z ]+:|hurdle|ENDING/.test(m.msg))) console.log('    msg', m.day, m.msg.slice(0, 110));
  }
}
