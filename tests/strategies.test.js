// Balance tests: scripted strategies (docs/dev.js DevBots.STRATEGIES) should reach sensible,
// *different* endings in a sensible amount of time.  If you retune endgame.js and one of these
// fails, look at `node tests/tools/endgame.js <strategy> --verbose` to see what changed.
const test = require('node:test');
const assert = require('node:assert');
const { gameAtNationalization, playEndgame } = require('./helpers');

function run(strategy) {
    const g = gameAtNationalization();
    const r = playEndgame(g, strategy);
    r.tone = r.ending ? g.ctx.ENDINGS[r.ending].tone : null;
    r.ctx = g.ctx;
    return r;
}

const MIN_DAYS = 250;   // nobody should lose (or win) in the first ~4 minutes of the endgame
const MAX_DAYS = 2400;  // ...or have to wait more than ~40 minutes for an ending

test('passive play loses', () => {
    const r = run('passive');
    assert.strictEqual(r.tone, 'bad', `ending ${r.ending}`);
    assert.ok(r.days > MIN_DAYS && r.days < MAX_DAYS, `${r.days} days`);
});

test('reckless racing loses', () => {
    const r = run('racer');
    assert.strictEqual(r.tone, 'bad', `ending ${r.ending}`);
});

test('alignment-first play can reach the best ending', () => {
    const r = run('aligner');
    assert.strictEqual(r.ending, 'pivotal_shared');
    assert.ok(r.days > 600 && r.days < MAX_DAYS, `${r.days} days`);
});

test('balanced play can win', () => {
    const r = run('balanced');
    assert.strictEqual(r.tone, 'good', `ending ${r.ending}`);
    assert.ok(r.days > 600 && r.days < MAX_DAYS, `${r.days} days`);
});

test('diplomacy-first play can reach the Global Pause', () => {
    const r = run('diplomat');
    assert.strictEqual(r.ending, 'pause_forever');
    assert.ok(r.days > 400 && r.days < MAX_DAYS, `${r.days} days`);
});

test('the pause can be used to finish alignment together', () => {
    const r = run('commonwealth');
    assert.strictEqual(r.ending, 'pause_joint');
});

test('a war can be won (with a missile shield)', () => {
    const r = run('warlord');
    assert.strictEqual(r.ctx.rivalDefeated, 1, 'rival defeated');
    assert.ok(r.ending, 'reaches some ending');
});

test('hawkish play reaches an ending without errors', () => {
    const r = run('hawk');
    assert.ok(r.ending);
});

test('strategies lead to at least five different endings', () => {
    const endings = new Set(['passive', 'racer', 'aligner', 'diplomat', 'commonwealth', 'hawk', 'balanced', 'warlord'].map(s => run(s).ending));
    assert.ok(endings.size >= 5, [...endings].join(', '));
});

test('invariants hold throughout a full endgame', () => {
    const g = gameAtNationalization();
    const c = g.ctx;
    const bot = c.DevBots.endgame('balanced');
    const keys = ['AIcapabilities', 'rivalAIcapabilities', 'CEV', 'COOP', 'Insights', 'LaborForce', 'TotalGDP', 'capGrowth', 'rivalGrowth', 'warScore'];
    let staffed = null;
    while (!c.endgameResolved && c.egDays < 3000) {
        bot.tick();
        c.simulateMs(1000);
        for (const k of keys) assert.ok(Number.isFinite(c[k]), `${k} = ${c[k]} on day ${c.egDays}`);
        for (const k of ['bio', 'cyber', 'media', 'robo']) assert.ok(Number.isFinite(c.threat[k]), `threat.${k}`);
        assert.ok(c.CEV >= 0 && c.CEV <= 100, `CEV ${c.CEV}`);
        assert.ok(c.COOP >= 0 && c.COOP <= 100, `COOP ${c.COOP}`);
        assert.ok(c.Insights >= -1e-9, `Insights ${c.Insights}`);
        assert.ok(c.Researchers >= 0, 'unassigned researchers');
        for (const k in c.teams) assert.ok(c.teams[k] >= 0, `team ${k}`);
        const total = c.Researchers + Object.values(c.teams).reduce((a, b) => a + b, 0);
        if (c.Nat_Research_Flag == 1) {
            if (staffed === null) staffed = total;
            assert.ok(total >= staffed, 'nobody vanishes from the team');
        }
    }
    assert.ok(c.endgameResolved);
});
