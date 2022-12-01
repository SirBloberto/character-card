import './CharacterCard.css';
import React, { useState, useEffect } from 'react'
import Select from 'react-select';

export default function CharacterCard(props) {
    const [stylePath, setState] = useState({
        style: ""
    });

    const optionList = [
        { value: "b.css", label: "Square" },
        { value: "a.css", label: "Circle" }
    ];

    useEffect(() => {
        var head = document.head;
        var link = document.createElement("link");

        link.type = "text/css";
        link.rel = "stylesheet";
        link.href = stylePath.style;

        head.appendChild(link);

        return () => { head.removeChild(link); }

    }, [stylePath]);

    function handleSelect(data) {
        setState({ ...stylePath, style: data.value })
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
        <div>
            <div className="dropdown-container">
                <Select
                    options={optionList}
                    placeholder="Select color"
                    value={stylePath}
                    label="Theme"
                    onChange={handleSelect}
                    isSearchable={true}
                />
            </div>
            <div className='card'>

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
            <form>
                <input type="submit" value="Create New Character" /><br />
            </form>
        </div>
    );
}