// Loaded before any game script.

// If the charting library failed to load (offline, CDN blocked...), stub it out so the game
// still runs, just without charts.
if (typeof Plotly === 'undefined') {
    window.Plotly = { newPlot: function(){}, react: function(){}, extendTraces: function(){}, purge: function(){} };
}

// Remember which globals belong to the browser, so the save system (save.js) can find every
// game variable without us maintaining a list by hand.
var __preGameKeys = Object.keys(window);
