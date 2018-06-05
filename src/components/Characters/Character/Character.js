import React from 'react';

const Character = props => {
  let { obj, deleteElement, id } = props;
  return (
    <div onClick={() => deleteElement(id)}>
      <p>{obj.name}</p>
      <br />
      <br />
    </div>
  );
};

export default Character;
