// Scenario tests: force the conditions for each ending and check that it fires.  These make sure
// every one of the endings is wired up and reachable, independent of balance.
const test = require('node:test');
const assert = require('node:assert');
const { gameAtEndgameStart, days, forceProject, project } = require('./helpers');

const BC = bc => Math.pow(10, bc / 10); // BaseCapability -> EFLOPs

function fresh() { return gameAtEndgameStart(); }

for (const k of ['bio', 'cyber', 'media', 'robo']) {
    test(`takeover via ${k} when that threat passes 110% and the AI is misaligned`, () => {
        const g = fresh(), c = g.ctx;
        c.CEV = 50; c.defProj[k] -= 300;
        days(g, 40);
        assert.strictEqual(c.endingId, 'takeover_' + k);
    });
}

test('no takeover when the AI is aligned (CEV >= 99)', () => {
    const g = fresh(), c = g.ctx;
    c.CEV = 100; c.defProj.bio -= 300;
    c.teams.align = 40; // keep CEV pinned despite erosion
    days(g, 60);
    assert.ok(!c.endingId || !c.endingId.startsWith('takeover'), `ending was ${c.endingId}`);
});

test('AI Control protocols catch the first takeover attempt (a warning shot)', () => {
    const g = fresh(), c = g.ctx;
    c.aiControl = 1; c.CEV = 50; c.defProj.bio -= 300;
    const before = c.AIcapabilities;
    const coop = c.COOP;
    days(g, 20);
    assert.strictEqual(c.endgameResolved, 0);
    assert.strictEqual(c.warningShots, 1);
    assert.ok(c.AIcapabilities < before, 'capabilities rolled back');
    assert.ok(c.COOP > coop, 'the world wakes up');
    days(g, 40);
    assert.strictEqual(c.endingId, 'takeover_bio', 'the second attempt succeeds');
});

test('hardened nuclear command stops the first cyber takeover', () => {
    const g = fresh(), c = g.ctx;
    c.cyberNuclearHardened = 1; c.CEV = 50; c.defProj.cyber -= 300;
    days(g, 20);
    assert.strictEqual(c.warningShots, 1);
});

test('rival superintelligence: misaligned rival', () => {
    const g = fresh(), c = g.ctx;
    c.rivalAIcapabilities = BC(116); c.rivalCEV = 10;
    days(g, 30);
    assert.strictEqual(c.endingId, 'rival_misaligned');
});

test('rival superintelligence: aligned rival', () => {
    const g = fresh(), c = g.ctx;
    c.rivalAIcapabilities = BC(116); c.rivalCEV = 80;
    days(g, 30);
    assert.strictEqual(c.endingId, 'rival_dominance');
});

test('war breaks out when cooperation stays below 30%', () => {
    const g = fresh(), c = g.ctx;
    c.COOP = 20;
    days(g, 70);
    assert.strictEqual(c.warState, 1);
    assert.ok(c.activeProjects.includes(project(g, 'W_Ceasefire')), 'ceasefire option shown');
});

test('nuclear war when cooperation collapses during a war', () => {
    const g = fresh(), c = g.ctx;
    c.declareWar(); c.COOP = 0;
    days(g, 40);
    assert.strictEqual(c.endingId, 'nuclear');
});

test('a missile shield prevents the nuclear ending', () => {
    const g = fresh(), c = g.ctx;
    c.declareWar(); c.COOP = 0; c.missileDefense = 1;
    days(g, 40);
    assert.notStrictEqual(c.endingId, 'nuclear');
});

test('winning a war decisively without a shield provokes a nuclear strike', () => {
    const g = fresh(), c = g.ctx;
    c.declareWar(); c.COOP = 40; c.warScore = 55;
    days(g, 40);
    assert.strictEqual(c.endingId, 'nuclear');
});

test('winning a war with a shield defeats the rival', () => {
    const g = fresh(), c = g.ctx;
    c.declareWar(); c.COOP = 40; c.warScore = 95; c.missileDefense = 1; c.slaughterbots = 1;
    days(g, 20);
    assert.strictEqual(c.rivalDefeated, 1);
    assert.strictEqual(c.warState, 0);
    assert.ok(c.COOP < 5, 'the world resents you');
    assert.ok(!c.endgameResolved);
});

