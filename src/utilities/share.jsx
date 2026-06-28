function copyStateForShare(state) {
    const out = {};
    for (const key in state) {
        const val = state[key];
        if (val !== null && typeof val === 'object') {
            out[key] = { data: null, translation: { ...val.translation }, scale: val.scale ?? 1 };
        } else {
            out[key] = val;
        }
    }
    return out;
}

function buildPayload(style, state, type) {
    return {
        v: 1,
        type,
        style: { trim: style.trim, fill: style.fill, base: style.base, text: style.text },
        state: copyStateForShare(state),
    };
}

// ── URL-based (no backend) ──────────────────────────────────────

export function encodeCard(style, state, type) {
    try {
        return btoa(unescape(encodeURIComponent(JSON.stringify(buildPayload(style, state, type)))));
    } catch {
        return null;
    }
}

export function decodeCard(encoded) {
    try {
        return JSON.parse(decodeURIComponent(escape(atob(encoded.trim()))));
    } catch {
        return null;
    }
}

export function buildShareURL(style, state, type) {
    const code = encodeCard(style, state, type);
    if (!code) return null;
    const url = new URL(window.location.href);
    url.search = '';
    url.searchParams.set('share', code);
    return url.toString();
}

// ── Short-code API (Redis backend) ─────────────────────────────

export async function shareToAPI(style, state, type) {
    const res = await fetch('/api/share', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(buildPayload(style, state, type)),
    });
    if (!res.ok) throw new Error(`Share API ${res.status}`);
    return res.json(); // { code }
}

export async function loadFromAPI(code) {
    const res = await fetch(`/api/load?code=${encodeURIComponent(code.toLowerCase())}`);
    if (!res.ok) {
        const body = await res.json().catch(() => ({}));
        throw new Error(body.error ?? `Load API ${res.status}`);
    }
    return res.json();
}

export function extractCode(input) {
    const trimmed = input.trim();
    try {
        const url = new URL(trimmed);
        return url.searchParams.get('code') || url.searchParams.get('share') || trimmed;
    } catch {
        return trimmed;
    }
}

export function isShortCode(input) {
    return /^[a-z0-9]{4,8}$/i.test(input.trim());
}
