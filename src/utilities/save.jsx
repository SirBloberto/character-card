export function saveStatic(state, style, type) {
    let data = {}
    data['state'] = {}
    for (const key in state)
        data['state'][key] = state[key];
    data['style'] = {}
    for (const key in style)
        data['style'][key] = style[key];
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