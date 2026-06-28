import express from 'express';
import { rateLimit } from 'express-rate-limit';
import { createClient } from 'redis';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const PORT = process.env.PORT || 3000;
const REDIS_URL = process.env.REDIS_URL || 'redis://localhost:6379';

// ── Redis ───────────────────────────────────────────────────────

const redis = createClient({ url: REDIS_URL });
redis.on('error', err => console.error('Redis error:', err));
await redis.connect();

// ── Express ─────────────────────────────────────────────────────

const app = express();
app.use(express.json());
app.use(express.static(join(__dirname, 'dist')));

// ── Rate limiting ────────────────────────────────────────────────

const shareLimit = rateLimit({ windowMs: 60_000, limit: 10, standardHeaders: true, legacyHeaders: false });

// ── Share API ───────────────────────────────────────────────────

const CHARS = 'abcdefghijklmnopqrstuvwxyz0123456789';
const CODE_LEN = 6;
const TTL_SECONDS = 60 * 60 * 24 * 30; // 30 days

function generateCode() {
    let code = '';
    for (let i = 0; i < CODE_LEN; i++)
        code += CHARS[Math.floor(Math.random() * CHARS.length)];
    return code;
}

function validatePayload(body) {
    if (!body || typeof body !== 'object') return false;
    if (!body.style || typeof body.style !== 'object') return false;
    if (!body.state || typeof body.state !== 'object') return false;
    if (typeof body.type !== 'string') return false;
    return true;
}

app.post('/api/share', shareLimit, async (req, res) => {
    const body = req.body;
    if (!validatePayload(body))
        return res.status(400).json({ error: 'Invalid card data' });

    const payload = JSON.stringify({
        v: 1,
        type: body.type,
        style: {
            trim: body.style.trim,
            fill: body.style.fill,
            base: body.style.base,
            text: body.style.text,
        },
        state: body.state,
    });

    try {
        for (let attempt = 0; attempt < 10; attempt++) {
            const code = generateCode();
            const stored = await redis.set(code, payload, { EX: TTL_SECONDS, NX: true });
            if (stored !== null) return res.status(200).json({ code });
        }
        return res.status(500).json({ error: 'Could not generate unique code' });
    } catch (err) {
        console.error('Share error:', err);
        return res.status(503).json({ error: 'Storage unavailable' });
    }
});

// ── Load API ────────────────────────────────────────────────────

const CODE_PATTERN = /^[a-z0-9]{4,8}$/i;

app.get('/api/load', async (req, res) => {
    const { code } = req.query;
    if (!code || !CODE_PATTERN.test(code))
        return res.status(400).json({ error: 'Invalid code format' });

    try {
        const raw = await redis.get(code.toLowerCase());
        if (!raw)
            return res.status(404).json({ error: 'Card not found or link expired' });
        return res.status(200).json(JSON.parse(raw));
    } catch (err) {
        console.error('Load error:', err);
        return res.status(503).json({ error: 'Storage unavailable' });
    }
});

// ── SPA fallback ────────────────────────────────────────────────

app.get('*', (_req, res) => {
    res.sendFile(join(__dirname, 'dist', 'index.html'));
});

app.listen(PORT, () => console.log(`CharacterForge running on http://localhost:${PORT}`));
