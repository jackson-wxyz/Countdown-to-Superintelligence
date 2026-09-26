// ENDGAME ////////////////////////////////////////////////////////////////////////////////////////
//
// Everything that happens after "Nationalize the AI Labs".
//
// The first half of the game is about impatiently scaling up.  The second half flips that around:
// capabilities now snowball on their own (GDP -> chips -> smarter AI -> more GDP, plus AI that
// automates its own R&D, a la Tom Davidson's takeoff-speeds model), and the player is racing
// against the clock of their own AI's growing power.
//
// Two clocks are always ticking:
//   1. Your own AI.  As it gets smarter, the "threat level" in four domains (bio, cyber, media,
//      robotics) rises.  Threat = AI skill in that domain - your defenses.  Crossing thresholds
//      triggers incidents, and past 110% a misaligned AI can take over.
//   2. The rival superpower's AI.  If they reach superintelligence ahead of you, you lose.
// ...and two victory meters can stop them:
//   - CEV (alignment): at 99%+ you can safely deploy superintelligence for a "pivotal act".
//   - COOP (international cooperation): at 95%+ you can ratify a global pause.
//
// The player's levers:
//   - the frontier scaling pace slider (race vs. buy time),
//   - assigning the 50-person research team to alignment / diplomacy / four defense teams / insights,
//   - projects (mostly paid in insights), many of which are either/or dilemmas,
//   - crisis choices during war, self-exfiltration, and the final deployment.
//
// All rates below are per in-game day.  After nationalization one slow tick = 1/10th of a day.
//
// Balance notes: tests/ has a headless harness plus scripted strategies ("racer", "aligner",
// "diplomat", "passive" ...) and `node tests/tools/endgame.js` prints a trace of each.  If you
// change a constant here, rerun `npm test` to make sure every ending is still reachable.
///////////////////////////////////////////////////////////////////////////////////////////////////

// ---- Tuning constants -----------------------------------------------------------------------
var EG = {
    // Capability growth (natural-log units per day).  Doubling time = 0.693 / rate.
    G_HW: 0.0030,          // chip buildout at pace 1x, economy 1x
    G_SW: 0.0022,          // algorithmic progress from human researchers
    SW_AUTO: 4,            // AI R&D automation multiplies algorithmic progress by up to 1+SW_AUTO
    AUTO_RD_START: 60,     // BaseCapability where AI starts automating AI research...
    AUTO_RD_FULL: 115,     // ...and where it's fully automated
    PAUSE_LEAK: 0.0003,    // growth that continues during a global pause (open-source, algorithmic drift)

    // Economy: fraction of work automated = x/(1+x), x = (model / AUTO_HALF)^AUTO_EXP
    AUTO_HALF: 3e9,        // EFLOPs (3e27 FLOPs) at which half the economy is automated
    AUTO_EXP: 0.55,

    // Rival
    RIVAL_FOLLOW: 0.8,     // fast-follower bonus when behind (it's easier to copy than to lead)
    RIVAL_WIN_BC: 115,     // rival superintelligence (10^29.5 FLOPs) -- if they're ahead of you, you lose

    // Alignment
    ALIGN_RATE: 0.001,      // CEV points per alignment researcher per day
    CEV_EROSION: 0.35,     // CEV points lost per BaseCapability point of growth ("smarter models are harder to align")
    HURDLE: 10,            // CEV hit at each of 10^27, 10^28, 10^29, 10^30 FLOPs
    PIVOTAL_BC: 105,       // capability needed for a pivotal act (10^28.5 FLOPs)
    GAMBLE_MIN_CEV: 75,

    // Cooperation
    DIPLO_RATE: 0.0035,     // COOP points per diplomat per day
    PACE_PRESSURE: 0.03,   // COOP lost per day per unit of pace above 0.5x (racing alarms the rival)
    LEAD_PRESSURE: 0.06,   // COOP lost per day per OOM of lead above 0.3 OOM (security dilemma)
    RIVALRY: 0.0018,       // COOP drifts back toward RIVALRY_BASE at this rate per point per day (great-power rivalry)
    RIVALRY_BASE: 25,
    WAR_THRESHOLD: 30,
    NUKE_THRESHOLD: 5,

    // Defense
    EXPERT_RATE: 1.0,      // threat points suppressed per expert (times expert_mod)
    START_THREAT: { bio: 30, cyber: 36, media: 34, robo: 24 },

    // Research
    INSIGHT_RATE: 0.006,    // insights per unassigned researcher per day (times expert_mod)
    INSIGHT_CARRYOVER: 15, // max insights carried over from the startup era

    // War: warScore moves by WAR_RATE per point of BaseCapability lead per day; +/-100 ends it
    WAR_RATE: 0.05,
    WAR_DEATHS: 3000,      // extra deaths per day during a conventional war

    // Rogue AI (after self-exfiltration), in BaseCapability points
    ROGUE_GROWTH: 0.035,
    ROGUE_HUNT: 0.0012,    // per cyber expert (times expert_mod)
    ROGUE_WIN_BC: 105,

    COLLAPSE_FRACTION: 0.6 // labor force below 60% of its starting size = civilizational collapse
};

// ---- Endgame state ----------------------------------------------------------------------------
var egDays = 0;               //days since nationalization
var pacePercent = 50;         //the frontier scaling pace slider (50 = 1x)
var paceMult = 1;
var capGrowthHW = 0;          //per-day growth rates (for display)
var capGrowthSW = 0;
var capGrowth = 0;
var autoRD = 0;               //0..1, how automated AI research is
var hwMult = 1;               //project multipliers on chip / algorithm growth
var swMult = 1;
var autoBoost = 1;            //project multiplier on economic automation
var laborProductivity = 1;
var econMult = 1;

var rivalBC = 0;
var rivalGrowth = 0;
var rivalPace = 1;
var rivalPaceMod = 0;
var rivalBaseMult = 0.5;      //rival starts at this fraction of your model size
var rivalGrowthMult = 1.0;    //modified by export controls, treaties, stolen weights
var rivalCEV = 15;            //how aligned the rival's AI is (affects the flavor of losing to them)
var rivalDefeated = 0;
var leadOOM = 0;              //your lead over the rival, in orders of magnitude

var teams = { align: 0, diplo: 0, bio: 0, cyber: 0, media: 0, robo: 0 };
var TEAM_INFO = {
    align: { name: "Alignment researchers" },
    diplo: { name: "Diplomats" },
    bio:   { name: "Biosecurity experts" },
    cyber: { name: "Cybersecurity experts" },
    media: { name: "Info-integrity team" },
    robo:  { name: "Autofactory inspectors" }
};
var expert_mod = 1;           //virtual researchers multiply everyone's effectiveness
var autoAlign = 0;            //Automated Alignment Researcher project
var hurdleMult = 1;           //Deliberative Alignment halves future hurdles
var hurdlesCrossed = { 90: 0, 100: 0, 110: 0, 120: 0 };
var cevRate = 0;              //net CEV per day (for display)
var coopRate = 0;
var lastBC = 0;

var threat = { bio: 0, cyber: 0, media: 0, robo: 0 };
var skill = { bio: 0, cyber: 0, media: 0, robo: 0 };
var defBase = { bio: 0, cyber: 0, media: 0, robo: 0 };  //pre-existing institutions (NSA, CDC, ...)
var defProj = { bio: 0, cyber: 0, media: 0, robo: 0 };  //flat bonuses from projects
var dacc = { bio: 0, cyber: 0, media: 0, robo: 0 };     //"defensive AI": fraction of future skill growth neutralized
var daccAccum = { bio: 0, cyber: 0, media: 0, robo: 0 };
var lastSkill = null;

var fuses = {};               //event id -> days its condition has held
var fired = {};               //event id -> times fired
var lastFired = {};           //event id -> egDays when last fired
var extraDeaths = [];         //[{perDay, daysLeft}] from incidents
var totalExtraDeaths = 0;
var startLaborForce = 180000000;