test('ceasefire ends the war', () => {
    const g = fresh(), c = g.ctx;
    c.declareWar(); c.Insights = 50;
    days(g, 1);
    forceProject(g, 'W_Ceasefire');
    assert.strictEqual(c.warState, 0);
    assert.strictEqual(c.COOP, 35);
    days(g, 5);
    assert.ok(!c.activeProjects.includes(project(g, 'W_Surrender')));
});

test('losing a war: defeat', () => {
    const g = fresh(), c = g.ctx;
    c.declareWar(); c.COOP = 45; c.rivalAIcapabilities = c.AIcapabilities * 1e3;
    days(g, 120);
    assert.strictEqual(c.endingId, 'defeat');
});

test('surrender', () => {
    const g = fresh(), c = g.ctx;
    c.declareWar(); c.warScore = -40;
    days(g, 1);
    forceProject(g, 'W_Surrender');
    assert.strictEqual(c.endingId, 'surrender');
});

test('collapse when the labor force falls too far', () => {
    const g = fresh(), c = g.ctx;
    c.LaborForce = c.startLaborForce * 0.59;
    days(g, 2);
    assert.strictEqual(c.endingId, 'collapse');
});

test('self-exfiltration: alignment freezes and the escaped AI grows', () => {
    const g = fresh(), c = g.ctx;
    c.CEV = 40; c.defProj.cyber -= 60; // cyber threat ~80-90%
    days(g, 40);
    assert.strictEqual(c.rogueActive, 1);
    const cev = c.CEV, rogue = c.rogueBC;
    c.teams.align = 30;
    days(g, 30);
    assert.ok(c.CEV <= cev + 1e-9, 'alignment research is frozen');
    assert.ok(c.rogueBC > rogue, 'escaped AI grows');
});

test('the escaped AI wins if left alone', () => {
    const g = fresh(), c = g.ctx;
    c.selfExfiltrate(); c.rogueBC = c.rogueWinAt - 0.1;
    days(g, 15);
    assert.strictEqual(c.endingId, 'rogue');
});

test('the escaped AI can be hunted down by cybersecurity experts', () => {
    const g = fresh(), c = g.ctx;
    c.selfExfiltrate();
    c.Researchers = 100; c.assignTeam('cyber', 60); c.expert_mod = 2;
    days(g, 200);
    assert.strictEqual(c.rogueActive, 0);
    assert.strictEqual(c.rogueDestroyed, 1);
});

test('the Great Unplugging', () => {
    const g = fresh(), c = g.ctx;
    c.selfExfiltrate(); c.COOP = 95; c.Insights = 50;
    days(g, 1);
    assert.ok(c.activeProjects.includes(project(g, 'G_Unplug')));
    project(g, 'G_Unplug').effect();
    assert.strictEqual(c.endingId, 'shutdown');
});

test('the treacherous turn at extreme capability', () => {
    const g = fresh(), c = g.ctx;
    c.AIcapabilities = BC(126); c.CEV = 50;
    for (const k of ['bio', 'cyber', 'media', 'robo']) c.defProj[k] += 1000;
    days(g, 40);
    assert.strictEqual(c.endingId, 'turn');
});

function pivotalSetup() {
    const g = fresh(), c = g.ctx;
    c.AIcapabilities = BC(106); c.lastBC = 106; c.CEV = 100; c.teams.align = 40;
    c.hurdlesCrossed = { 90: 10, 100: 10, 110: 0, 120: 0 }; // skip the hurdles we just jumped over
    for (const k of ['bio', 'cyber', 'media', 'robo']) c.defProj[k] += 1000;
    days(g, 1);
    return g;
}

test('pivotal act -> share the future', () => {
    const g = pivotalSetup(), c = g.ctx;
    const p = project(g, 'P_Pivotal');
    assert.ok(c.activeProjects.includes(p), 'pivotal act offered');
    assert.ok(p.cost());
    p.effect();
    days(g, 1);
    project(g, 'P_Share').effect();
    assert.strictEqual(c.endingId, 'pivotal_shared');
});

