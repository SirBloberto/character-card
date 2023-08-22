export default function downloadSVG(svg) {
    let svgCopy = svg()()().cloneNode(true);
    let fields = svgCopy.querySelectorAll('.field');
    for (const field of fields.values()) {
        field.querySelector('text').textContent = field.querySelector('input').value;
        field.removeChild(field.querySelector('foreignObject'));
    }
    const base64doc = window.btoa(svgCopy.outerHTML);
    const link = document.createElement('a');
    link.download = 'name' + '.svg';
    link.href = `data:image/svg;base64,${base64doc}`;
    link.click();
    link.remove();
}

export const download = (data, type, name) => {
    const link = document.createElement('a');
    link.download = `${name}.${type}`;
    link.href = `data:image/${type};base64,${base64doc}`;
    link.click();
    link.remove();
}