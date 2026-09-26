// SAVE / LOAD ---------------------------------------------------------------------------------------
// The game keeps its state in plain global variables (like Universal Paperclips).  To save, we
// snapshot every global that the game scripts created (see boot.js) whose value is plain data,
// plus each project's flag/uses and which project buttons are on screen.  Tuning tables (EG,
// ENDINGS...) are skipped so that balance changes apply to old saves.

var SAVE_KEY = "ctsi_save";
var SAVE_VERSION = 1;
var SAVE_SKIP = ["__preGameKeys", "SAVE_SKIP", "SAVE_KEY", "SAVE_VERSION", "EG", "ENDINGS", "ENDING_ORDER", "TEAM_INFO",
                 "egEvents", "projects", "activeProjects", "gameSpeed", "gamePaused", "threnodyAudio", "threnodyLoadedBool",
                 "DevBots", "devState", "saveTimer", "blinkCounter", "longBlinkCounter", "renderCounter", "chartTimer",
                 "ticks_per_day", "ticks_per_day_endgame", "fudge_factor", "dataLayer", "google_tag_manager"];

function isPlainData(v, depth){
    if (depth > 6) { return false; }
    if (v === null) { return true; }
    var t = typeof v;
    if (t == "number") { return isFinite(v); }
    if (t == "string" || t == "boolean") { return true; }
    if (t != "object") { return false; }
    if (Array.isArray(v)) {
        for (var i = 0; i < v.length; i++){ if (v[i] !== null && v[i] !== undefined && !isPlainData(v[i], depth + 1)) { return false; } }
        return true;
    }
    if (Object.getPrototypeOf(v) !== Object.prototype) { return false; }
    for (var k in v){ if (v[k] !== undefined && !isPlainData(v[k], depth + 1)) { return false; } }
    return true;
}

function gameVarKeys(){
    return Object.keys(window).filter(function(k){
        return __preGameKeys.indexOf(k) < 0 && SAVE_SKIP.indexOf(k) < 0 && typeof window[k] != "function";
    });
}

function snapshotGame(){
    var state = { version: SAVE_VERSION, savedAt: Date.now(), vars: {}, projects: {}, active: [], sliders: {} };
    gameVarKeys().forEach(function(k){
        var v = window[k];
        if (v !== undefined && isPlainData(v, 0)) { state.vars[k] = v; }
    });
    projects.forEach(function(p){ state.projects[p.id] = { flag: p.flag, uses: p.uses, excluded: p.excluded || 0 }; });
    state.active = activeProjects.map(function(p){ return p.id; });
    ["AISSlider", "PaceSlider"].forEach(function(id){
        var el = document.getElementById(id);
        if (el) { state.sliders[id] = el.value; }
    });
    return JSON.parse(JSON.stringify(state));
}

function restoreGame(state){
    if (!state || state.version != SAVE_VERSION) { return false; }
    var vars = JSON.parse(JSON.stringify(state.vars));
    for (var k in vars){ window[k] = vars[k]; }
    projects.forEach(function(p){
        var s = state.projects[p.id];
        if (s) { p.flag = s.flag; p.uses = s.uses; p.excluded = s.excluded || 0; }
    });
    var list = document.getElementById("projectListTop");
    while (list.firstChild) { list.removeChild(list.firstChild); }
    activeProjects.length = 0;
    state.active.forEach(function(id){
        for (var i = 0; i < projects.length; i++){
            if (projects[i].id == id) { activeProjects.push(projects[i]); displayProjects(projects[i]); }
        }
    });
    for (var id in state.sliders){
        var el = document.getElementById(id);
        if (el) { el.value = state.sliders[id]; el._bound = false; }
    }
    document.getElementById("GPUBuyerStatus").innerHTML = GPUBuyerStatus == 1 ? "ON" : "OFF";
    if (Nationalized && typeof buildTeamRows == 'function') { buildTeamRows(); }
    if (!Nationalized) {
        try { UpdateCoolGraph(); } catch (e) {}
        try { if (PoliticsFlag > 0) { UpdateSentiment(); DrawPolitics(); } } catch (e) {}
    }
    if (endgameResolved && endingId) { showEndingScreen(endingId); }
    return true;
}

function saveGame(){
    if (endgameResolved) { return; }
    try { localStorage.setItem(SAVE_KEY, JSON.stringify(snapshotGame())); } catch (e) {}
}

function loadGame(){
    try {
        var raw = localStorage.getItem(SAVE_KEY);
        if (!raw) { return false; }
        return restoreGame(JSON.parse(raw));
    } catch (e) {
        return false;
    }
}

function resetGame(){
    if (typeof confirm == 'function' && !confirm("Start over from 2016?  Your progress will be lost.")) { return; }
    try { localStorage.removeItem(SAVE_KEY); } catch (e) {}
    saveTimer = -1;
    window.location.reload();
}

// Load on startup (before the first tick), then autosave every 10 seconds.
if (loadGame()) {
    displayMessage("Game loaded.  (Autosaves every 10 seconds.)");
}
var saveTimer = window.setInterval(function(){ if (saveTimer !== -1) { saveGame(); } }, 10000);
