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
        link.href = stylePath;
    
        head.appendChild(link);
    
        return () => { head.removeChild(link); }
    
    }, [stylePath]);

    return (
        <div className='card'>
            <button onClick={setState}>Button</button>
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