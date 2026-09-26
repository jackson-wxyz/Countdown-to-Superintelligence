// Headless harness for Countdown to Superintelligence.
//
// Loads the game's browser scripts into a Node `vm` context with a tiny fake
// DOM, fake Plotly, and a deterministic fake clock, so we can run whole
// playthroughs in a second or two and assert things about pacing & endings.
//
// Usage:
//   const { createGame } = require('./harness');
//   const g = createGame();          // fresh game, clock at 0
//   g.advance(1000);                 // run 1 real-time second of game loops
//   g.ctx.Days                       // read any game global
//   g.ctx.projectA.effect()          // call any game function

const fs = require('fs');
const path = require('path');
const vm = require('vm');

const DOCS = path.join(__dirname, '..', 'docs');

// Scripts in the order index2.html loads them.
function scriptList() {
    const html = fs.readFileSync(path.join(DOCS, 'index2.html'), 'utf8');
    const re = /<script[^>]*src="([^"?]+)(\?[^"]*)?"[^>]*>/g;
    const out = [];
    let m;
    while ((m = re.exec(html))) {
        if (/^https?:/.test(m[1])) continue; // CDN (plotly)
        out.push(m[1]);
    }
    return out;
}

function makeElement(doc, tag) {
    const el = {
        tagName: (tag || 'div').toUpperCase(),
        id: '',
        style: {},
        _innerHTML: '',
        value: '0',
        checked: false,
        disabled: false,
        className: '',
        children: [],
        parentNode: null,
        attributes: {},
        dataset: {},
        onclick: null,
        classList: {
            _s: new Set(),
            add(c) { this._s.add(c); },
            remove(c) { this._s.delete(c); },
            toggle(c, on) { if (on === undefined) on = !this._s.has(c); on ? this._s.add(c) : this._s.delete(c); },
            contains(c) { return this._s.has(c); },
        },
        get innerHTML() { return this._innerHTML; },
        set innerHTML(v) { this._innerHTML = String(v); if (v === '') this.children = []; },
        get textContent() { return this._innerHTML.replace(/<[^>]*>/g, ''); },
        set textContent(v) { this._innerHTML = String(v); },
        get innerText() { return this.textContent; },
        set innerText(v) { this.textContent = v; },
        get firstChild() { return this.children[0] || null; },
        get lastChild() { return this.children[this.children.length - 1] || null; },
        setAttribute(k, v) {
            this.attributes[k] = v;
            if (k === 'id') { this.id = v; doc._byId[v] = this; }
            if (k === 'class') this.className = v;
        },
        getAttribute(k) { return this.attributes[k]; },
        appendChild(c) { c.parentNode = this; this.children.push(c); if (c.id) doc._byId[c.id] = c; return c; },
        insertBefore(c, ref) {
            c.parentNode = this;
            const i = this.children.indexOf(ref);
            if (i < 0) this.children.push(c); else this.children.splice(i, 0, c);
            if (c.id) doc._byId[c.id] = c;
            return c;
        },
        prepend(c) { c.parentNode = this; this.children.unshift(c); if (c.id) doc._byId[c.id] = c; },
        removeChild(c) {
            const i = this.children.indexOf(c);
            if (i >= 0) this.children.splice(i, 1);
            c.parentNode = null;
            if (c.id && doc._byId[c.id] === c) delete doc._byId[c.id];
            return c;
        },
        remove() { if (this.parentNode) this.parentNode.removeChild(this); },
        addEventListener() {},
        removeEventListener() {},
        querySelector() { return null; },
        querySelectorAll() { return []; },
        focus() {},
        blur() {},
        click() { if (this.onclick) this.onclick(); },
        getBoundingClientRect() { return { top: 0, left: 0, width: 100, height: 20 }; },
        scrollIntoView() {},
    };
    return el;
}

function makeDocument() {
    const doc = {
        _byId: {},
        getElementById(id) {
            // Every static element in index2.html is assumed to exist; create on demand.
            if (!this._byId[id]) {
                const el = makeElement(this, 'div');
                el.id = id;
                el.parentNode = this.body;
                this._byId[id] = el;
            }
            return this._byId[id];
        },
        createElement(tag) { return makeElement(this, tag); },
        createTextNode(t) { const e = makeElement(this, '#text'); e.textContent = t; return e; },
        addEventListener() {},
        removeEventListener() {},
        querySelector() { return null; },
        querySelectorAll() { return []; },
        title: '',
        location: { search: '', hash: '', href: 'http://localhost/index2.html' },
    };
    doc.body = makeElement(doc, 'body');
    doc.documentElement = makeElement(doc, 'html');
    return doc;
}

// Small deterministic PRNG so runs are reproducible.
function mulberry32(seed) {
    return function () {
        seed |= 0; seed = (seed + 0x6D2B79F5) | 0;
        let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
        t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
        return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
    };
}

function createGame(opts) {
    opts = opts || {};
    const timers = [];
    let now = 0;
    let nextId = 1;
    const doc = makeDocument();
    const messages = [];

    const math = Object.create(Math);
    math.random = mulberry32(opts.seed == null ? 12345 : opts.seed);

    const store = {};
    const sandbox = {
        console: opts.quiet === false ? console : { log() {}, warn() {}, error: console.error, info() {} },
        document: doc,
        Math: math,
        Plotly: { newPlot() {}, react() {}, extendTraces() {}, purge() {} },
        Audio: function () { return { play() {}, pause() {}, addEventListener() {}, src: '' }; },
        localStorage: {
            getItem(k) { return Object.prototype.hasOwnProperty.call(store, k) ? store[k] : null; },
            setItem(k, v) { store[k] = String(v); },
            removeItem(k) { delete store[k]; },
        },
        location: doc.location,
        navigator: { userAgent: 'node' },
        setInterval(fn, ms) { const id = nextId++; timers.push({ id, fn, ms: Math.max(1, ms || 1), next: now + Math.max(1, ms || 1), repeat: true }); return id; },
        clearInterval(id) { const i = timers.findIndex(t => t.id === id); if (i >= 0) timers.splice(i, 1); },
        setTimeout(fn, ms) { const id = nextId++; timers.push({ id, fn, ms: Math.max(1, ms || 1), next: now + Math.max(1, ms || 1), repeat: false }); return id; },
        clearTimeout(id) { sandbox.clearInterval(id); },
        requestAnimationFrame(fn) { return sandbox.setTimeout(fn, 16); },
        alert() {},
        confirm() { return true; },
        prompt() { return null; },
        URLSearchParams,
        performance: { now: () => now },
    };
    sandbox.window = sandbox;
    sandbox.self = sandbox;
    sandbox.globalThis = sandbox;
    sandbox.addEventListener = function () {};
    vm.createContext(sandbox);

    for (const f of scriptList()) {
        if (!fs.existsSync(path.join(DOCS, f))) continue;
        const code = fs.readFileSync(path.join(DOCS, f), 'utf8');
        vm.runInContext(code, sandbox, { filename: f });
    }

    // toLocaleString is very slow in Node's Intl; the game calls it hundreds of
    // times per tick purely for display.  Swap in a cheap version for tests.
    if (opts.fastFormat !== false) {
        vm.runInContext(`Number.prototype.toLocaleString = function(){ return String(Math.round(this*100)/100); };`, sandbox);
    }

    // Capture console messages by wrapping displayMessage.
    if (typeof sandbox.displayMessage === 'function') {
        const orig = sandbox.displayMessage;
        sandbox.displayMessage = function (msg) { messages.push({ day: sandbox.Days, msg: String(msg) }); return orig(msg); };
        // Re-bind the global name inside the context so game code uses the wrapper.
        vm.runInContext('displayMessage = window.displayMessage;', sandbox);
    }

    function advance(ms) {
        const end = now + ms;
        for (;;) {
            let t = null;
            for (const x of timers) if (t === null || x.next < t.next || (x.next === t.next && x.id < t.id)) t = x;
            if (!t || t.next > end) break;
            now = t.next;
            if (t.repeat) t.next += t.ms; else timers.splice(timers.indexOf(t), 1);
            t.fn();
        }
        now = end;
    }

    return {
        ctx: sandbox,
        doc,
        messages,
        advance,
        get now() { return now; },
        el(id) { return doc.getElementById(id); },
        run(code) { return vm.runInContext(code, sandbox); },
    };
}

module.exports = { createGame, scriptList };
