const FONTS_URL = 'https://fonts.googleapis.com/css2?family=Cinzel:wght@500;700&family=Inter:wght@400;500;600&display=swap';

// Cached after first export so subsequent exports are instant
let cachedFontCSS = null;

function arrayBufferToBase64(buffer) {
    const bytes = new Uint8Array(buffer);
    const CHUNK = 0x8000;
    let binary = '';
    for (let i = 0; i < bytes.length; i += CHUNK) {
        binary += String.fromCharCode(...bytes.subarray(i, i + CHUNK));
    }
    return btoa(binary);
}

async function getInlinedFontCSS() {
    if (cachedFontCSS !== null) return cachedFontCSS;
    try {
        const css = await fetch(FONTS_URL).then(r => r.text());
        const urls = [...new Set(
            [...css.matchAll(/url\((https:\/\/fonts\.gstatic\.com[^)]+)\)/g)].map(m => m[1])
        )];
        const pairs = await Promise.all(urls.map(async url => {
            const buf = await fetch(url).then(r => r.arrayBuffer());
            const mime = url.includes('woff2') ? 'font/woff2' : 'font/woff';
            return [url, `data:${mime};base64,${arrayBufferToBase64(buf)}`];
        }));
        let inlined = css;
        for (const [url, dataUri] of pairs) inlined = inlined.replaceAll(url, dataUri);
        cachedFontCSS = inlined;
    } catch {
        cachedFontCSS = '';
    }
    return cachedFontCSS;
}

function cardName(svg) {
    const nameEl = svg.querySelector('[name=name]');
    const text = nameEl?.querySelector('input')?.value || nameEl?.textContent || '';
    return text.trim() || 'character';
}

function prepareClone(svg, state) {
    while (typeof svg === 'function') svg = svg();
    svg = svg.cloneNode(true);
    for (const field of svg.querySelectorAll('.field').values()) {
        field.querySelector('text').textContent = field.querySelector('input').value;
        field.removeChild(field.querySelector('foreignObject'));
    }
    for (const image of svg.querySelectorAll('.image').values()) {
        image.removeChild(image.querySelector('svg'));
        const imageName = image.getAttribute('name');
        const s = state[imageName].scale;
        const t = state[imageName].translation;
        image.querySelector('image').setAttribute('transform',
            `translate(${t.x} ${t.y}) scale(${s} ${s})`);
    }
    return svg;
}

export function downloadSVG(svg, state) {
    const clone = prepareClone(svg, state);
    const name = cardName(clone);
    const data = `data:image/svg+xml;base64,${window.btoa(unescape(encodeURIComponent(clone.outerHTML)))}`;
    const link = document.createElement('a');
    link.download = `${name}.svg`;
    link.href = data;
    link.click();
    link.remove();
}

export async function downloadPNG(svg, state) {
    const clone = prepareClone(svg, state);
    const name = cardName(clone);
    const viewBox = clone.getAttribute('viewBox')?.split(' ').map(Number);
    const W = viewBox?.[2] ?? 420;
    const H = viewBox?.[3] ?? 300;
    const SCALE = 3;

    // Inline fonts so Cinzel/Inter render correctly in the canvas
    const fontCSS = await getInlinedFontCSS();
    if (fontCSS) {
        const style = document.createElementNS('http://www.w3.org/2000/svg', 'style');
        style.textContent = fontCSS;
        clone.insertBefore(style, clone.firstChild);
    }

    clone.setAttribute('width', W);
    clone.setAttribute('height', H);

    const svgBlob = new Blob([new XMLSerializer().serializeToString(clone)], { type: 'image/svg+xml;charset=utf-8' });
    const url = URL.createObjectURL(svgBlob);

    const img = new Image();
    img.onload = () => {
        const canvas = document.createElement('canvas');
        canvas.width = W * SCALE;
        canvas.height = H * SCALE;
        const ctx = canvas.getContext('2d');
        ctx.scale(SCALE, SCALE);
        ctx.drawImage(img, 0, 0);
        URL.revokeObjectURL(url);
        canvas.toBlob((blob) => {
            const link = document.createElement('a');
            link.download = `${name}.png`;
            link.href = URL.createObjectURL(blob);
            link.click();
            setTimeout(() => URL.revokeObjectURL(link.href), 100);
            link.remove();
        }, 'image/png');
    };
    img.onerror = () => URL.revokeObjectURL(url);
    img.src = url;
}

export async function printCard(svg, state) {
    const clone = prepareClone(svg, state);
    const viewBox = clone.getAttribute('viewBox')?.split(' ').map(Number);
    const W = viewBox?.[2] ?? 420;
    const H = viewBox?.[3] ?? 300;

    // Physical card dimensions: 100mm wide, proportional height
    const printW = 100;
    const printH = Math.round((H / W) * printW * 10) / 10;

    const fontCSS = await getInlinedFontCSS();
    if (fontCSS) {
        const style = document.createElementNS('http://www.w3.org/2000/svg', 'style');
        style.textContent = fontCSS;
        clone.insertBefore(style, clone.firstChild);
    }

    const svgData = new XMLSerializer().serializeToString(clone);
    const html = `<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<style>
  @page { margin: 0; size: ${printW}mm ${printH}mm; }
  html, body { margin: 0; padding: 0; width: ${printW}mm; height: ${printH}mm; overflow: hidden; background: white; }
  svg { display: block; width: 100%; height: 100%; }
</style>
</head>
<body>
${svgData}
<script>window.onload = () => window.print();</script>
</body>
</html>`;

    const blob = new Blob([html], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    window.open(url, '_blank');
    setTimeout(() => URL.revokeObjectURL(url), 15000);
}