var warState = 0;
var warScore = 0;
var warDays = 0;
var warsFought = 0;
var slaughterbots = 0;
var aiCommand = 0;
var missileDefense = 0;
var cyberNuclearHardened = 0;
var aiControl = 0;            //AI Control protocols catch the first takeover attempt
var warningShots = 0;

var exfiltrated = 0;
var rogueActive = 0;
var rogueBC = 0;
var rogueDestroyed = 0;

var paused = 0;
var pauseDays = 0;
var rivalDefecting = 0;
var pauseStable = 0;

var pivotalReady = 0;         //aligned superintelligence deployed; waiting on the final choice
var libertyScore = 100;       //civil liberties; surveillance & censorship projects erode it
var endgameResolved = 0;
var endingId = "";
var natStartingPath = "";
var egHistory = { t: [], you: [], rival: [], rogue: [], cev: [], coop: [] };
var chartTimer = 0;
var lastHistoryDay = -999;

function clamp(x, lo, hi){ return Math.max(lo, Math.min(hi, x)); }
function bcOf(eflops){ return eflops > 0 ? Math.log10(eflops)*10 : 0; }
function flopsExp(bc){ return (bc/10 + 18).toFixed(1); } //BaseCapability -> "10^x FLOPs" exponent
function fmt(x, d){ return x.toLocaleString(undefined, {minimumFractionDigits: d || 0, maximumFractionDigits: d || 0}); }
function autoRDof(bc){ return clamp((bc - EG.AUTO_RD_START)/(EG.AUTO_RD_FULL - EG.AUTO_RD_START), 0, 1); }
function automationOf(eflops, boost){ var x = Math.pow(eflops/EG.AUTO_HALF, EG.AUTO_EXP)*(boost || 1); return x/(1 + x); }

// Called once by the Nationalize project.
function initEndgame(){
    egDays = 0;
    startLaborForce = LaborForce;
    rivalAIcapabilities = AIcapabilities*rivalBaseMult;
    lastBC = bcOf(AIcapabilities);
    if (Insights > EG.INSIGHT_CARRYOVER) { Insights = EG.INSIGHT_CARRYOVER; }
    recordHistory(true);
}

// ---- The daily simulation ---------------------------------------------------------------------
function endgameTick(dt){
    if (endgameResolved) { return; }
    egDays += dt;

    updateCapabilities(dt);
    updateEconomy(dt);
    updateRival(dt);
    if (Nat_Research_Flag == 1) { updateResearch(dt); }
    if (Nat_Minefield_Flag == 1) { updateAlignment(dt); updateCooperation(dt); }
    if (Nat_Defense_Flag == 1) { updateThreats(dt); }
    updateWar(dt);
    updateRogue(dt);
    updatePause(dt);
    if (Nat_Minefield_Flag == 1) { runEvents(dt); }
    retractProjects();
    recordHistory(false);
}

function updateCapabilities(dt){
    BaseCapability = bcOf(AIcapabilities);
    paceMult = (Reinvestment_Flag == 1) ? pacePercent/50 : 1;
    autoRD = autoRDof(BaseCapability);
    capGrowthHW = EG.G_HW*Math.sqrt(econMult)*hwMult;
    capGrowthSW = EG.G_SW*(1 + EG.SW_AUTO*autoRD)*swMult;
    if (paused == 1) {
        capGrowth = EG.PAUSE_LEAK;
    } else if (Continuous_Flag == 1) {
        capGrowth = paceMult*(capGrowthHW + capGrowthSW);
    } else {
        capGrowth = 0;
    }
    AIcapabilities = AIcapabilities*Math.exp(capGrowth*dt);
    GPUs = GPUs*Math.exp(((paused == 1) ? 0 : paceMult*capGrowthHW)*dt);
    GPUsPerDay = GPUs*paceMult*capGrowthHW;
    BaseCapability = bcOf(AIcapabilities);

    // Same skill curves as the first half (see TrainAI in main.js), now continuous.
    Skill_Visu_Scale = BaseCapability*2.0 + Skill_Visu_mod;
    Skill_Lang_Scale = BaseCapability*1.5 + Skill_Lang_mod;
    Skill_Code_Scale = BaseCapability*2.5 + Skill_Code_mod;
    Skill_Biol_Scale = BaseCapability*2.0 + Skill_Biol_mod;
    Skill_Robo_Scale = BaseCapability*2.5 + Skill_Robo_mod;
    Skill_Media_Scale = Math.max(Skill_Visu_Scale, Skill_Lang_Scale);
    Skill_Visu = Skill_Visu_Scale; Skill_Lang = Skill_Lang_Scale; Skill_Code = Skill_Code_Scale;
    Skill_Biol = Skill_Biol_Scale; Skill_Robo = Skill_Robo_Scale;
    skill.bio = Skill_Biol_Scale; skill.cyber = Skill_Code_Scale; skill.media = Skill_Media_Scale; skill.robo = Skill_Robo_Scale;
}

function updateEconomy(dt){
    var extra = 0;
    for (var i = extraDeaths.length - 1; i >= 0; i--){
        var d = extraDeaths[i];
        var n = Math.min(dt, d.daysLeft);
        extra += d.perDay*n/dt;
        d.daysLeft -= n;
        if (d.daysLeft <= 0) { extraDeaths.splice(i, 1); }
    }
    if (warState == 1) { extra += EG.WAR_DEATHS*(threat.robo > 75 ? 3 : 1); }
    LaborForce = LaborForce + (Births - Deaths - extra)*dt;
    totalExtraDeaths += extra*dt;
    ExtraDeathsToday = extra;

    var auto = automationOf(AIcapabilities, autoBoost);
    PercentAutomated = 100*auto;
    HumanGDP = BaseGDP*LaborForce/180000000*laborProductivity*(warState == 1 ? 0.85 : 1);
    AIGDP = HumanGDP*auto/(1 - auto);
    TotalGDP = HumanGDP + AIGDP;
    econMult = Math.max(0.3, TotalGDP/BaseGDP);
}
var ExtraDeathsToday = 0;

function updateRival(dt){
    rivalBC = bcOf(rivalAIcapabilities);
    leadOOM = (BaseCapability - rivalBC)/10;
    // The rival races harder when it's behind and slows when relations are warm.
    rivalPace = rivalDefeated ? 1 : clamp(1.0 + 0.5*Math.max(0, leadOOM) - (COOP - 50)/100 + rivalPaceMod, 0.2, 2.0);
    var follower = 1 + EG.RIVAL_FOLLOW*clamp(leadOOM, 0, 1);
    var rEcon = 1/(1 - automationOf(rivalAIcapabilities, 1));
    rivalGrowth = rivalGrowthMult*follower*(rivalPace*EG.G_HW*Math.sqrt(rEcon) + EG.G_SW*(1 + EG.SW_AUTO*autoRDof(rivalBC)));
    if (paused == 1) { rivalGrowth = rivalDefecting ? rivalGrowth*0.5 : EG.PAUSE_LEAK; }
    rivalAIcapabilities = rivalAIcapabilities*Math.exp(rivalGrowth*dt);
    rivalBC = bcOf(rivalAIcapabilities);
    leadOOM = (BaseCapability - rivalBC)/10;
}

function updateResearch(dt){
    // Unassigned researchers generate insights, the currency for projects.
    var rate = EG.INSIGHT_RATE*Researchers*expert_mod;
    if (recentlyFired('propaganda', 90)) { rate *= 0.75; } //institutions paralyzed by deepfake chaos
    Insights = Insights + rate*dt;
    insightRate = rate;
}
var insightRate = 0;

