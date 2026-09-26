const test = require('node:test');
const assert = require('node:assert');
const { createGame, gameAtEndgameStart, playEndgame } = require('./helpers');

function fingerprint(c) {
    return JSON.stringify([c.Days, c.AIcapabilities, c.rivalAIcapabilities, c.CEV, c.COOP, c.Insights, c.threat, c.teams,
        c.activeProjects.map(p => p.id), c.projects.filter(p => p.flag == 1).map(p => p.id)]);
}

test('save/restore round-trips the whole game state', () => {
    const g = gameAtEndgameStart();
    playEndgame(g, 'balanced', 300);
    const snap = g.ctx.snapshotGame();
    const g2 = createGame({ seed: 99 });
    assert.ok(g2.ctx.restoreGame(snap));
    assert.strictEqual(fingerprint(g2.ctx), fingerprint(g.ctx));
    // ...and both copies evolve identically afterwards.
    playEndgame(g, 'balanced', 400);
    playEndgame(g2, 'balanced', 400);
    assert.strictEqual(fingerprint(g2.ctx), fingerprint(g.ctx));
});

test('save/restore works through localStorage too', () => {
    const g = gameAtEndgameStart();
    g.ctx.saveGame();
    const raw = g.ctx.localStorage.getItem('ctsi_save');
    assert.ok(raw && raw.length > 1000);
    const g2 = createGame();
    g2.ctx.localStorage.setItem('ctsi_save', raw);
    assert.ok(g2.ctx.loadGame());
    assert.strictEqual(fingerprint(g2.ctx), fingerprint(g.ctx));
});

test('tuning constants are not frozen into saves', () => {
    const g = gameAtEndgameStart();
    const snap = g.ctx.snapshotGame();
    assert.ok(!('EG' in snap.vars));
    assert.ok(!('ENDINGS' in snap.vars));
});
