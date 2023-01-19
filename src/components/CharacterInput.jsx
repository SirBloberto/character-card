import { React, useState} from 'react';
import styled from 'styled-components';
import CharacterCard from './CharacterCard';
import { ChromePicker } from 'react-color';

const StyledDiv = styled.div`
  display: grid;
  gap: 1rem;
  grid-template-columns: 1fr 1fr;

  input[type=number]::-webkit-inner-spin-button, 
  input[type=number]::-webkit-outer-spin-button { 
      -webkit-appearance: none;
      -moz-appearance: none;
      appearance: none;
      margin: 0; 
  }

  form {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 1rem;
  }

  form div {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 1rem;
  }

  input {
    height: 2rem;
    outline: none;
    border: none;
    border-radius: 5px;
    font-size: 1rem;
    margin-bottom: 1rem;
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
      <form>
        <div>
          <label>Name</label>
          <input type='text' name='name' value={state.name} onChange={handleStat}/>
        </div>
        <div>
          <label>Class</label>
          <input type='text' name='class' value={state.class} onChange={handleStat}/>
        </div>
        <div>
          <label>Strength</label>
          <input type='number' inputMode='numeric' name='strength' value={state.strength} onChange={handleStat}/>
        </div>
        <div>
          <label>Dexterity</label>
          <input type='number' name='dexterity' value={state.dexterity} onChange={handleStat}/>
        </div>
        <div>
          <label>Constitution</label>
          <input type='number' name='constitution' value={state.constitution} onChange={handleStat}/>
        </div>
        <div>
          <label>Intelligence</label>
          <input type='number' name='intelligence' value={state.intelligence} onChange={handleStat}/>
        </div>
        <div>
          <label>Wisdom</label>
          <input type='number' name='wisdom' value={state.wisdom} onChange={handleStat}/>
        </div>
        <div>
          <label>Charisma</label>
          <input type='number' name='charisma' value={state.charisma} onChange={handleStat}/>
        </div>
        <div>
          <label>Health</label>
          <input type='number' name='health' value={state.health} onChange={handleStat}/>
        </div>
        <div>
          <label>Armor</label>
          <input type='number' name='armor' value={state.armor} onChange={handleStat}/>
        </div>
        <div>
          <label>Image</label>
          <input type='file' name='image' accept='image/*' onChange={handleImage}/>
        </div>
      </form>
      <div>
        <ChromePicker color={style.trim} onChange={(color) => handleColor('trim', color.hex)}/>
        <ChromePicker color={style.base} onChange={(color) => handleColor('base', color.hex)}/>
        <ChromePicker color={style.fill} onChange={(color) => handleColor('fill', color.hex)}/>
        <CharacterCard state={state} style={style}/>
        <button onClick={downloadJSON}>Download Json</button>
        <button onClick={downloadCard}>Download Card</button>
      </div>
    </StyledDiv>
  );
}

export default CharacterInput;