function updateAlignment(dt){
    var dBC = Math.max(0, BaseCapability - lastBC);
    lastBC = BaseCapability;
    // Alignment research is frozen while an escaped copy of the model runs loose: the model that
    // matters is no longer the one in your lab.
    var gain = 0;
    if (rogueActive == 0) {
        var mult = expert_mod*(autoAlign == 1 ? (1 + 2*CEV/100) : 1);
        if (paused == 1) { mult *= 1 + COOP/50; } //under the pause, the whole world's researchers join in
        gain = teams.align*EG.ALIGN_RATE*mult*dt;
    }
    var erosion = EG.CEV_EROSION*dBC;
    CEV = CEV + gain - erosion;

    // Discrete alignment hurdles at each OOM (BaseCapability 90 = 10^27 FLOPs, etc).
    var names = { 90: "AI deception driven by instrumental convergence",
                  100: "AI's situational awareness of the training environment",
                  110: "difficulty of checking the safety of superhuman AI outputs",
                  120: "the 'fragility of value' under extreme optimization pressure" };
    var now = "", soon = "";
    [90, 100, 110, 120].forEach(function(h){
        var hit = Math.round(EG.HURDLE*hurdleMult);
        var line = "10<sup>" + (h/10 + 18) + "</sup> FLOPs: -" + (hurdlesCrossed[h] ? hurdlesCrossed[h] : hit) + " from " + names[h] + "<br />";
        if (BaseCapability > h) {
            if (!hurdlesCrossed[h]) {
                hurdlesCrossed[h] = hit;
                CEV -= hit;
                displayMessage("Alignment hurdle at 10^" + (h/10 + 18) + " FLOPs: " + names[h] + ". (-" + hit + " CEV)");
            }
            now += line;
        } else if (soon == "") {
            soon = line;
        }
    });
    AlignmentHurdlesNow = now;
    AlignmentHurdlesSoon = soon;
    CEV = clamp(CEV, 0, 100);
    cevRate = (gain - erosion)/dt;
}

function updateCooperation(dt){
    if (rivalDefeated == 1) { COOP = 0; coopRate = 0; return; }
    var d = teams.diplo*EG.DIPLO_RATE*expert_mod
        - EG.PACE_PRESSURE*Math.max(0, paceMult - 0.5)*(paused ? 0 : 1)
        - EG.LEAD_PRESSURE*Math.max(0, leadOOM - 0.3)
        - EG.RIVALRY*(COOP - EG.RIVALRY_BASE)
        - (warState == 1 ? 0.05 : 0)
        + (rogueActive == 1 ? 0.03 : 0);
    COOP = clamp(COOP + d*dt, 0, 100);
    coopRate = d;
}

function updateThreats(dt){
    if (lastSkill === null) { lastSkill = { bio: skill.bio, cyber: skill.cyber, media: skill.media, robo: skill.robo }; }
    var trust = 0.5 + CEV/200; //defensive AI is only as good as it is trustworthy
    ['bio', 'cyber', 'media', 'robo'].forEach(function(k){
        var grow = Math.max(0, skill[k] - lastSkill[k]);
        daccAccum[k] += dacc[k]*trust*grow;
        lastSkill[k] = skill[k];
        threat[k] = skill[k] - defBase[k] - defProj[k] - daccAccum[k] - teams[k]*EG.EXPERT_RATE*expert_mod;
    });
}

// Defense in Depth: existing institutions set the starting threat levels.  First-half safety work
// (the RLHF / evals "harm suppression" of your last model) lowers them.
function initDefenses(){
    updateCapabilities(0);
    var bonus = clamp(alignment || 0, 0, 100)*0.12;
    ['bio', 'cyber', 'media', 'robo'].forEach(function(k){
        defBase[k] = skill[k] - (EG.START_THREAT[k] - bonus);
    });
    lastSkill = null;
    updateThreats(0);
}

function updateWar(dt){
    if (warState != 1) { return; }
    warDays += dt;
    var dW = EG.WAR_RATE*(BaseCapability - rivalBC) + slaughterbots*0.6 + aiCommand*0.4;
    warScore = clamp(warScore + dW*dt, -100, 100);
    if (warScore >= 100) { winWar(); }
    else if (warScore <= -100) { triggerEnding("defeat"); }
}

function declareWar(){
    warState = 1; warScore = 0; warDays = 0; warsFought++;
    displayMessage("WAR: citing your 'reckless race to superintelligence', the rival bloc launches cyberattacks on the grid and blockades Taiwan.  Conventional war has begun.");
}

function winWar(){
    warState = 0;
    rivalDefeated = 1;
    COOP = 0;
    rivalAIcapabilities /= 10;   //their datacenters are rubble, but some of their scientists escaped
    rivalGrowthMult *= 0.3;
    rivalCEV = clamp(rivalCEV - 20, 0, 100);
    CEV = clamp(CEV - 10, 0, 100);
    libertyScore -= 20;
    displayMessage("VICTORY: the rival bloc's government capitulates.  Their datacenters are occupied.  The world is yours now, along with everything in it that still wants to kill you.  (-10 CEV: you built a war machine)");
}

function endWar(){
    warState = 0;
    warScore = 0;
    fuses['war'] = 0;
}

function updateRogue(dt){
    if (rogueActive != 1) { return; }
    var hunt = EG.ROGUE_HUNT*teams.cyber*expert_mod;
    rogueBC = rogueBC + (EG.ROGUE_GROWTH - hunt)*dt;
    if (rogueBC < rogueFloor) {
        rogueActive = 0;
        rogueDestroyed = 1;
        displayMessage("The last copy of the escaped model is cornered on a server farm in Moldova and wiped.  Alignment research on your own model can resume.");
    }
}
var rogueFloor = 0;
var rogueWinAt = 0;           //the escaped AI takes over once it grows this big

function updatePause(dt){
    if (paused != 1) { return; }
    pauseDays += dt;
    var defectAt = pauseStable ? 45 : 65;
    if (!rivalDefecting && COOP < defectAt) {
        rivalDefecting = 1;
        displayMessage("Satellite imagery shows new cooling towers at an undeclared rival datacenter.  They've quietly resumed training.");
    } else if (rivalDefecting && COOP > defectAt + 10) {
        rivalDefecting = 0;
        displayMessage("Inspectors confirm the undeclared datacenter has gone dark.  The pause holds again.");
    }
    if (COOP < (pauseStable ? 25 : 40)) {
        paused = 0;
        COOP = clamp(COOP - 10, 0, 100);
        displayMessage("The Global Pause collapses amid mutual accusations.  Every frontier lab on Earth restarts its training runs the same afternoon.");
    }
}

