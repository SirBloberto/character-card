export default function save(state, style, type) {
    let data = {}
    data['state'] = state;
    data['style'] = style;
    data['type'] = type;
    console.log(data);
    return data;
}