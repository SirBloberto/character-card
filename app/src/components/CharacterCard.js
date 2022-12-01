import './CharacterCard.css';
import React, { useState, useEffect } from 'react'

export default function CharacterCard(props) {
    const [stylePath, setState] = useState({
        style: "a.css"
    });

    useEffect(() => {
        var head = document.head;
        var link = document.createElement("link");
    
        link.type = "text/css";
        link.rel = "stylesheet";
        link.href = stylePath.style;
    
        head.appendChild(link);
    
        return () => { head.removeChild(link); }
    
    }, [stylePath]);

    function onChange() {
        setState({...stylePath, style: "b.css"})
    }

    function downloadJSON() {
        let json = {
            Name: props.name,
            Class: props.class,
            Strength: props.strength,
            Dexterity: props.dexterity,
            Constitution: props.constitution,
            Intelligence: props.intelligence,
            Wisdom: props.wisdom,
            Charisma: props.charisma
        }

        const blob = new Blob([JSON.stringify(json)], {type:'text/json'})
        const a = document.createElement('a')
        a.download = json.Name + '-character-card.json'
        a.href = window.URL.createObjectURL(blob)
        const clickEvent = new MouseEvent('click', {
            view: window,
            bubbles: true,
            cancelable: true
        })
        a.dispatchEvent(clickEvent)
        a.remove()
    }

    return (
        <div className='card'>
            <button onClick={onChange}>Button</button>
            <button onClick={downloadJSON}>Download JSON</button>
            <div id='portrait'>
                <img src={props.url} alt="" width='300' height='400'></img>
            </div>
            <div className='stats'>
                <h1>Name: {props.name}</h1>
                <h1>Class: {props.class}</h1>
                <h1>Strength: {props.strength}</h1>
                <h1>Dexterity: {props.dexterity}</h1>
                <h1>Constitution: {props.constitution}</h1>
                <h1>Intelligence: {props.intelligence}</h1>
                <h1>Wisdom: {props.wisdom}</h1>
                <h1>Charisma: {props.charisma}</h1>
            </div>
        </div>
    );
}