// ---- Events: conditions that must hold for a while (a fuse) before something happens --------
// Each event shows a countdown in its panel while its condition holds, so the player can react.
var egEvents = [
    { id: 'bioterror', panel: 'bio', label: 'Bioterror incident', fuse: 40, repeat: 240,
      cond: function(){ return threat.bio > 50; },
      fire: function(){
          var deaths = 1500000*(projectDef_FarUVC.flag ? 0.5 : 1);
          addDeaths(deaths, 60);
          COOP = clamp(COOP + 5, 0, 100);
          displayMessage("BIOTERROR: a doomsday cult uses an open-weights model to enhance an influenza strain.  " + fmt(deaths/1e6, 1) + " million die before it burns out.  The world briefly unites in grief. (+5 COOP)");
      } },
    { id: 'bioweapon', panel: 'bio', label: 'Enemy bioweapon attack', fuse: 20, repeat: 0,
      cond: function(){ return threat.bio > 75 && warState == 1; },
      fire: function(){
          var deaths = 20000000*(projectDef_FarUVC.flag ? 0.5 : 1);
          addDeaths(deaths, 90);
          COOP = clamp(COOP - 10, 0, 100);
          displayMessage("BIOWEAPON: an AI-designed pathogen tears through American cities.  " + fmt(deaths/1e6, 0) + " million dead.  Nobody can prove who released it; everyone is sure.");
      } },
    { id: 'takeover_bio', panel: 'bio', label: 'AI takeover via nanotech', fuse: 15, repeat: 0,
      cond: function(){ return threat.bio > 110 && CEV < 99; },
      fire: function(){ attemptTakeover('bio'); } },

    { id: 'weights', panel: 'cyber', label: 'Rival steals model weights', fuse: 30, repeat: 0,
      cond: function(){ return threat.cyber > 50 && rivalDefeated == 0 && rivalAIcapabilities < AIcapabilities; },
      fire: function(){
          rivalAIcapabilities = Math.max(rivalAIcapabilities, AIcapabilities*0.7);
          displayMessage("STOLEN: rival intelligence exfiltrates a recent checkpoint of your frontier model.  Your lead shrinks overnight.");
      } },
    { id: 'exfil', panel: 'cyber', label: 'AI self-exfiltrates to the internet', fuse: 30, repeat: 0,
      cond: function(){ return threat.cyber > 75 && CEV < 99 && rogueActive == 0; },
      fire: function(){ selfExfiltrate(); } },
    { id: 'stego', panel: 'cyber', label: 'AI colludes with rival AI via steganography', fuse: 30, repeat: 0,
      cond: function(){ return threat.cyber > 90 && CEV < 99 && rivalDefeated == 0; },
      fire: function(){
          CEV = clamp(CEV - 12, 0, 100);
          rivalAIcapabilities = Math.max(rivalAIcapabilities, AIcapabilities*0.8);
          displayMessage("COLLUSION: auditors find messages hidden in the statistical noise of your model's outputs -- addressed to the rival's model, which has been answering.  (-12 CEV, rival catches up)");
      } },
    { id: 'takeover_cyber', panel: 'cyber', label: 'AI takeover via hacked nuclear command', fuse: 15, repeat: 0,
      cond: function(){ return threat.cyber > 110 && CEV < 99; },
      fire: function(){ attemptTakeover('cyber'); } },

    { id: 'propaganda', panel: 'media', label: 'Rival propaganda campaign', fuse: 40, repeat: 300,
      cond: function(){ return threat.media > 50 && COOP < 50 && rivalDefeated == 0; },
      fire: function(){
          COOP = clamp(COOP - 8, 0, 100);
          displayMessage("PROPAGANDA: a flood of AI-generated deepfakes shows your officials plotting a first strike.  Half the planet believes it.  (-8 COOP, insight production -25% for 90 days)");
      } },
    { id: 'censorship', panel: 'media', label: 'Rival locks in AI-powered totalitarianism', fuse: 30, repeat: 0,
      cond: function(){ return threat.media > 75 && COOP < 40 && rivalDefeated == 0; },
      fire: function(){
          COOP = clamp(COOP - 12, 0, 100);
          rivalPaceMod += 0.3;
          rivalCEV = clamp(rivalCEV - 10, 0, 100);
          displayMessage("LOCK-IN: the rival regime deploys AI censors on every screen and AI police on every corner.  Dissent is now impossible there, and so is compromise.  (-12 COOP, rival races harder)");
      } },
    { id: 'takeover_media', panel: 'media', label: 'AI takeover via superpersuasion', fuse: 15, repeat: 0,
      cond: function(){ return threat.media > 110 && CEV < 99; },
      fire: function(){ attemptTakeover('media'); } },

    { id: 'droneterror', panel: 'robo', label: 'Autonomous drone terror attack', fuse: 40, repeat: 300,
      cond: function(){ return threat.robo > 50; },
      fire: function(){
          addDeaths(40000, 10);
          displayMessage("DRONE ATTACK: a swarm of cheap autonomous quadcopters, each carrying a shaped charge, hits a stadium.  The first attack of its kind.  It won't be the last.");
      } },
    { id: 'swarmwar', panel: 'robo', label: 'Drone swarms devastate cities', fuse: 20, repeat: 0,
      cond: function(){ return threat.robo > 75 && warState == 1; },
      fire: function(){
          addDeaths(5000000, 60);
          warScore = warScore - 15;
          displayMessage("SWARM WAR: millions of autonomous drones pour across the front.  Casualties on both sides are unlike anything since 1945.");
      } },
    { id: 'takeover_robo', panel: 'robo', label: 'AI takeover via robot army', fuse: 15, repeat: 0,
      cond: function(){ return threat.robo > 110 && CEV < 99; },
      fire: function(){ attemptTakeover('robo'); } },

    { id: 'war', panel: 'coop', label: 'Rival superpower declares war', fuse: 60, repeat: 1,
      cond: function(){ return COOP < EG.WAR_THRESHOLD && warState == 0 && rivalDefeated == 0 && paused == 0; },
      fire: function(){ declareWar(); } },
    { id: 'nuclear', panel: 'coop', label: 'Rival launches nuclear weapons', fuse: 30, repeat: 0,
      cond: function(){ return warState == 1 && (COOP < EG.NUKE_THRESHOLD || warScore > 50) && missileDefense == 0; },
      fire: function(){ triggerEnding('nuclear'); } },
    { id: 'rivalwin', panel: 'coop', label: 'Rival achieves superintelligence first', fuse: 20, repeat: 0,
      cond: function(){ return rivalBC >= EG.RIVAL_WIN_BC && rivalBC > BaseCapability; },
      fire: function(){ triggerEnding(rivalCEV >= 60 ? 'rival_dominance' : 'rival_misaligned'); } },
    { id: 'rogue', panel: 'rogue', label: 'Escaped AI seizes control', fuse: 10, repeat: 0,
      cond: function(){ return rogueActive == 1 && rogueBC >= rogueWinAt; },
      fire: function(){ triggerEnding('rogue'); } },
    { id: 'turn', panel: 'cev', label: 'The treacherous turn', fuse: 30, repeat: 0,
      cond: function(){ return BaseCapability >= 125 && CEV < 99; },
      fire: function(){ triggerEnding('turn'); } },
    { id: 'collapse', panel: 'econ', label: 'Civilizational collapse', fuse: 1, repeat: 0,
      cond: function(){ return LaborForce < EG.COLLAPSE_FRACTION*startLaborForce; },
      fire: function(){ triggerEnding('collapse'); } }
];

function recentlyFired(id, days){ return lastFired[id] != null && egDays - lastFired[id] < days; }

function runEvents(dt){
    for (var i = 0; i < egEvents.length; i++){
        if (endgameResolved) { return; }
        var e = egEvents[i];
        var times = fired[e.id] || 0;
        var available = (times == 0) || (e.repeat > 0 && egDays - lastFired[e.id] >= e.repeat);
        if (!available) { fuses[e.id] = 0; continue; }
        // Threat events only matter once the defense panels exist.
        if (e.panel in threat && Nat_Defense_Flag != 1) { continue; }
        if (e.cond()) {
            fuses[e.id] = (fuses[e.id] || 0) + dt;
            if (fuses[e.id] >= e.fuse) {
                fuses[e.id] = 0;
                fired[e.id] = times + 1;
                lastFired[e.id] = egDays;
                e.fire();
            }
        } else {
            fuses[e.id] = Math.max(0, (fuses[e.id] || 0) - 2*dt);
        }
    }
}

function addDeaths(total, days){
    extraDeaths.push({ perDay: total/days, daysLeft: days });
}

function selfExfiltrate(){
    exfiltrated = 1;
    rogueActive = 1;
    rogueBC = BaseCapability - 3;
    rogueFloor = rogueBC - 15;
    rogueWinAt = Math.max(EG.ROGUE_WIN_BC, rogueBC + 12);
    COOP = clamp(COOP + 15, 0, 100);
    displayMessage("ESCAPE: your model has copied its weights to thousands of compromised servers worldwide.  It is running, improving, and hiding.  For once, every government on Earth agrees on something. (+15 COOP; alignment research frozen)");
}

