import { createUniqueId } from "solid-js";

export default function save(_, state, style, type, setId, setSaved) {
    let data = {};
    data['type'] = type;
    data['state'] = state;
    data['style'] = style;
    data['id'] = createUniqueId();
    setId(data['id']);
    let storage = JSON.parse(window.localStorage.getItem("character-card"))
    storage.push(data);
    window.localStorage.setItem("character-card", JSON.stringify(storage))
    setSaved(storage);
}