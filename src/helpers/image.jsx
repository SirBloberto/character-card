export const getMousePosition = (event, svg) => {
    var CTM = svg.getScreenCTM();
    return {
        x: (event.clientX - CTM.e) / CTM.a,
        y: (event.clientY - CTM.f) / CTM.d
    };
}

export const getSVGTransform = (element, type) => {
    var transforms = element.transform.baseVal;
    let transform;
    for (let i = 0; i < transforms.length; i++) {
        transform = transforms.getItem(i);
        if (transform.type === type)
            return transform;
    }
    return null;
}

export const SVGMatrix = {
    translation: {
        x: 4,
        y: 5,
    },
    scale: {
        x: 0,
        y: 3,
    }
}