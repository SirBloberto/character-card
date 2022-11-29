import './CharacterCard.css';
import React, { Component } from 'react'

class CharacterCard extends Component {
    render() {
        return (
            <div className='card'>
                <div id='portrait'>
                    <img src={this.props.url} alt="" width='300' height='400'></img>
                </div>
                <div className='stats'>
                    <h1>Name: {this.props.name}</h1>
                    <h1>Class: {this.props.class}</h1>
                    <h1>Strength: {this.props.strength}</h1>
                    <h1>Dexterity: {this.props.dexterity}</h1>
                    <h1>Constitution: {this.props.constitution}</h1>
                    <h1>Intelligence: {this.props.intelligence}</h1>
                    <h1>Wisdom: {this.props.wisdom}</h1>
                    <h1>Charisma: {this.props.charisma}</h1>
                </div>
            </div>
        );
    }
}

export default CharacterCard;