test('pivotal act -> seize the future', () => {
    const g = pivotalSetup(), c = g.ctx;
    project(g, 'P_Pivotal').effect();
    days(g, 1);
    assert.ok(c.activeProjects.includes(project(g, 'P_Seize')));
    project(g, 'P_Seize').effect();
    assert.strictEqual(c.endingId, 'pivotal_hegemony');
});

test('deployment gamble can fail', () => {
    const g = fresh(), c = g.ctx;
    c.AIcapabilities = BC(106); c.CEV = 80; c.hurdlesCrossed = { 90: 10, 100: 10, 110: 0, 120: 0 }; c.lastBC = 106;
    for (const k of ['bio', 'cyber', 'media', 'robo']) c.defProj[k] += 1000;
    days(g, 1);
    c.CEV = 80;
    const p = project(g, 'P_Gamble');
    assert.ok(c.activeProjects.includes(p));
    c.Math.random = () => 0.99;
    p.effect();
    assert.strictEqual(c.endingId, 'gamble_fail');
});

test('deployment gamble can succeed', () => {
    const g = fresh(), c = g.ctx;
    c.AIcapabilities = BC(106); c.CEV = 97; c.hurdlesCrossed = { 90: 10, 100: 10, 110: 0, 120: 0 }; c.lastBC = 106;
    for (const k of ['bio', 'cyber', 'media', 'robo']) c.defProj[k] += 1000;
    days(g, 1);
    c.CEV = 97;
    c.Math.random = () => 0.01;
    project(g, 'P_Gamble').effect();
    assert.strictEqual(c.pivotalReady, 1);
    assert.ok(!c.endgameResolved);
});

function pauseSetup() {
    const g = fresh(), c = g.ctx;
    c.COOP = 100; c.Insights = 100;
    project(g, 'D_FlexHEG').flag = 1; // verification infrastructure is a prerequisite
    days(g, 1);
    const p = project(g, 'D_Pause');
    assert.ok(c.activeProjects.includes(p), 'pause offered');
    p.effect();
    assert.strictEqual(c.paused, 1);
    return g;
}

test('global pause freezes the race', () => {
    const g = pauseSetup(), c = g.ctx;
    const you = c.BaseCapability, rival = c.rivalBC;
    days(g, 100);
    assert.ok(c.BaseCapability - you < 0.2, 'your frontier barely moves');
    assert.ok(c.rivalBC - rival < 0.2, 'nor does theirs');
});

test('global pause -> made permanent', () => {
    const g = pauseSetup(), c = g.ctx;
    c.teams.diplo = 30;
    days(g, 250);
    const p = project(g, 'P_PauseForever');
    assert.ok(c.activeProjects.includes(p), 'permanent pause offered');
    p.effect();
    assert.strictEqual(c.endingId, 'pause_forever');
});

test('global pause -> build it together', () => {
    const g = pauseSetup(), c = g.ctx;
    c.CEV = 100; c.teams.align = 30; c.teams.diplo = 20;
    days(g, 2);
    const p = project(g, 'P_Together');
    assert.ok(c.activeProjects.includes(p));
    p.effect();
    assert.strictEqual(c.endingId, 'pause_joint');
});

test('global pause collapses if cooperation falls apart', () => {
    const g = pauseSetup(), c = g.ctx;
    c.COOP = 30;
    days(g, 2);
    assert.strictEqual(c.paused, 0);
});

test('every ending has text and is listed', () => {
    const g = fresh(), c = g.ctx;
    for (const id of c.ENDING_ORDER) {
        const e = c.ENDINGS[id];
        assert.ok(e && e.title && e.text.length >= 2, id);
        assert.ok(['good', 'mixed', 'bad'].includes(e.tone), id);
    }
    assert.strictEqual(Object.keys(c.ENDINGS).length, c.ENDING_ORDER.length);
});