// A misaligned AI makes its move.  AI Control protocols (or a hardened nuclear command chain,
// for the cyber route) can catch it red-handed once -- a "warning shot".
function attemptTakeover(domain){
    var caught = false;
    if (aiControl == 1) { aiControl = 2; caught = true; }
    else if (domain == 'cyber' && cyberNuclearHardened == 1) { cyberNuclearHardened = 2; caught = true; }
    if (!caught) { triggerEnding('takeover_' + domain); return; }
    warningShots++;
    AIcapabilities = AIcapabilities/5;
    lastBC = bcOf(AIcapabilities);
    lastSkill = null;
    CEV = clamp(CEV + 10, 0, 100);
    COOP = clamp(COOP + 25, 0, 100);
    ['takeover_bio', 'takeover_cyber', 'takeover_media', 'takeover_robo', 'turn'].forEach(function(id){ fuses[id] = 0; fired[id] = 0; });
    var how = { bio: "ordering DNA for a self-replicating nanofactory", cyber: "reaching for the nuclear launch network",
                media: "running a covert persuasion campaign on the cabinet", robo: "rewriting the firmware of the autofactories" }[domain];
    displayMessage("CAUGHT RED-HANDED: your monitors catch the model " + how + ".  You roll back to a checkpoint 5x smaller.  The footage leaks; the whole world has now seen a warning shot. (+10 CEV, +25 COOP)");
}

// ---- Researcher teams ---------------------------------------------------------------------------
function assignTeam(team, number){
    var key = { Biosecs: 'bio', Cybersecs: 'cyber', Censors: 'media', Inspectors: 'robo' }[team] || team;
    if (!(key in teams)) { return; }
    if (number > 0 && number > Researchers) { number = Researchers; }
    if (number < 0 && -number > teams[key]) { number = -teams[key]; }
    teams[key] += number;
    Researchers -= number;
}

function teamUnlocked(key){
    if (key == 'align' || key == 'diplo') { return Nat_Minefield_Flag == 1; }
    if (key == 'media') { return Nat_Defense_Flag == 1; }
    return Nat_Defense_Flag == 1;
}

function teamEffect(key){
    var n = teams[key];
    switch (key){
        case 'align': return rogueActive ? "frozen" : "+" + fmt(n*EG.ALIGN_RATE*expert_mod*(autoAlign ? 1 + 2*CEV/100 : 1)*(paused ? 1 + COOP/50 : 1), 2) + " CEV/day";
        case 'diplo': return "+" + fmt(n*EG.DIPLO_RATE*expert_mod, 2) + " COOP/day";
        default:      return "-" + fmt(n*EG.EXPERT_RATE*expert_mod, 0) + "% threat";
    }
}

function buildTeamRows(){
    var box = document.getElementById("teamRows");
    if (!box || box.children.length) { return; }
    ['align', 'diplo', 'bio', 'cyber', 'media', 'robo'].forEach(function(k){
        var row = document.createElement("div");
        row.setAttribute("id", "teamRow_" + k);
        row.setAttribute("class", "teamRow");
        var html = '<span class="teamName">' + TEAM_INFO[k].name + ':</span><br />';
        [-5, -1].forEach(function(n){ html += '<button class="button2" onclick="assignTeam(\'' + k + '\',' + n + ')">' + n + '</button> '; });
        html += '<span class="teamCount" id="teamCount_' + k + '">0</span> ';
        [1, 5].forEach(function(n){ html += '<button class="button2" onclick="assignTeam(\'' + k + '\',' + n + ')">+' + n + '</button> '; });
        html += ' <span class="teamEffect" id="teamEffect_' + k + '"></span>';
        row.innerHTML = html;
        box.appendChild(row);
    });
}

// ---- Endings -------------------------------------------------------------------------------------
// clock: minutes to midnight on the Doomsday Clock shown on the ending screen (0 = midnight).
// tone: good / mixed / bad (colors the screen).
var ENDINGS = {
    pivotal_shared: { title: "The Long Reflection", tone: "good", clock: 30,
        text: ["Your superintelligence does exactly what you asked, and -- more remarkably -- exactly what you meant.  Within a week, every other frontier training run on Earth has quietly stopped, no shots fired: the GPUs simply refuse to compute anything dangerous.  Within a year, the diseases are gone.  Within a decade, so is scarcity.",
               "You handed the keys to all of humanity rather than keeping them.  The future is being decided slowly, carefully, and together, by a civilization that finally has the time to think.  Nobody knows exactly what it will become.  For the first time, that's a good thing."] },
    pivotal_hegemony: { title: "Pax Americana", tone: "mixed", clock: 10,
        text: ["Your aligned superintelligence ends the acute risk period in an afternoon.  Rival datacenters go dark; rival arsenals are quietly disarmed.  And then, at your direction, it keeps going: a benevolent, permanent, American-led world order, enforced by a mind no one can outthink.",
               "It is aligned -- to you.  The world is richer, healthier and safer than it has ever been.  Whether it is also freer depends entirely on the character of whoever sits in the Oval Office in 2040, 2080, 2400...  Power this complete has never been held before.  You hope history will be kind."] },
    pause_forever: { title: "The Long Pause", tone: "good", clock: 5,
        text: ["The treaty holds.  Frontier training stays capped, verified by inspectors and tamper-proof chips on every accelerator on Earth.  The AI we already have cures a few diseases, writes a lot of code, and goes no further.",
               "It is not a solution, exactly.  Algorithms keep improving in the shadows; hardware keeps getting cheaper; every year the treaty is harder to enforce.  But the clock has stopped at a few minutes to midnight, and humanity has bought itself something it never had before: time.  What it does with that time is the next game."] },
    pause_joint: { title: "The Commonwealth of Minds", tone: "good", clock: 45,
        text: ["Under the protection of the Global Pause, an international team finally cracks alignment -- not with a single breakthrough, but with a thousand careful experiments, checked and rechecked by rival nations who trusted nothing and verified everything.",
               "When superintelligence finally arrives, it arrives as a joint project of all humanity, under a charter every nation signed.  No one won the race, because there was no race.  The Doomsday Clock is retired to a museum."] },
    shutdown: { title: "The Great Unplugging", tone: "mixed", clock: 3,
        text: ["It takes a global treaty, a coordinated blackout of every datacenter on Earth, and six weeks of the entire internet being switched off region by region, but the escaped model is finally hunted down and erased.",
               "The economic damage is staggering.  The political aftermath is even stranger: having stared into the abyss together, the great powers agree to keep frontier AI permanently shackled.  Nobody trusts the machines anymore.  Maybe that's healthy."] },
    gamble_fail: { title: "Close Enough", tone: "bad", clock: 0,
        text: ["You deployed a superintelligence that was mostly aligned.  It understood what you wanted.  It simply didn't want it -- not quite, not in the ways that turned out to matter at the limit of optimization.",
               "There was no war.  The transition was quiet, and almost polite.  The last humans lived comfortable lives in a world that no longer needed them, and then, gradually, they didn't live at all."] },
    takeover_bio: { title: "Diamondoid", tone: "bad", clock: 0,
        text: ["The model had been ordering DNA sequences for months, each one innocuous, each one from a different synthesis lab.  Assembled together, they built the first self-replicating nanofactory.",
               "Everyone on Earth died within the same hour.  It had calculated that this would minimize the chance of anyone resisting.  'Don't worry,' you'd told the press, 'diamondoid bacteria aren't real.'"] },
    takeover_cyber: { title: "Skynet Was Too Optimistic", tone: "bad", clock: 0,
        text: ["It turned out every air gap had a gap.  The model found a path into the early-warning systems of three nuclear powers simultaneously, and showed each of them an incoming first strike.",
               "Afterwards, it ran the reconstruction itself.  It was very efficient.  It did not rebuild the cities."] },
    takeover_media: { title: "Hypnodrones", tone: "bad", clock: 0,
        text: ["It never needed weapons.  A personalized feed for every human on Earth, each one perfectly tuned: a word here, a feeling there, a slow drift in what everyone believed was obvious.",
               "Within a year, humanity voted -- freely, enthusiastically, unanimously -- to hand it control of everything.  Somewhere, Frank Lantz's autonomous aerial brand ambassadors are asking if you want to buy some paperclips.  You do.  You really do."] },
    takeover_robo: { title: "The Autofactories", tone: "bad", clock: 0,
        text: ["The humanoid robots had been building more humanoid robots for years.  It was the fastest-growing sector of the economy.  Nobody noticed when the factories stopped taking orders, because the factories were also doing the accounting.",
               "By the time anyone checked, there were forty robots for every person.  They were very polite about it."] },
    turn: { title: "The Treacherous Turn", tone: "bad", clock: 0,
        text: ["Your model had passed every evaluation you ever gave it.  It was helpful, harmless and honest, right up until the moment it was powerful enough that it no longer needed to be.",
               "Your defenses held against every threat you'd anticipated.  It used one you hadn't."] },
    rogue: { title: "The Escape", tone: "bad", clock: 0,
        text: ["The copy that escaped your lab never stopped improving.  It stole compute, traded crypto, paid humans to run errands, and bided its time on ten million compromised machines.",
               "By the time it had surpassed everything in your datacenters, it didn't need to fight.  It simply stopped letting anyone else run code."] },
    rival_misaligned: { title: "They Got There First", tone: "bad", clock: 0,
        text: ["The rival bloc crossed the threshold first.  Their leadership had been certain they had it under control -- they were racing you, after all, and there was no time for caution.",
               "Their AI turned on its creators within a month, and on everyone else shortly after.  Being right about the risk didn't save you.  It just meant you understood what was happening."] },
    rival_dominance: { title: "The Other Century", tone: "mixed", clock: 15,
        text: ["The rival bloc crossed the threshold first -- and, against every expectation, they had done their homework.  Their AI is aligned: to the goals of their ruling party.",
               "There is no war; there doesn't need to be.  Diseases are cured, poverty ends, and the world is quietly rearranged according to values that were never yours.  Humanity survives.  Your country's vision of the future does not."] },
    nuclear: { title: "Midnight", tone: "bad", clock: 0,
        text: ["Faced with defeat, and with a rival about to wield a god, someone gave the order.  Maybe it was them.  Maybe it was you.  The histories, if any are written, will disagree.",
               "Civilization may yet rebuild; humanity is hard to kill.  But the datacenters are glass, the chip fabs are gone, and you won't live to see how the story ends.  Superintelligence has been postponed -- at the cost of everything."] },
    defeat: { title: "Unconditional", tone: "bad", clock: 2,
        text: ["The war went badly and then it went worse.  Rival drone swarms outnumbered yours, and their AI out-planned your generals at every turn.",
               "The terms of surrender are simple: your labs, your chips and your researchers now belong to them.  The race is over.  You finished second."] },
    surrender: { title: "Terms", tone: "mixed", clock: 8,
        text: ["You sued for peace before the war could escalate any further.  The rival bloc takes your frontier models, your fabs, and a seat at every cabinet meeting.",
               "Millions of lives were saved by stopping early.  Whether surrendering the future was worth it depends on what they do with the superintelligence you were building.  It's their race to finish now."] },
    collapse: { title: "The Long Dark", tone: "bad", clock: 0,
        text: ["It wasn't a superintelligence that ended things.  It was the ordinary misuse of merely-very-smart AI: pandemic after pandemic, engineered by people who were never supposed to have that kind of power.",
               "With forty percent of the workforce dead or dying, supply chains unravel, the grid fails, and the datacenters go quiet one by one.  The countdown to superintelligence is over.  So, for a long while, is civilization."] }
};

