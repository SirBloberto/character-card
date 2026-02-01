let name = 'character-card';

export function downloadSVG(svg, state) {
    while(typeof(svg) == 'function')
        svg = svg()
    svg = svg.cloneNode(true);
    let fields = svg.querySelectorAll('.field');
    for (const field of fields.values()) {
        field.querySelector('text').textContent = field.querySelector('input').value;
        field.removeChild(field.querySelector('foreignObject'));
    }
    let images = svg.querySelectorAll('.image');
    for (const image of images.values()) {
        image.removeChild(image.querySelector('svg'));
        let imageName = image.getAttribute('name');
        image.querySelector('image').setAttribute("transform", `translate(${state[imageName].translation.x} ${state[imageName].translation.y}) scale(${state[imageName].scale.x} ${state[imageName].scale.y})`);
    }
    const data = `data:image/svg+xml;base64,${window.btoa(svg.outerHTML)}`;
    if (svg.querySelector('[name=name]') && svg.querySelector('[name=name]').textContent != '')
        name = svg.querySelector('[name=name]').textContent
    const link = document.createElement('a');
    link.download = `${name}.${type}`;
    link.href = data;
    link.click();
    link.remove();
}