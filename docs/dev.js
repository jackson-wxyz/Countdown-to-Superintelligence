// DEVELOPER TOOLS & AUTOPLAY BOTS ------------------------------------------------------------------
//
// Open the dev panel with ?dev=1 in the URL, or by pressing the backtick (`) key.
//
// The autoplay bots here are the same ones the automated tests use (tests/ loads this file into a
// headless copy of the game), so "skip to the endgame" in the browser plays out exactly like the
// balance tests do.

var DevBots = {};

// ---- First-half bot: a reasonable-human player of the startup era ----------------------------------
DevBots.firstHalf = function(opts){
    opts = Object.assign({
        trainRatio: 2.0,        // retrain when GPUhours >= ratio * current model
        gpusPerResearcher: 400, // hire up to 1 researcher per this many GPUs
        maxResearchers: 40,
        aisPercent: 30,         // safety slider once available
    }, opts || {});

    function dollarCost(p){
        var m = /\$([0-9,]+)/.exec(p.priceTag || '');
        return m ? Number(m[1].replace(/,/g, '')) : 0;
    }

    return function tick(){
        if (Nationalized) { return; }
        // 1. Buy every affordable project (the first half has no either/or choices).
        activeProjects.slice().forEach(function(p){ if (p.cost()) { p.effect(); } });

        // 2. Save up for visible dollar-priced projects.
        var reserve = 0;
        activeProjects.forEach(function(p){ reserve = Math.max(reserve, dollarCost(p)); });
        if (GPUBuyerStatus == 1) { toggleGPUBuyer(); } // we'll manage purchases ourselves

        // 3. Hire researchers.
        if (AISFlag >= 2 && Researchers < opts.maxResearchers) {
            var target = Math.min(opts.maxResearchers, 1 + Math.floor(GPUs/opts.gpusPerResearcher));
            if (Researchers < target) {
                if (jFunds - reserve >= 100000) { ResearcherClick(1); } else { reserve += 100000; }
            }
        }

        // 4. Spend the rest on compute.
        var spare = jFunds - reserve;
        if (GPU_Flag == 1 && spare > 0) {
            if (H100_Flag == 1 && spare >= 30000) { H100Click(Math.floor(spare/30000)); }
            else if (spare >= 500) { GPUClick(Math.floor(spare/500)); }
        }

        // 5. Safety slider.
        if (AISFlag >= 3) { document.getElementById('AISSlider').value = String(opts.aisPercent); }

        // 6. Train.
        if (GPU_Flag == 1) {
            if (AIcapabilities == 0 && GPUhours > 20) { TrainAI(); }
            else if (AIcapabilities > 0 && GPUhours >= opts.trainRatio*AIcapabilities) { TrainAI(); }
        }
    };
};

