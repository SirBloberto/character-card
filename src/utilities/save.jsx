export function saveStatic(state, style, type) {
    let data = {}
    data['state'] = saveObject(state);
    data['style'] = saveObject(style);
    data['type'] = type;
    return data;
}

export function saveDynamic(state, style, type) {
    let data = {}
    data['state'] = state;
    data['style'] = style;
    data['type'] = type;
    return data;
}

function saveObject(object) {
    let data = {};
    for (const key in object) {
        if (typeof(object[key]) == 'object')
            data[key] = saveObject(object[key]);
        else
            data[key] = object[key];
    }
    return data;
}