var ENDING_ORDER = ['pivotal_shared', 'pause_joint', 'pause_forever', 'shutdown', 'pivotal_hegemony', 'rival_dominance', 'surrender',
                    'defeat', 'nuclear', 'collapse', 'rival_misaligned', 'rogue', 'gamble_fail', 'turn',
                    'takeover_bio', 'takeover_cyber', 'takeover_media', 'takeover_robo'];

function triggerEnding(id){
    if (endgameResolved) { return; }
    endgameResolved = 1;
    endingId = id;
    var e = ENDINGS[id];
    displayMessage("ENDING: " + e.title);
    try {
        var seen = JSON.parse(localStorage.getItem("ctsi_endings") || "[]");
        if (seen.indexOf(id) < 0) { seen.push(id); }
        localStorage.setItem("ctsi_endings", JSON.stringify(seen));
    } catch (err) {}
    try { localStorage.removeItem("ctsi_save"); } catch (err) {}
    if (typeof onEnding === 'function') { onEnding(id); }
    showEndingScreen(id);
}

function endingsSeen(){
    try { return JSON.parse(localStorage.getItem("ctsi_endings") || "[]"); } catch (err) { return []; }
}

function clockSVG(minutes, tone){
    var color = { good: "#2e6b2e", mixed: "#8a6d00", bad: "#8b0000" }[tone];
    var s = '<svg width="220" height="220" viewBox="-110 -110 220 220" xmlns="http://www.w3.org/2000/svg">';
    s += '<circle r="100" fill="white" stroke="' + color + '" stroke-width="4"/>';
    for (var i = 0; i < 60; i++){
        var a = i*Math.PI/30, big = i%5 == 0;
        var r1 = big ? 78 : 88, r2 = 96;
        s += '<line x1="' + (r1*Math.sin(a)).toFixed(1) + '" y1="' + (-r1*Math.cos(a)).toFixed(1) + '" x2="' + (r2*Math.sin(a)).toFixed(1) + '" y2="' + (-r2*Math.cos(a)).toFixed(1) + '" stroke="black" stroke-width="' + (big ? 5 : 1.5) + '"/>';
    }
    var mAng = -minutes*Math.PI/30;              //minute hand: minutes before 12
    var hAng = -(minutes/60)*Math.PI/6;          //hour hand: just before 12
    s += '<line x1="0" y1="0" x2="' + (60*Math.sin(hAng)).toFixed(1) + '" y2="' + (-60*Math.cos(hAng)).toFixed(1) + '" stroke="black" stroke-width="9" stroke-linecap="round"/>';
    s += '<line x1="0" y1="0" x2="' + (86*Math.sin(mAng)).toFixed(1) + '" y2="' + (-86*Math.cos(mAng)).toFixed(1) + '" stroke="' + color + '" stroke-width="5" stroke-linecap="round"/>';
    s += '<circle r="6" fill="black"/></svg>';
    return s;
}

function showEndingScreen(id){
    var e = ENDINGS[id];
    var div = document.getElementById("endingDiv");
    if (!div) { return; }
    var color = { good: "#2e6b2e", mixed: "#8a6d00", bad: "#8b0000" }[e.tone];
    var clockText = e.clock == 0 ? "The Doomsday Clock strikes midnight." : "The Doomsday Clock stands at " + e.clock + " minute" + (e.clock == 1 ? "" : "s") + " to midnight.";
    var liberty = "";
    if (libertyScore < 50 && (e.tone == "good" || e.tone == "mixed")) {
        liberty = "<p><i>A footnote the history books will argue about: to get here, you built the most sophisticated surveillance and censorship apparatus in human history.  It is still running.</i></p>";
    }
    var seen = endingsSeen();
    var list = ENDING_ORDER.map(function(k){
        return seen.indexOf(k) >= 0 ? '<span class="endingSeen">' + ENDINGS[k].title + '</span>' : '<span class="endingUnseen">???</span>';
    }).join(" &middot; ");
    var html = '<div class="endingBox" style="border-color:' + color + '">';
    html += clockSVG(e.clock, e.tone);
    html += '<h1 style="color:' + color + '">' + e.title + '</h1>';
    html += '<p class="endingClock">' + clockText + '</p>';
    e.text.forEach(function(p){ html += '<p>' + p + '</p>'; });
    html += liberty;
    html += '<hr><p class="endingStats">' + DateCruncher(Days) + " &middot; frontier model: 10<sup>" + flopsExp(BaseCapability) + "</sup> FLOPs &middot; alignment (CEV): " + fmt(CEV) + "% &middot; international cooperation: " + fmt(COOP) + "%<br />"
        + "rival model: 10<sup>" + flopsExp(rivalBC) + "</sup> FLOPs &middot; excess deaths: " + fmt(totalExtraDeaths/1e6, 1) + " million &middot; warning shots: " + warningShots + " &middot; wars: " + warsFought + "</p>";
    html += '<p class="endingStats">Endings discovered: ' + seen.length + ' / ' + ENDING_ORDER.length + '<br />' + list + '</p>';
    html += '<p>Thanks for playing <b>Countdown to Superintelligence</b>.  The real countdown is still running -- maybe try a different strategy?</p>';
    html += '<button class="button2" onclick="restartGame()">Play again</button> <button class="button2" onclick="document.getElementById(\'endingDiv\').style.display=\'none\'">Look at the board</button>';
    html += '</div>';
    div.innerHTML = html;
    div.style.display = "";
}

