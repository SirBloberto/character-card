import React, { Component } from 'react'

class CharacterCard extends Component {
    render() {
        return (
            <div className='card'>
                <img src={this.props.url} alt="" width={this.props.w} height={this.props.h}></img>
                <p>Name: {this.props.name}</p>
                <p>Class: {this.props.class}</p>
                <p>Strength: {this.props.strength}</p>
                <p>Dexterity: {this.props.dexterity}</p>
                <p>Constitution: {this.props.constitution}</p>
                <p>Intelligence: {this.props.intelligence}</p>
                <p>Wisdom: {this.props.wisdom}</p>
                <p>Charisma: {this.props.charisma}</p>
            </div>
        );
    }
}

export default CharacterCard;