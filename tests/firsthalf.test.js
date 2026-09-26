const test = require('node:test');
const assert = require('node:assert');
const { createGame } = require('./harness');
const { natInfoOnce, gameAtNationalization } = require('./helpers');

test('game scripts load and tick without errors', () => {
    const g = createGame();
    g.advance(5000);
    assert.ok(g.ctx.ticks > 400, 'fast loop ran');
    assert.ok(g.ctx.projects.length > 80, 'projects registered');
});

test('first half: bot reaches nationalization at a sensible pace', () => {
    const info = natInfoOnce();
    const minutes = info.days / 2 / 60; // 2 days per second before nationalization
    assert.ok(minutes > 15 && minutes < 45, `nationalized after ${minutes.toFixed(1)} min`);
});

test('first half: modern-era projects are reachable before nationalization', () => {
    const info = natInfoOnce();
    const titles = info.messages.map(m => m.msg);
    for (const name of ['RLHF', 'Chain-of-Thought Reasoning', 'Autonomous AI Agents']) {
        assert.ok(titles.some(t => t.startsWith(name)), `${name} was bought`);
    }
});

test('first half: every project id is unique', () => {
    const g = createGame();
    const ids = g.ctx.projects.map(p => p.id);
    assert.strictEqual(new Set(ids).size, ids.length);
});

test('nationalization: startup-era projects are cleared and the path is chosen', () => {
    const g = gameAtNationalization();
    const c = g.ctx;
    assert.ok(c.Nationalized);
    assert.ok(['doomer', 'regulator', 'arms-race', 'accelerationist'].includes(c.natStartingPath));
    const natIndex = c.projects.indexOf(c.projectN);
    for (const p of c.activeProjects) assert.ok(c.projects.indexOf(p) > natIndex, `${p.title} should not linger after nationalization`);
    assert.ok(c.rivalAIcapabilities > 0 && c.rivalAIcapabilities < c.AIcapabilities);
});