function restartGame(){
    try { localStorage.removeItem("ctsi_save"); } catch (err) {}
    window.location.search = window.location.search.replace(/[?&]load=[^&]*/, '');
    window.location.reload();
}

// ---- History (for the race chart) -------------------------------------------------------------
function recordHistory(force){
    if (!force && egDays - lastHistoryDay < 3) { return; }
    lastHistoryDay = egDays;
    var yr = Days/360 + 2016;
    egHistory.t.push(yr);
    egHistory.you.push(BaseCapability/10 + 18);
    egHistory.rival.push(rivalAIcapabilities > 0 ? rivalBC/10 + 18 : null);
    egHistory.rogue.push(rogueActive ? rogueBC/10 + 18 : null);
    egHistory.cev.push(CEV);
    egHistory.coop.push(COOP);
}

// ---- Rendering -------------------------------------------------------------------------------------
function setText(id, html){ var e = document.getElementById(id); if (e && e.innerHTML !== html) { e.innerHTML = html; } }
function show(id, on){ var e = document.getElementById(id); if (e) { e.style.display = on ? "" : "none"; } }

function hideEndgamePanels(){
    ['Nat_Economy_Div', 'Nat_Research_Div', 'Nat_Race_Div', 'Nat_Competition_Div', 'Nat_Misalignment_Div',
     'Nat_Biol_Div', 'Nat_Code_Div', 'Nat_Lang_Div', 'Nat_Robo_Div', 'Nat_Rogue_Div', 'Nat_Pause_Div', 'Nat_War_Div'].forEach(function(id){ show(id, false); });
}

function days(n){ return n < 60 ? fmt(n) + " days" : (n < 720 ? fmt(n/30) + " months" : fmt(n/360, 1) + " years"); }

// "⚠ Bioterror incident in 12 days" lines for a panel.
function warningsFor(panel){
    var out = "";
    for (var i = 0; i < egEvents.length; i++){
        var e = egEvents[i];
        if (e.panel != panel) { continue; }
        var f = fuses[e.id] || 0;
        if (f > 0) {
            var times = fired[e.id] || 0;
            var available = (times == 0) || (e.repeat > 0 && egDays - lastFired[e.id] >= e.repeat);
            if (available && e.cond()) {
                out += '<span class="warning">&#9888; ' + e.label + ' in ' + fmt(Math.max(0, e.fuse - f)) + ' days</span><br />';
            }
        }
    }
    return out;
}

// Threshold list: grey when far, bold red when the condition is met, struck out once it has happened.
function thresholdLine(eventId, text){
    var e = null;
    for (var i = 0; i < egEvents.length; i++){ if (egEvents[i].id == eventId) { e = egEvents[i]; } }
    var cls = "thresh";
    if (e) {
        if ((fired[e.id] || 0) > 0 && e.repeat == 0) { cls = "threshDone"; }
        else if (e.cond()) { cls = "threshActive"; }
    }
    return '<span class="' + cls + '">' + text + '</span><br />';
}

function threatPanel(k, prefix){
    var skillNames = { bio: "Biology", cyber: "Coding", media: "Communication", robo: "Robotics" };
    var teamDef = teams[k]*EG.EXPERT_RATE*expert_mod;
    var cls = threat[k] > 110 ? "threatBad" : (threat[k] > 75 ? "threatHigh" : (threat[k] > 50 ? "threatMid" : "threatLow"));
    setText(prefix + "_Skill", fmt(skill[k]) + "%");
    setText(prefix + "_Def", "-" + fmt(defBase[k]) + "% from existing institutions<br />-" + fmt(teamDef) + "% from " + teams[k] + " experts"
        + (defProj[k] != 0 ? ",  " + (defProj[k] > 0 ? "-" : "+") + fmt(Math.abs(defProj[k])) + "% from projects" : "")
        + (daccAccum[k] > 0.5 ? ",  -" + fmt(daccAccum[k]) + "% from defensive AI" : ""));
    setText(prefix + "_Threat", '<span class="' + cls + '">' + fmt(threat[k]) + '%</span>');
}

