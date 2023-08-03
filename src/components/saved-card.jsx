import { createSignal } from 'solid-js';

export default SavedCard = (name) => {
    const [collapsed, setCollapsed] = createSignal(true);

    //Need to load card
    //if collapsed.  Display only name with with colours
    //In the top right display collapse/expand and settings to style

    return (
        <>
            <Show when={!collapsed()}>

            </Show>
        </>
    );
}