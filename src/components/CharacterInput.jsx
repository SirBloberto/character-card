import { React, useState } from 'react';
import styled from 'styled-components';
import CharacterCard from './CharacterCard';

const StyledDiv = styled.div`
    display: flex;
    gap: 5rem;

    input[type=text] {
        outline: none;
        padding: 0.75rem;
        font-size: 1.5rem;
        border: none;
        border-radius: 5px;
    }

    .form {
        display: flex;
        justify-content: center;
        align-items: center;
    }

    form {
        display: grid;
        grid-template-columns: repeat(2, 5rem);
        gap: 1rem;

        div {
            display: flex;
            flex-direction: column;
            gap: 0.25rem;
        }
    }

    .bar {
        font-size: 1.5rem;
        grid-column: span 2;
    }

    .cell {
        font-size: 1.5rem;
        input {
            width: 2rem;
            text-align: center;
        }
    }

    #character-card-holder {
        width: 100%;
    }
`;

const CharacterInput = () => {
    const [style, setStyle] = useState({
        trim: '#000',
        base: 'rgb(216, 216, 216)',
        fill: 'rgb(150, 150, 150)'
    });

    const [state, setState] = useState({
        name: '',
        class: '',
        strength: '',
        dexterity: '',
        constitution: '',
        intelligence: '',
        wisdom: '',
        charisma: '',
        health: '',
        armor: '',
        image: null
    });

    function handleStat(event) {
        const target = event.target;
        setState({
            ...state,
            [target.name]: target.value
        });
    }

    function handleImage(event) {
        var reader = new FileReader();
        reader.onloadend = () => {
            setState({
                ...state,
                image: reader.result
            });
        }
        //Need to make sure we select an image
        reader.readAsDataURL(event.target.files[0]);
    }

    function handleColor(name, hex) {
        setStyle({
            ...style,
            [name]: hex
        })
    }

    function downloadJSON() {
        let json = {
            style: style,
            name: state.name,
            class: state.class,
            strength: state.strength,
            dexterity: state.dexterity,
            constitution: state.constitution,
            intelligence: state.ingelligence,
            wisdom: state.wisdom,
            charisma: state.charisma,
            health: state.health,
            armor: state.armor,
            image: state.image
        }

        const blob = new Blob([JSON.stringify(json)], { type: 'text/json' })
        const link = document.createElement('a')
        link.download = json.Name + '-character-card.json'
        link.href = window.URL.createObjectURL(blob)
        link.click()
        link.remove()
    }

    function downloadCard() {
        const svg = document.getElementById('character-card')
        const base64doc = window.btoa(svg.outerHTML);
        const link = document.createElement('a');
        link.download = 'download.svg';
        link.href = 'data:image/svg+xml;base64,' + base64doc;
        link.click()
        link.remove()
    }

    return (
        <StyledDiv>
            <div className="form">
                <form>
                    <div className="bar">
                        <label>Name</label>
                        <input type='text' name='name' value={state.name} onChange={handleStat} />
                    </div>
                    <div className="bar">
                        <label>Class</label>
                        <input type='text' name='class' value={state.class} onChange={handleStat} />
                    </div>
                    <div className="cell">
                        <label>STR</label>
                        <input type='text' inputMode='numeric' name='strength' value={state.strength} onChange={handleStat} />
                    </div>
                    <div className="cell">
                        <label>INT</label>
                        <input type='text' name='intelligence' value={state.intelligence} onChange={handleStat} />
                    </div>
                    <div className="cell">
                        <label>DEX</label>
                        <input type='text' name='dexterity' value={state.dexterity} onChange={handleStat} />
                    </div>
                    <div className="cell">
                        <label>WIS</label>
                        <input type='text' name='wisdom' value={state.wisdom} onChange={handleStat} />
                    </div>
                    <div className="cell">
                        <label>CON</label>
                        <input type='text' name='constitution' value={state.constitution} onChange={handleStat} />
                    </div>
                    <div className="cell">
                        <label>CHA</label>
                        <input type='text' name='charisma' value={state.charisma} onChange={handleStat} />
                    </div>
                    <div className="cell">
                        <label>HP</label>
                        <input type='text' name='health' value={state.health} onChange={handleStat} />
                    </div>
                    <div className="cell">
                        <label>AC</label>
                        <input type='text' name='armor' value={state.armor} onChange={handleStat} />
                    </div>
                    <div className="bar">
                        <label>Image</label>
                        <input type='file' name='image' accept='image/*' onChange={handleImage} />
                    </div>
                </form>
            </div>
            <div id="character-card-holder">
                <CharacterCard state={state} style={style} />
                <button onClick={downloadJSON}>Download Json</button>
                <button onClick={downloadCard}>Download Card</button>
            </div>
        </StyledDiv>
    );
}

export default CharacterInput;