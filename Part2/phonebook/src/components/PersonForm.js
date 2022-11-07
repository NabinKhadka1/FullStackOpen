import phoneService from "../services/Phonebook";
const PersonForm = ({
  persons,
  setPersons,
  newName,
  setNewName,
  newNumber,
  setNewNumber,
  setMessage,
}) => {
  const onNameChange = (event) => setNewName(event.target.value);
  const onNumberChange = (event) => setNewNumber(event.target.value);
  const handleNameSubmit = (event) => {
    event.preventDefault();
    const newPerson = persons.filter((person) => newName === person.name);
    if (newPerson.length !== 0) {
      const changeTheNumber = window.confirm(
        `${newPerson[0].name} is already added to phonebook, replace the old number with a new one`
      );
      if (changeTheNumber) {
        const updateObject = {
          ...newPerson[0],
          number: newNumber,
        };
        phoneService
          .update(updateObject, newPerson[0].id)
          .then((returnedPhone) => {
            setPersons(
              persons.map((person) =>
                person.id !== returnedPhone.id ? person : returnedPhone
              )
            );
            setNewName("");
            setNewNumber("");
            setMessage("Phone number updated");
          });
      } else {
        setNewName("");
        setNewNumber("");
      }
      return;
    }
    const nameObject = {
      name: newName,
      number: newNumber,
    };
    phoneService.create(nameObject).then((returnedPhone) => {
      setPersons(persons.concat(returnedPhone));
      setNewName("");
      setNewNumber("");
      setMessage(`Added ${returnedPhone.name}`);
    });
  };
  return (
    <form onSubmit={handleNameSubmit}>
      <div>
        name:
        <input value={newName} onChange={onNameChange} />
      </div>
      <div>
        numbers:
        <input value={newNumber} onChange={onNumberChange} />
      </div>
      <div>
        <button type="submit">add</button>
      </div>
    </form>
  );
};
export default PersonForm;