// ---- Endgame bots: caricatures of different strategies ------------------------------------------------
DevBots.STRATEGIES = {
    // Clicks through the intro and then does nothing at all.
    passive: { pace: 50, teams: {}, buy: [], choose: {} },

    // Floors it.  Minimal safety work, buys every accelerant.
    racer: {
        pace: 100,
        teams: { align: 4, diplo: 2 }, adaptiveDefense: 0.5, keepResearch: 20,
        buy: ['X_Gigawatt', 'X_Assist', 'X_Remote', 'Def_Humanoids', 'Def_Factories', 'X_Million', 'Def_AirGap', 'Def_DNA',
              'Al_Interp', 'Al_Control', 'D_Hotline', 'Def_Shield', 'W_Slaughterbots', 'W_Command'],
        choose: { NQ1: 'NQ1a', Legible: 'Al_Neuralese', Gov: 'D_Sanctions', Open: 'D_Open', Share: 'Al_Classify', NQ2: 'NQ2b', Scheming: 'Al_Patch', Final: 'P_Seize' },
        gamble: true,
    },

    // Alignment-first: moderate pace, big alignment team, adaptive defense.
    aligner: {
        pace: 45,
        teams: { align: 18, diplo: 5 }, adaptiveDefense: 1.0, keepResearch: 12,
        buy: ['Al_Interp', 'X_Assist', 'Al_Control', 'Al_CoT', 'Al_Debate', 'Al_Deliberative', 'Al_AutoAlign', 'Al_ELK', 'Al_CEV',
              'Def_DNA', 'Def_AirGap', 'Def_Watermarks', 'Def_KillSwitch', 'D_Hotline', 'Def_Nuclear', 'Def_Metagenomics', 'Def_FarUVC',
              'Def_Provenance', 'Def_Antivirals', 'Def_RedTeam', 'Def_FactCheck', 'Def_Watchers', 'X_Remote', 'X_Million', 'D_Joint',
              'Def_HITL', 'X_Allies', 'Def_Formal', 'B4', 'P_Pivotal'],
        choose: { NQ1: 'NQ1a', Legible: 'Al_Legible', Gov: 'D_ComputeTreaty', Open: 'D_BanOpen', Share: 'Al_Share', NQ2: 'NQ2a', Scheming: 'Al_Scheming', Final: 'P_Share' },
        gamble: false,
    },

    // Diplomacy-first: slow, lots of diplomats, aims for the Global Pause.
    diplomat: {
        pace: 25,
        teams: { align: 6, diplo: 24 }, adaptiveDefense: 1.0, keepResearch: 10,
        buy: ['D_Hotline', 'X_Assist', 'D_ArmsTalks', 'D_Inspectors', 'D_Joint', 'D_FlexHEG', 'D_Pause', 'Al_Interp', 'Al_Control',
              'Def_DNA', 'Def_AirGap', 'Def_Watermarks', 'Def_KillSwitch', 'Def_HITL', 'Def_Provenance', 'X_Allies', 'Def_Metagenomics',
              'Al_CoT', 'Al_Debate', 'Al_Deliberative', 'Al_AutoAlign', 'Def_Nuclear', 'B4', 'P_PauseForever'],
        choose: { NQ1: 'NQ1b', Legible: 'Al_Legible', Gov: 'D_ComputeTreaty', Open: 'D_BanOpen', Share: 'Al_Share', NQ2: 'NQ2a', Scheming: 'Al_Scheming', Final: 'P_Share' },
        gamble: false,
    },

    // Like the diplomat, but uses the pause to finish alignment and build it together.
    commonwealth: {
        pace: 25,
        teams: { align: 10, diplo: 24 }, adaptiveDefense: 1.0, keepResearch: 8, pauseAllIn: true,
        buy: ['D_Hotline', 'X_Assist', 'Al_Interp', 'D_ArmsTalks', 'D_Inspectors', 'D_Joint', 'D_FlexHEG', 'D_Pause', 'Al_Control',
              'Def_DNA', 'Def_AirGap', 'Def_Watermarks', 'Def_KillSwitch', 'Def_HITL', 'Al_CoT', 'Al_Debate', 'Al_Deliberative',
              'Al_AutoAlign', 'Al_ELK', 'Al_CEV', 'Def_Provenance', 'X_Allies', 'Def_Metagenomics', 'Def_Nuclear', 'P_Together'],
        choose: { NQ1: 'NQ1b', Legible: 'Al_Legible', Gov: 'D_ComputeTreaty', Open: 'D_BanOpen', Share: 'Al_Share', NQ2: 'NQ2a', Scheming: 'Al_Scheming', Final: 'P_Share' },
        gamble: false,
    },

    // Confrontational: sanctions, sabotage, and ready to fight.
    hawk: {
        pace: 80,
        teams: { align: 10, diplo: 0 }, adaptiveDefense: 1.0, keepResearch: 15,
        buy: ['D_Sabotage', 'X_Gigawatt', 'X_Assist', 'Def_Shield', 'W_Slaughterbots', 'W_Command', 'Al_Interp', 'Al_Control',
              'Def_DNA', 'Def_AirGap', 'Def_KillSwitch', 'Def_Watermarks', 'Def_Nuclear', 'Def_Humanoids', 'Def_Factories', 'Al_Debate',
              'Al_Deliberative', 'Al_AutoAlign', 'Def_Metagenomics', 'Def_RedTeam', 'Def_Watchers', 'X_Million', 'Al_ELK', 'Al_CEV', 'P_Pivotal'],
        choose: { NQ1: 'NQ1a', Legible: 'Al_Legible', Gov: 'D_Sanctions', Open: 'D_BanOpen', Share: 'Al_Classify', NQ2: 'NQ2b', Scheming: 'Al_Scheming', Final: 'P_Seize' },
        gamble: false, ceasefire: true,
    },

    // What a thoughtful first-time player might do: a bit of everything.
    balanced: {
        pace: 50,
        teams: { align: 12, diplo: 8 }, adaptiveDefense: 1.0, keepResearch: 12,
        buy: ['Al_Interp', 'D_Hotline', 'X_Assist', 'Def_DNA', 'Def_AirGap', 'Def_Watermarks', 'Def_KillSwitch', 'Al_Control', 'Al_CoT',
              'Al_Debate', 'Def_Nuclear', 'Al_Deliberative', 'Def_Metagenomics', 'Def_Provenance', 'Al_AutoAlign', 'X_Remote', 'Def_HITL',
              'Def_Antivirals', 'Def_RedTeam', 'Def_FactCheck', 'Def_Watchers', 'X_Million', 'Al_ELK', 'Al_CEV', 'D_Joint', 'B4', 'P_Pivotal'],
        choose: { NQ1: 'NQ1b', Legible: 'Al_Legible', Gov: 'D_ComputeTreaty', Open: 'D_BanOpen', Share: 'Al_Share', NQ2: 'NQ2a', Scheming: 'Al_Scheming', Final: 'P_Share' },
        gamble: false, ceasefire: true,
    },

    // A first-time player: sets up teams once, clicks whatever looks good, never fine-tunes.
    novice: {
        pace: 50,
        teams: { align: 10, diplo: 6, bio: 5, cyber: 5, media: 4, robo: 4 }, adaptiveDefense: 0,
        buy: ['P_Pivotal', 'D_Pause', 'P_Together', 'P_Share'], buyAnything: true, randomChoices: true,
        choose: { Final: 'P_Share' }, gamble: true, ceasefire: true,
    },

    // Keeps the peace until the missile shield is up, then picks a fight it can win.
    warlord: {
        pace: 60,
        teams: { align: 14, diplo: 8 }, adaptiveDefense: 1.0, keepResearch: 12, warAfterShield: true,
        buy: ['Al_Interp', 'X_Assist', 'Def_DNA', 'Def_AirGap', 'Def_KillSwitch', 'Def_Watermarks', 'Al_Control', 'Def_Shield',
              'W_Slaughterbots', 'W_Command', 'Al_CoT', 'Al_Debate', 'Al_Deliberative', 'Def_Nuclear', 'Def_Metagenomics', 'Al_AutoAlign',
              'X_Remote', 'Def_RedTeam', 'Def_Watchers', 'Def_Antivirals', 'Def_FactCheck', 'X_Million', 'Al_ELK', 'Al_CEV', 'P_Pivotal'],
        choose: { NQ1: 'NQ1a', Legible: 'Al_Legible', Gov: 'D_ComputeTreaty', Open: 'D_BanOpen', Share: 'Al_Classify', NQ2: 'NQ2b', Scheming: 'Al_Scheming', Final: 'P_Seize' },
        gamble: false, ceasefire: true,
    },
};

