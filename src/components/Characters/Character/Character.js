import React from 'react';

const Character = props => {
  // I'm expecting to receieve props called obj, deleteElement, and id
  // from the props that were passed in
  let { obj, deleteElement, id } = props;
  return (
    // the onClick on this outer div lets me delete the character as long as I click somewhere
    //    within the div.
    <div
      style={{ border: '1px solid black', margin: '5px' }}
      onClick={() => deleteElement(id)}
    >
      <p>{obj.name}</p>
      <br />
    </div>
  );
};

export default Character;
