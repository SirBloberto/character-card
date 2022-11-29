import React, { Component } from 'react'
import ReactDOM from "react-dom";
import CharacterCard from './CharacterCard';

export default class CharacterInput extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            class: '',
            strength: '',
            dexterity: '',
            constitution: '',
            intelligence: '',
            wisdom: '',
            charisma: ''
        }

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        const target = event.target;
        this.setState({
            [target.name]: target.value
        });
    }

    handleSubmit(event) {
        const card = ReactDOM.createRoot(document.getElementById('card'));
        const element = <CharacterCard
            name={this.state.name}
            class={this.state.class}
            strength={this.state.strength}
            dexterity={this.state.dexterity}
            constitution={this.state.constitution}
            intelligence={this.state.intelligence}
            wisdom={this.state.wisdom}
            charisma={this.state.charisma}
        />
        card.render(element);
        event.preventDefault();
    }

    render() {
        return (
            <div id='card'>
                <form onSubmit={this.handleSubmit}>
                    <label>Name:<br /><input type="text" name="name" value={this.state.name} onChange={this.handleChange} /></label><br />
                    <label>Class:<br /><input type="text" name="class" value={this.state.class} onChange={this.handleChange} /></label><br />
                    <label>Strength:<br /><input type="text" name="strength" value={this.state.strength} onChange={this.handleChange} /></label><br />
                    <label>Dexterity:<br /><input type="text" name="dexterity" value={this.state.dexterity} onChange={this.handleChange} /></label><br />
                    <label>Constitution:<br /><input type="text" name="constitution" value={this.state.constitution} onChange={this.handleChange} /></label><br />
                    <label>Intelligence:<br /><input type="text" name="intelligence" value={this.state.intelligence} onChange={this.handleChange} /></label><br />
                    <label>Wisdom:<br /><input type="text" name="wisdom" value={this.state.wisdom} onChange={this.handleChange} /></label><br />
                    <label>Charisma:<br /><input type="text" name="charisma" value={this.state.charisma} onChange={this.handleChange} /></label><br /><br />
                    <input type="submit" value="Create" />
                    <br />
                </form>
            </div>
        );
    }
}