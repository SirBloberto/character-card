import './CharacterInput.css';
import React, { Component } from 'react'
import ReactDOM from "react-dom";
import CharacterCard from './CharacterCard';
import ImageUpload from '../services/ImageUpload';

export default class CharacterInput extends Component {
    constructor(props) {
        super(props);
        this.selectImage = this.selectImage.bind(this);
        this.upload = this.upload.bind(this);
        this.state = {
            name: '',
            class: '',
            strength: '',
            dexterity: '',
            constitution: '',
            intelligence: '',
            wisdom: '',
            charisma: '',
            image: null
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

    selectImage(event) {
        this.setState({
            image: URL.createObjectURL(event.target.files[0])
        });
    }

    upload() {
        ImageUpload.upload(this.state.currentFile)
    }

    handleSubmit(event) {
        console.log(this.state.image);
        const card = ReactDOM.createRoot(document.getElementById('create'));
        const element = <CharacterCard
            url={this.state.image}
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
            <div id='create'>
                <form onSubmit={this.handleSubmit}>
                    <label>Name:<br /><input type="text" name="name" value={this.state.name} onChange={this.handleChange} /></label><br /><br />
                    <label>Class:<br /><input type="text" name="class" value={this.state.class} onChange={this.handleChange} /></label><br /><br />
                    <label>Strength:<br /><input type="text" name="strength" value={this.state.strength} onChange={this.handleChange} /></label><br /><br />
                    <label>Dexterity:<br /><input type="text" name="dexterity" value={this.state.dexterity} onChange={this.handleChange} /></label><br /><br />
                    <label>Constitution:<br /><input type="text" name="constitution" value={this.state.constitution} onChange={this.handleChange} /></label><br /><br />
                    <label>Intelligence:<br /><input type="text" name="intelligence" value={this.state.intelligence} onChange={this.handleChange} /></label><br /><br />
                    <label>Wisdom:<br /><input type="text" name="wisdom" value={this.state.wisdom} onChange={this.handleChange} /></label><br /><br />
                    <label>Charisma:<br /><input type="text" name="charisma" value={this.state.charisma} onChange={this.handleChange} /></label><br /><br />
                    <div>
                        <div className="row">
                            <div className="col-8">
                                <label className="imageBtn">
                                    <input type="file" accept="image/*" onChange={this.selectImage} />
                                </label>
                            </div>
                        </div>
                    </div>
                    <br/><br/>
                    <input type="submit" value="Create" />
                    <br />
                </form>
            </div>
        );
    }
}