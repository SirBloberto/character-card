import { saveStatic } from "./save";

let name = 'character-card';

export const downloadSVG = (svg) => {
    let svgCopy = svg()()().cloneNode(true);
    let fields = svgCopy.querySelectorAll('.field');
    for (const field of fields.values()) {
        field.querySelector('text').textContent = field.querySelector('input').value;
        field.removeChild(field.querySelector('foreignObject'));
    }
    let images = svgCopy.querySelectorAll('.image');
    for (const image of images.values())
        image.removeChild(image.querySelector('foreignObject'));
    const data = `data:image/svg+xml;base64,${window.btoa(svgCopy.outerHTML)}`;
    if (svgCopy.querySelector('[name=name]') && svgCopy.querySelector('[name=name]').textContent != '')
        name = svgCopy.querySelector('[name=name]').textContent
    download(data, name, 'svg');
}

export const downloadJSON = (state, style, type) => {
    const data = new Blob([JSON.stringify(saveStatic(state, style, type))], { type: 'text/json' });
    if (state['name'])
        name = state['name']
    download(window.URL.createObjectURL(data), name, 'json');
}

const download = (data, name, type) => {
    const link = document.createElement('a');
    link.download = `${name}.${type}`;
    link.href = data;
    link.click();
    link.remove();
}