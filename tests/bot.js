// Thin wrappers around the autoplay bots in docs/dev.js (the same bots the in-game dev panel uses).

function firstHalfPolicy(g, opts) {
    return g.ctx.DevBots.firstHalf(opts);
}

// Run `tick` every `everyMs` of game time until `until()` or `maxMs`.
function play(g, tick, until, maxMs, everyMs) {
    return g.ctx.DevBots.run(tick, until, maxMs, everyMs || 500);
}

module.exports = { firstHalfPolicy, play };
