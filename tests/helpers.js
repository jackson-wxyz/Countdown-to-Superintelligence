// Shared fixtures for the test suite.
const { createGame } = require('./harness');
const { playToNationalization, playEndgame } = require('./endgameBot');

let natSnap = null;
let natInfo = null;

// Snapshot of a bot playthrough at the moment of nationalization (computed once per test file).
function nationalizationSnapshot() {
    if (!natSnap) {
        const g = createGame({ seed: 1 });
        playToNationalization(g);
        natSnap = g.ctx.snapshotGame();
        natInfo = { days: g.ctx.Days, messages: g.messages.slice() };
    }
    return natSnap;
}

function natInfoOnce() { nationalizationSnapshot(); return natInfo; }

// A fresh game restored to the nationalization snapshot.
function gameAtNationalization(seed) {
    const snap = nationalizationSnapshot();
    const g = createGame({ seed: seed == null ? 7 : seed });
    if (!g.ctx.restoreGame(snap)) throw new Error('restore failed');
    return g;
}

// Nationalized, with the intro chain clicked (all panels unlocked, ~40 days in).
function gameAtEndgameStart(seed) {
    const g = gameAtNationalization(seed);
    playEndgame(g, 'passive', 40);
    return g;
}

// Run n game-days without a bot.
function days(g, n) {
    const c = g.ctx;
    const stop = c.egDays + n;
    while (!c.endgameResolved && c.egDays < stop) c.simulateMs(1000);
}

function project(g, shortId) {
    return g.ctx.projects.find(p => p.id === 'projectButton' + shortId);
}

// Make a project show up and click it, bypassing its trigger (for scenario tests).
function forceProject(g, shortId) {
    const c = g.ctx;
    const p = project(g, shortId);
    if (!p) throw new Error('no project ' + shortId);
    if (!c.activeProjects.includes(p)) { c.activeProjects.push(p); c.displayProjects(p); p.uses = 0; }
    p.effect();
    return p;
}

module.exports = { createGame, playToNationalization, playEndgame, nationalizationSnapshot, natInfoOnce, gameAtNationalization, gameAtEndgameStart, days, project, forceProject };
