export default function save(state, style, type) {
    let data = {}
    data['state'] = state;
    data['style'] = style;
    data['type'] = type;
    let storage = window.localStorage;
    if (!storage['character-card'])
        storage = {}
    storage = JSON.parse(storage['character-card'])
    if (!storage['cards'])
        storage['cards'] = {}
    storage['cards'][state['name']] = data;
    window.localStorage.setItem('character-card', JSON.stringify(storage));
}