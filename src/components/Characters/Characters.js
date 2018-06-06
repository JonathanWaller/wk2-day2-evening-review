import React, { Component } from 'react';
import axios from 'axios';
import Character from './Character/Character';

class Characters extends Component {
  //****** the usual way!! ******
  // constructor(props) {
  //   super(props);
  //   this.state = {
  //     characters: ['Darth Vader', 'Cristian', 'Luke', 'Brandon'],
  //     newCharacter: ''
  //   };
  // }

  //****** the not-so-usual way!!! ******/
  //props is still available here
  state = {
    characters: ['Darth Vader', 'Cristian', 'Luke', 'Brandon'],
    newCharacter: ''
  };

  // arguably the most heavily used lifecycle hook
  // used to make asynchronous calls.
  // In this axios call, I'm grabbing an array of characters represented as objects, and then replacing the characters array on state.
  // [ { name: 'Luke Skywalker', hair_color: 'blonde' }, { name, hair_color }, { same }, { same }, { same } ]
  componentDidMount() {
    axios.get('https://www.swapi.co/api/people').then(response => {
      //if you check the console, you'll see the array of objects...
      console.log(response.data.results);

      this.setState({ characters: response.data.results });
    });
  }

  // the following methods all use the 'this' keyword meaning I would normally have to bind,
  // but I instead just turned them into arrow functions.
  onDeleteHandler = index => {
    const charactersCopy = this.state.characters.slice();
    charactersCopy.splice(index, 1);
    this.setState({ characters: charactersCopy });
  };

  // same here
  onChangeHandler = e => {
    this.setState({ newCharacter: e.target.value });
  };

  // same here
  onSubmitHandler = e => {
    //prevents the page refresh on the 'onSubmit' event that usually happens after submitting.
    e.preventDefault();

    // the ... (called the 'spread operator') copies the following array into a new array
    // the { name: this.state.newCharacter } is the new object I want to add to the copied array.
    // notice - the [] denotes the new array that I'm copying into.
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
          //passing in props here.
          id={index}
          //passed down the delete function so that the Character component can call it when it's clicked.
          deleteElement={this.onDeleteHandler}
          obj={character}
          key={index}
        />
      );
    });

    // putting the form with the onSubmitHandler along with button as the last thing in the form
    //    allows me to hit the 'Enter' button to add a new item.
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