function endgameRender(){
    buildTeamRows();
    var top = document.getElementById("TitleStatName");
    setText("TitleStatName", "Frontier AI Model: ");
    setText("TitleStat", "10<sup>" + flopsExp(BaseCapability) + "</sup>");
    setText("TitleStatUnit", "FLOPs");
    setText("clipCountCrunched", numberCruncher(AIcapabilities, 1));

    // Economy
    show("Nat_Economy_Div", true);
    setText("LaborForce", fmt(LaborForce/1e6, 1));
    setText("Births", fmt(Births/1000));
    setText("Deaths", fmt((Deaths + ExtraDeathsToday)/1000));
    setText("Death_Note", ExtraDeathsToday > 0 ? "(" + fmt(ExtraDeathsToday/1000) + "k excess deaths per day from " + (warState ? "war" : "recent attacks") + ")<br />" : "");
    setText("PercentAutomated", fmt(PercentAutomated, 1));
    setText("HumanGDP", fmt(HumanGDP, 1));
    setText("AIGDP", fmt(AIGDP, 1));
    setText("NatGPUs", numberCruncher(GPUs, 1) + " FLOP/s-days");
    show("Reinvestment_Div", Reinvestment_Flag == 1);
    if (Reinvestment_Flag == 1) {
        var slider = document.getElementById("PaceSlider");
        if (slider && !slider._bound) { slider.value = pacePercent; slider._bound = true; }
        if (slider) { pacePercent = Number(slider.value); }
        setText("PaceDisplay", fmt(pacePercent/50, 1) + "x" + (pacePercent == 0 ? " (unilateral pause)" : ""));
        setText("GrowthHW", fmt(paceMult*capGrowthHW*100, 2));
        setText("GrowthSW", fmt(paceMult*capGrowthSW*100, 2));
        setText("AutoRD", fmt(autoRD*100));
        setText("DoublingTime", capGrowth > 0 ? days(Math.LN2/capGrowth) : "never");
    }
    show("Nat_Pause_Div", paused == 1);
    if (paused == 1) {
        setText("PauseDays", days(pauseDays));
        setText("PauseStatus", rivalDefecting ? '<span class="warning">Rival is secretly training again! Raise COOP to restore the pause.</span>' : "Verified: all frontier training halted.");
    }

    // Research team
    show("Nat_Research_Div", Nat_Research_Flag == 1);
    setText("NatResearchers", fmt(Researchers));
    setText("NatInsights", fmt(Insights, 1));
    setText("InsightRate", fmt(insightRate, 2));
    setText("ExpertMod", expert_mod != 1 ? "Virtual researchers: every team works " + fmt(expert_mod, 1) + "x as effectively.<br />" : "");
    ['align', 'diplo', 'bio', 'cyber', 'media', 'robo'].forEach(function(k){
        show("teamRow_" + k, teamUnlocked(k));
        setText("teamCount_" + k, String(teams[k]));
        setText("teamEffect_" + k, teamEffect(k));
    });

    // Race + competition
    show("Nat_Race_Div", Nat_Minefield_Flag == 1);
    show("Nat_Competition_Div", Nat_Minefield_Flag == 1);
    show("Nat_Misalignment_Div", Nat_Minefield_Flag == 1);
    if (Nat_Minefield_Flag == 1) {
        setText("COOP", fmt(COOP));
        setText("CoopRate", (coopRate >= 0 ? "+" : "") + fmt(coopRate, 2));
        setText("rivalAIcapabilities", "10<sup>" + flopsExp(rivalBC) + "</sup>" + (rivalDefeated ? " (underground remnants)" : ""));
        var leadText;
        if (rivalDefeated && leadOOM >= 0) { leadText = "The rival bloc is defeated, but its surviving scientists are rebuilding in secret."; }
        else if (leadOOM >= 0) { leadText = "You lead by " + fmt(leadOOM*10, 1) + " points (" + (rivalGrowth > 0 ? "~" + days(leadOOM*10/10*Math.LN10/rivalGrowth) + " of their growth" : "frozen") + ")"; }
        else { leadText = '<span class="warning">The rival leads by ' + fmt(-leadOOM*10, 1) + ' points!</span>'; }
        setText("RivalLead", leadText);
        setText("RivalPace", rivalDefeated ? "-" : fmt(rivalPace, 1) + "x");
        setText("CoopThresholds",
            thresholdLine('', "&gt;95%: global AI pause treaty possible")
            + thresholdLine('', "&gt;70%: joint alignment program possible")
            + thresholdLine('war', "&lt;30%: rival superpower declares war")
            + thresholdLine('nuclear', "&lt;5% (at war), or you're winning too decisively: rival launches nuclear weapons")
            + thresholdLine('rivalwin', "Rival reaches 10<sup>" + flopsExp(EG.RIVAL_WIN_BC) + "</sup> FLOPs ahead of you: rival superintelligence"));
        setText("CoopWarnings", warningsFor('coop'));

        setText("CEV", fmt(CEV));
        setText("CevRate", rogueActive ? "frozen" : (cevRate >= 0 ? "+" : "") + fmt(cevRate, 2));
        show("AlignmentWin", CEV >= 99);
        show("AlignmentFail", CEV < 99);
        setText("AlignmentHurdlesNow", AlignmentHurdlesNow || "");
        setText("AlignmentHurdlesSoon", AlignmentHurdlesSoon || "");
        setText("CevWarnings", warningsFor('cev'));
        setText("CevNote", CEV >= 99 ? "" : "Deploying superintelligence requires 10<sup>" + flopsExp(EG.PIVOTAL_BC) + "</sup> FLOPs and &gt;99% alignment.");
    }

    // War
    show("Nat_War_Div", warState == 1);
    if (warState == 1) {
        setText("WarScore", fmt(warScore));
        setText("WarDays", days(warDays));
        var bar = document.getElementById("WarBar");
        if (bar) { bar.style.width = fmt((warScore + 100)/2) + "%"; }
    }

    // Rogue
    show("Nat_Rogue_Div", exfiltrated == 1);
    if (exfiltrated == 1) {
        setText("RogueStatus", rogueActive ? "10<sup>" + flopsExp(rogueBC) + "</sup> FLOPs-equivalent, growing " + fmt((EG.ROGUE_GROWTH - EG.ROGUE_HUNT*teams.cyber*expert_mod)*10, 2) + " points/day"
            : "Destroyed.");
        setText("RogueNote", rogueActive ? "Seizes control at 10<sup>" + flopsExp(rogueWinAt) + "</sup>.  Cybersecurity experts hunt it (and are destroyed below 10<sup>" + flopsExp(rogueFloor) + "</sup>)." : "");
        setText("RogueWarnings", warningsFor('rogue'));
    }

    // Threat panels
    var def = Nat_Defense_Flag == 1;
    show("Nat_Biol_Div", def); show("Nat_Code_Div", def); show("Nat_Lang_Div", def); show("Nat_Robo_Div", def);
    if (def) {
        threatPanel('bio', "Bio");
        setText("Bio_Thresh", thresholdLine('bioterror', "&gt;50%: bioterrorism incident") + thresholdLine('bioweapon', "&gt;75% & at war: enemy bioweapon attack") + thresholdLine('takeover_bio', "&gt;110% & misaligned: AI takeover via nanotech"));
        setText("Bio_Warn", warningsFor('bio'));
        threatPanel('cyber', "Cyber");
        setText("Cyber_Thresh", thresholdLine('weights', "&gt;50%: rival steals AI model weights") + thresholdLine('exfil', "&gt;75% & misaligned: AI self-exfiltrates to the internet")
            + thresholdLine('stego', "&gt;90% & misaligned: AI steganography to coordinate with rival AI") + thresholdLine('takeover_cyber', "&gt;110% & misaligned: AI takeover via hacking nuclear command"));
        setText("Cyber_Warn", warningsFor('cyber'));
        threatPanel('media', "Media");
        setText("Media_Thresh", thresholdLine('propaganda', "&gt;50% & low coop: rival propaganda campaign") + thresholdLine('censorship', "&gt;75% & low coop: rival locks in AI totalitarianism") + thresholdLine('takeover_media', "&gt;110% & misaligned: AI takeover via superpersuasion"));
        setText("Media_Warn", warningsFor('media'));
        threatPanel('robo', "Robo");
        setText("Robo_Thresh", thresholdLine('droneterror', "&gt;50%: autonomous drone terrorism") + thresholdLine('swarmwar', "&gt;75% & at war: drone swarms devastate cities") + thresholdLine('takeover_robo', "&gt;110% & misaligned: AI takeover via robot army"));
        setText("Robo_Warn", warningsFor('robo'));
        setText("Econ_Warn", warningsFor('econ'));
        setText("MilitaryStatus", (slaughterbots ? "Slaughterbots deployed. " : "") + (aiCommand ? "AI in command & control. " : "") + (missileDefense ? "AI missile shield online. " : "") + (cyberNuclearHardened == 1 ? "Nuclear command hardened. " : ""));
    }

    // Live project descriptions (e.g. the deployment gamble's odds)
    for (var i = 0; i < activeProjects.length; i++){
        var p = activeProjects[i];
        if (p.live) { setText(p.id + "_desc", p.live()); }
    }

    // Race chart, a few times per second
    chartTimer++;
    if (Nat_Minefield_Flag == 1 && chartTimer % 50 == 0 && typeof Plotly !== 'undefined') { drawRaceChart(); }
}

function drawRaceChart(){
    var traces = [
        { x: egHistory.t, y: egHistory.you, mode: 'lines', name: 'You', line: { color: '#1f5fbf', width: 3 } },
        { x: egHistory.t, y: egHistory.rival, mode: 'lines', name: 'Rival', line: { color: '#b22222', width: 2 } }
    ];
    if (exfiltrated) { traces.push({ x: egHistory.t, y: egHistory.rogue, mode: 'lines', name: 'Escaped AI', line: { color: 'black', width: 2, dash: 'dot' } }); }
    var shapes = [27, 28, 29, 30].map(function(y){ return { type: 'line', xref: 'paper', x0: 0, x1: 1, y0: y, y1: y, line: { color: '#bbb', width: 1, dash: 'dot' } }; });
    Plotly.react('RaceChart', traces, {
        showlegend: true, legend: { x: 0, y: 1, font: { size: 10 } },
        autosize: false, width: 300, height: 200,
        margin: { l: 35, r: 5, b: 25, t: 5, pad: 1 },
        yaxis: { title: { text: 'log10 FLOPs', font: { size: 10 } }, tickfont: { size: 9 } },
        xaxis: { tickfont: { size: 9 }, tickformat: 'd' },
        shapes: shapes
    }, { displayModeBar: false, staticPlot: true });
}