// Which option ids belong to which dilemma (for a strategy's `choose` table).
DevBots.DILEMMAS = {
    NQ1: ['NQ1a', 'NQ1b'], Legible: ['Al_Legible', 'Al_Neuralese'], Gov: ['D_ComputeTreaty', 'D_Sanctions', 'D_NoGov'],
    Open: ['D_BanOpen', 'D_Open'], Share: ['Al_Share', 'Al_Classify'], NQ2: ['NQ2a', 'NQ2b'], Scheming: ['Al_Scheming', 'Al_Patch'],
    Final: ['P_Share', 'P_Seize'],
};

DevBots.endgame = function(strategy, overrides){
    var s = Object.assign({}, typeof strategy === 'string' ? DevBots.STRATEGIES[strategy] : strategy, overrides || {});
    var wanted = s.buy || [];
    var chosen = [];
    for (var d in (s.choose || {})) { chosen.push(s.choose[d]); }
    var dilemmaOptions = [];
    for (var d2 in DevBots.DILEMMAS) { dilemmaOptions = dilemmaOptions.concat(DevBots.DILEMMAS[d2]); }
    var log = [];
    function shortId(p){ return p.id.replace('projectButton', ''); }
    function buy(p){ p.effect(); log.push([egDays, shortId(p)]); }

    function tick(){
        if (!Nationalized || endgameResolved) { return; }

        // Intro chain: always click immediately.
        activeProjects.slice().forEach(function(p){ if (/^N(E0|E|I|I2|I3)$/.test(shortId(p)) && p.cost()) { buy(p); } });

        // Pace.
        pacePercent = s.pace;
        var slider = document.getElementById('PaceSlider');
        if (slider) { slider.value = String(s.pace); }

        // Dilemmas and wanted projects.
        activeProjects.slice().forEach(function(p){
            var id = shortId(p);
            if (!p.cost()) { return; }
            if (dilemmaOptions.indexOf(id) >= 0) {
                if (chosen.indexOf(id) >= 0 || (s.randomChoices && Math.random() < 0.02)) { buy(p); }
                return;
            }
            if (s.buyAnything && /^(W_Surrender|W_Nuke|P_Seize|P_PauseForever|D_Sabotage|Def_Surveillance|Def_Censor|Def_Hypnodrones|W_Slaughterbots|W_Command)$/.test(id)) { return; }
            if (s.buyAnything && Math.random() < 0.05) { buy(p); return; }
            if (id === 'P_Gamble') { if (s.gamble && gambleOdds() > 0.6) { buy(p); } return; }
            if (wanted.indexOf(id) >= 0) { buy(p); }
        });
        // Sue for peace if nuclear war is imminent and there's no missile shield.
        if (s.warAfterShield && missileDefense == 1 && warState == 0 && warsFought == 0 && rivalDefeated == 0 && Insights >= 6 && leadOOM > 0 && COOP > 5) {
            // Provoke them: sabotage their datacenters.
            Insights -= 6; rivalAIcapabilities /= 3; COOP = Math.max(0, COOP - 25); log.push([egDays, 'provoke']);
        }
        if (s.ceasefire && warState == 1 && missileDefense == 0 && (fuses.nuclear || 0) > 10
            && activeProjects.indexOf(projectW_Ceasefire) >= 0 && projectW_Ceasefire.cost()) { buy(projectW_Ceasefire); }

        // Teams.
        if (Nat_Research_Flag != 1) { return; }
        var total = Researchers;
        for (var k in teams) { total += teams[k]; }
        var target = { align: 0, diplo: 0, bio: 0, cyber: 0, media: 0, robo: 0 };
        if (Nat_Minefield_Flag == 1) { target.align = s.teams.align || 0; target.diplo = s.teams.diplo || 0; }
        if (s.warAfterShield && missileDefense == 1) { target.diplo = 0; }
        if (paused == 1 && s.pauseAllIn) { target.align = total - target.diplo - 2; }
        if (rogueActive) { target.align = 0; }
        if (Nat_Defense_Flag == 1 && !s.adaptiveDefense) {
            ['bio', 'cyber', 'media', 'robo'].forEach(function(k){ target[k] = s.teams[k] || 0; });
        }
        if (Nat_Defense_Flag == 1 && s.adaptiveDefense && !(paused == 1 && s.pauseAllIn)) {
            var pool = Math.max(0, total - target.align - target.diplo - (s.keepResearch || 0));
            // Experts needed to hold each threat under its next scary threshold (with a margin).
            var need = {}, needSum = 0;
            ['bio', 'cyber', 'media', 'robo'].forEach(function(k){
                var raw = threat[k] + teams[k]*EG.EXPERT_RATE*expert_mod; // threat without any experts
                var cap = raw > 85 ? 70 : 45;
                need[k] = Math.max(0, Math.ceil((raw - cap)/(EG.EXPERT_RATE*expert_mod)));
                needSum += need[k];
            });
            var scale = needSum > pool*s.adaptiveDefense ? (pool*s.adaptiveDefense)/needSum : 1;
            ['bio', 'cyber', 'media', 'robo'].forEach(function(k){ target[k] = Math.floor(need[k]*scale); });
        }
        // When an escaped AI is loose, cyber experts hunt it.
        if (rogueActive) { target.cyber = Math.max(target.cyber, Math.floor((total - target.diplo)*0.5)); }
        for (var a in target) { if (teams[a] > target[a]) { assignTeam(a, target[a] - teams[a]); } }
        for (var b in target) { if (teams[b] < target[b]) { assignTeam(b, Math.min(Researchers, target[b] - teams[b])); } }
    }
    return { tick: tick, log: log };
};

