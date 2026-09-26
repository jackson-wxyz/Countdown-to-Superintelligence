// Helpers for driving the scripted endgame strategies defined in docs/dev.js (DevBots.STRATEGIES).

function playToNationalization(g, opts) {
    const c = g.ctx;
    const ok = c.DevBots.run(c.DevBots.firstHalf(opts), () => c.Nationalized, 150 * 60000, 500);
    if (!ok) throw new Error('first half never reached nationalization');
}

// Play the endgame with a strategy until an ending (or maxDays).  Returns a summary + trace.
function playEndgame(g, strategy, maxDays, overrides) {
    const c = g.ctx;
    const bot = c.DevBots.endgame(strategy, overrides);
    maxDays = maxDays || 6000;
    const trace = [];
    let lastTrace = -999;
    while (!c.endgameResolved && c.egDays < maxDays) {
        bot.tick();
        c.simulateMs(1000); // one game-day
        if (c.egDays - lastTrace >= 100) {
            lastTrace = c.egDays;
            trace.push({ d: Math.round(c.egDays), date: c.DateCruncher(c.Days), bc: +c.BaseCapability.toFixed(1), rival: +c.rivalBC.toFixed(1),
                cev: +c.CEV.toFixed(1), coop: +c.COOP.toFixed(1), ins: +c.Insights.toFixed(0),
                thr: Object.fromEntries(Object.entries(c.threat).map(([k, v]) => [k, Math.round(v)])), war: c.warState, rogue: c.rogueActive, paused: c.paused });
        }
    }
    return { ending: c.endingId || null, days: c.egDays, trace, log: bot.log, messages: g.messages };
}

module.exports = { STRATEGIES: null, playToNationalization, playEndgame, strategies: (g) => Object.keys(g.ctx.DevBots.STRATEGIES) };
