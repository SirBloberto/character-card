export default function download(svg) {
    let svgCopy = svg()()().cloneNode(true);
    let fields = svgCopy.querySelectorAll('.field');
    //Handle Name
    for (const field of fields.values()) {
        field.querySelector('text').textContent = field.querySelector('input').value;
        field.removeChild(field.querySelector('foreignObject'));
    }
    const base64doc = window.btoa(svgCopy.outerHTML);
    const link = document.createElement('a');
    link.download = 'name' + '.svg';
    link.href = `data:image/svg+xml;base64,${base64doc}`;
    link.click();
    link.remove();
}

const handleFields = (fields) => {
    
}