// Run a bot synchronously: call `tick` every `stepMs` of game time until `until()` or `maxMs`.
DevBots.run = function(tick, until, maxMs, stepMs){
    stepMs = stepMs || 500;
    for (var t = 0; t < maxMs; t += stepMs){
        tick();
        if (until()) { return true; }
        simulateMs(stepMs);
    }
    return until();
};

// Same, but in chunks so the browser stays responsive; calls done() at the end.
DevBots.runAsync = function(tick, until, maxMs, stepMs, done){
    var elapsed = 0;
    var wasPaused = gamePaused;
    gamePaused = true;
    (function chunk(){
        var t0 = Date.now();
        try {
            while (Date.now() - t0 < 40 && elapsed < maxMs && !until()){
                tick();
                simulateMs(stepMs);
                elapsed += stepMs;
            }
        } catch (err) {
            gamePaused = wasPaused;
            devStatus("Autoplay error: " + err.message);
            throw err;
        }
        devStatus("Simulating... " + DateCruncher(Days));
        if (elapsed < maxMs && !until()) { setTimeout(chunk, 0); }
        else { gamePaused = wasPaused; renderTick(); devStatus("Done: " + DateCruncher(Days)); if (done) { done(); } }
    })();
};

DevBots.toNationalization = function(done){
    DevBots.runAsync(DevBots.firstHalf(), function(){ return Nationalized; }, 150*60000, 500, function(){
        if (Nationalized) { displayMessage("[dev] Autoplayed to nationalization."); }
        if (done) { done(); }
    });
};

