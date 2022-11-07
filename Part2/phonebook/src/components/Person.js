import React from "react";

const Person = ({ name, number, deleteNumber }) => {
  return (
    <div>
      {name} {number}
      <button onClick={deleteNumber}>delete</button>
    </div>
  );
};

export default Person;
