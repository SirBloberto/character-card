let selectedElementDrag, offset, transformTranslate;
export const startDrag = (event) => {
    let svg = document.getElementById('character-card');
    if (evt.target.classList.contains('draggable')) {
        selectedElementDrag = evt.target;
        offset = getMousePosition(evt);
        var transforms = selectedElementDrag.transform.baseVal;
        for (let i = 0; i < transforms.length; i++) {
            if (transforms.getItem(i).type === SVGTransform.SVG_TRANSFORM_TRANSLATE){
                transformTranslate = transforms.getItem(i);
                break;
            }
        }
        if(!transformTranslate) {
            transformTranslate = svg.createSVGTransform();
            transformTranslate.setTranslate(0, 0);
            selectedElementDrag.transform.baseVal.insertItemBefore(transformTranslate, 0);
        }
        offset.x -= transformTranslate.matrix.e;
        offset.y -= transformTranslate.matrix.f;
    }
}

export const drag = (event) => {
    if (selectedElementDrag) {
        var coord = getMousePosition(evt);
        transformTranslate.setTranslate(coord.x - offset.x, coord.y - offset.y);
    }
}

export const endDrag = (event) => {
    selectedElementDrag = null;
}

const getMousePosition = (event) => {
    let svg = document.getElementById("character-card");
    var CTM = svg.getScreenCTM();
    return {
        x: (evt.clientX - CTM.e) / CTM.a,
        y: (evt.clientY - CTM.f) / CTM.d
    };
}

let transformScale;
export const scroll = (event) => {
    let svg = document.getElementById('character-card');
    if (evt.target.classList.contains('draggable')) {
        let target = evt.target
        var transforms = target.transform.baseVal;
        for (let i = 0; i < transforms.length; i++) {
            if (transforms.getItem(i).type === SVGTransform.SVG_TRANSFORM_SCALE){
                transformScale = transforms.getItem(i);
                break;
            }
        }
        let mousePosition = getMousePosition(evt);
        mousePosition.x -= transformTranslate.matrix.e;
        mousePosition.y -= transformTranslate.matrix.f;
        if(!transformScale) {
            transformScale = svg.createSVGTransform();
            transformScale.setScale(1, 1);
            target.transform.baseVal.appendItem(transformScale);
        }
        let scaleFactor = evt.deltaY < 0 ? 1.1 : 0.9
        transformScale.setScale(transformScale.matrix.a * scaleFactor, transformScale.matrix.d * scaleFactor)
        transformTranslate.setTranslate(transformTranslate.matrix.e + mousePosition.x * (1 - scaleFactor), transformTranslate.matrix.f + mousePosition.y * (1 - scaleFactor))
    }
}