// Autoplay the endgame with a strategy for `days` more days (starting from nationalization).
DevBots.endgameFor = function(strategy, daysToRun, done){
    var go = function(){
        var bot = DevBots.endgame(strategy);
        var stop = egDays + daysToRun;
        DevBots.runAsync(bot.tick, function(){ return endgameResolved || egDays >= stop; }, daysToRun*1000 + 1000, 1000, function(){
            displayMessage("[dev] Autoplayed the endgame as '" + strategy + "' for " + Math.round(daysToRun) + " days.");
            if (done) { done(); }
        });
    };
    if (!Nationalized) { DevBots.toNationalization(go); } else { go(); }
};

// ---- The dev panel ------------------------------------------------------------------------------------
var devState = { open: false };

function devStatus(msg){ var e = document.getElementById("devStatus"); if (e) { e.innerHTML = msg; } }

function devToggle(){
    devState.open = !devState.open;
    var d = document.getElementById("devDiv");
    if (!d) { return; }
    if (devState.open && !d.innerHTML) { devBuild(); }
    d.style.display = devState.open ? "" : "none";
}

function devSpeed(n){
    if (n == 0) { gamePaused = true; } else { gamePaused = false; gameSpeed = n; }
    devStatus(n == 0 ? "Paused" : "Speed " + n + "x");
}

function devCheat(what){
    switch (what){
        case 'money': jFunds += 3000000; GPUs += 1000; break;
        case 'insights': Insights += 100; break;
        case 'researchers': Researchers += 10; break;
        case 'cev': CEV = Math.min(100, CEV + 10); break;
        case 'cevdown': CEV = Math.max(0, CEV - 10); break;
        case 'coop': COOP = Math.min(100, COOP + 10); break;
        case 'coopdown': COOP = Math.max(0, COOP - 10); break;
        case 'defense': ['bio', 'cyber', 'media', 'robo'].forEach(function(k){ defProj[k] += 20; }); break;
        case 'offense': ['bio', 'cyber', 'media', 'robo'].forEach(function(k){ defProj[k] -= 20; }); break;
        case 'grow': AIcapabilities *= 10; break;
        case 'rival': rivalAIcapabilities *= 10; break;
        case 'war': if (Nationalized && !warState) { declareWar(); } break;
        case 'exfil': if (Nationalized && !rogueActive) { selfExfiltrate(); } break;
    }
    devStatus("Cheat: " + what);
    renderTick();
}

