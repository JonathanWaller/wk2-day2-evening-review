import React, { Component } from 'react';
import axios from 'axios';
import Character from './Character/Character';

class Characters extends Component {
  state = {
    characters: ['Darth Vader', 'Cristian', 'Luke', 'Brandon'],
    newCharacter: ''
  };

  componentDidMount() {
    axios.get('https://www.swapi.co/api/people').then(response => {
      console.log(response.data.results);
      this.setState({ characters: response.data.results });
    });
  }

  onDeleteHandler = index => {
    const charactersCopy = this.state.characters.slice();
    charactersCopy.splice(index, 1);
    this.setState({ characters: charactersCopy });
  };

  onChangeHandler = e => {
    this.setState({ newCharacter: e.target.value });
  };

  onSubmitHandler = e => {
    e.preventDefault();

    this.setState({
      characters: [...this.state.characters, { name: this.state.newCharacter }],
      newCharacter: ''
    });
  };

  render() {
    const { characters } = this.state;

    const listOfCharacters = characters.map((character, index) => {
      return (
        <Character
          id={index}
          deleteElement={this.onDeleteHandler}
          obj={character}
          key={index}
        />
      );
    });

    return (
      <div>
        <form onSubmit={this.onSubmitHandler}>
          <input
            value={this.state.newCharacter}
            onChange={this.onChangeHandler}
            type="text"
          />
          <button>Submit</button>
        </form>
        {listOfCharacters}
      </div>
    );
  }
}

export default Characters;