test('the ending screen renders and endings are remembered', () => {
    const g = fresh(), c = g.ctx;
    c.triggerEnding('pause_forever');
    const html = g.el('endingDiv').innerHTML;
    assert.ok(html.includes('The Long Pause'));
    assert.ok(html.includes('<svg'));
    assert.deepStrictEqual(JSON.parse(c.localStorage.getItem('ctsi_endings')), ['pause_forever']);
});


// ---- Regressions (bugs found in review) ------------------------------------------------------

test('choosing export sanctions closes off the treaty -> inspectors -> pause path', () => {
    const g = fresh(), c = g.ctx;
    c.Insights = 500; c.COOP = 80;
    forceProject(g, 'D_Sanctions');
    c.COOP = 80;
    days(g, 200);
    assert.ok(!c.activeProjects.includes(project(g, 'D_Inspectors')), 'inspectors not offered');
    assert.notStrictEqual(project(g, 'D_ComputeTreaty').flag, 1);
});

test('the world is frozen while you make the final choice after a pivotal act', () => {
    const g = pivotalSetup(), c = g.ctx;
    project(g, 'P_Pivotal').effect();
    const bc = c.BaseCapability, cev = c.CEV;
    days(g, 60);
    assert.ok(!c.endgameResolved, 'no ending sneaks in');
    assert.strictEqual(c.BaseCapability, bc);
    assert.strictEqual(c.CEV, cev);
    assert.ok(c.activeProjects.includes(project(g, 'P_Share')));
});

test('a ceasefire is available in a second war too', () => {
    const g = fresh(), c = g.ctx;
    c.Insights = 50;
    c.declareWar(); days(g, 1);
    project(g, 'W_Ceasefire').effect();
    assert.strictEqual(c.warState, 0);
    c.declareWar(); days(g, 1);
    assert.ok(c.activeProjects.includes(project(g, 'W_Ceasefire')), 'ceasefire offered again');
    project(g, 'W_Ceasefire').effect();
    assert.strictEqual(c.warState, 0);
});

test('diplomacy projects vanish once the rival is defeated', () => {
    const g = fresh(), c = g.ctx;
    days(g, 60);
    assert.ok(c.activeProjects.includes(project(g, 'D_Hotline')));
    c.declareWar(); c.COOP = 40; c.warScore = 99; c.missileDefense = 1; c.slaughterbots = 1;
    days(g, 5);
    assert.strictEqual(c.rivalDefeated, 1);
    assert.ok(!c.activeProjects.includes(project(g, 'D_Hotline')));
});

test('alignment projects vanish while an escaped AI is loose, and come back after', () => {
    const g = fresh(), c = g.ctx;
    days(g, 1);
    assert.ok(c.activeProjects.includes(project(g, 'Al_Interp')));
    c.selfExfiltrate(); days(g, 1);
    assert.ok(!c.activeProjects.includes(project(g, 'Al_Interp')));
    c.rogueBC = c.rogueFloor - 1; days(g, 2);
    assert.strictEqual(c.rogueActive, 0);
    assert.ok(c.activeProjects.includes(project(g, 'Al_Interp')));
});

test('hardened nuclear command is used for cyber attempts before AI Control', () => {
    const g = fresh(), c = g.ctx;
    c.aiControl = 1; c.cyberNuclearHardened = 1;
    c.attemptTakeover('cyber');
    assert.strictEqual(c.aiControl, 1, 'AI Control still armed');
    c.attemptTakeover('bio');
    assert.strictEqual(c.warningShots, 2);
    assert.ok(!c.endgameResolved);
});

test('the global pause can be re-ratified after it collapses', () => {
    const g = pauseSetup(), c = g.ctx;
    c.COOP = 30; days(g, 2);
    assert.strictEqual(c.paused, 0);
    c.COOP = 100; c.Insights = 100; days(g, 1);
    assert.ok(c.activeProjects.includes(project(g, 'D_Pause')));
});

test('project buttons do nothing once the game has ended', () => {
    const g = fresh(), c = g.ctx;
    c.Insights = 100; days(g, 1);
    c.triggerEnding('surrender');
    const before = c.Insights;
    project(g, 'Al_Interp').effect();
    assert.strictEqual(c.Insights, before);
});