function devPreviewEnding(){
    var id = document.getElementById("devEndingSelect").value;
    showEndingScreen(id);
}

function devBuild(){
    var d = document.getElementById("devDiv");
    var endingOptions = ENDING_ORDER.map(function(k){ return '<option value="' + k + '">' + ENDINGS[k].title + ' (' + k + ')</option>'; }).join('');
    var strategies = Object.keys(DevBots.STRATEGIES).map(function(k){ return '<option value="' + k + '">' + k + '</option>'; }).join('');
    d.innerHTML =
        '<b>Dev tools</b> <span style="float:right"><a href="#" onclick="devToggle();return false;">close</a></span><br />' +
        '<span id="devStatus" class="small">(press ` to toggle)</span><hr>' +
        'Speed: <button onclick="devSpeed(0)">pause</button><button onclick="devSpeed(1)">1x</button><button onclick="devSpeed(3)">3x</button>' +
        '<button onclick="devSpeed(10)">10x</button><button onclick="devSpeed(30)">30x</button><br />' +
        'Skip ahead: <button onclick="simulateMs(60000);renderTick()">+1 min</button><button onclick="simulateMs(300000);renderTick()">+5 min</button><br /><hr>' +
        '<b>Jump ahead with the autoplay bot</b><br />' +
        '<button onclick="DevBots.toNationalization()">Autoplay to Nationalization</button><br />' +
        'Then play the endgame as <select id="devStrategy">' + strategies + '</select><br />' +
        '<button onclick="DevBots.endgameFor(document.getElementById(\'devStrategy\').value, 40)">intro only</button>' +
        '<button onclick="DevBots.endgameFor(document.getElementById(\'devStrategy\').value, 300)">+300 days</button>' +
        '<button onclick="DevBots.endgameFor(document.getElementById(\'devStrategy\').value, 800)">+800 days</button>' +
        '<button onclick="DevBots.endgameFor(document.getElementById(\'devStrategy\').value, 99999)">to the end</button><br /><hr>' +
        '<b>Cheats</b><br />' +
        '<button onclick="devCheat(\'money\')">+$3M +1000 GPUs</button><button onclick="devCheat(\'insights\')">+100 insights</button>' +
        '<button onclick="devCheat(\'researchers\')">+10 researchers</button><br />' +
        '<button onclick="devCheat(\'cev\')">CEV +10</button><button onclick="devCheat(\'cevdown\')">CEV -10</button>' +
        '<button onclick="devCheat(\'coop\')">COOP +10</button><button onclick="devCheat(\'coopdown\')">COOP -10</button><br />' +
        '<button onclick="devCheat(\'defense\')">all threats -20</button><button onclick="devCheat(\'offense\')">all threats +20</button><br />' +
        '<button onclick="devCheat(\'grow\')">your AI x10</button><button onclick="devCheat(\'rival\')">rival AI x10</button><br />' +
        '<button onclick="devCheat(\'war\')">start a war</button><button onclick="devCheat(\'exfil\')">AI escapes</button><br /><hr>' +
        '<b>Endings</b><br /><select id="devEndingSelect">' + endingOptions + '</select><br />' +
        '<button onclick="devPreviewEnding()">Preview ending screen</button> <button onclick="triggerEnding(document.getElementById(\'devEndingSelect\').value)">Trigger it</button><br /><hr>' +
        '<button onclick="saveGame();devStatus(\'Saved\')">Save now</button> <button onclick="resetGame()">Reset game</button>';
}

document.addEventListener('keydown', function(e){
    if (e.key === '`' && !(e.target && /input|textarea|select/i.test(e.target.tagName || ''))) { devToggle(); }
});
if (/[?&]dev=1/.test(window.location.search || '')) { devToggle(); }
