import Person from "./Person";
import phoneService from "../services/Phonebook";

const Persons = ({ persons, setPersons, filterValue, setMessage }) => {
  const deleteNumberHandler = (id) => {
    const person = persons.find((person) => person.id === id);
    const deleteAction = window.confirm(`Delete ${person.name} ?`);
    if (deleteAction) {
      phoneService
        .removeAction(person, id)
        .then((response) =>
          setPersons(persons.filter((person) => person.id !== id))
        )
        .catch((err) => setMessage(err));
    }
  };
  return (
    <div>
      {persons.length !== 0 &&
        persons
          .filter((person) =>
            person.name.toLowerCase().includes(filterValue.toLowerCase())
          )
          .map((person) => (
            <Person
              key={person.id}
              name={person.name}
              number={person.number}
              deleteNumber={() => deleteNumberHandler(person.id)}
            />
          ))}
    </div>
  );
};
export default Persons;
