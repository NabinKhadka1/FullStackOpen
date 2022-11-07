import { useState, useEffect } from "react";
import Filter from "./components/Filter";
import PersonForm from "./components/PersonForm";
import Persons from "./components/Persons";
import phoneService from "./services/Phonebook";
import Notification from "./components/Notification";
import "./App.css";

function App() {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [filterValue, setFilterValue] = useState("");
  const [message, setMessage] = useState("");

  useEffect(() => {
    phoneService.getAll().then((returnedPhone) => {
      setPersons(returnedPhone);
    });
  }, []);

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={message} />

      <Filter filterValue={filterValue} setFilterValue={setFilterValue} />

      <h3>Add a new</h3>
      <PersonForm
        persons={persons}
        setPersons={setPersons}
        newName={newName}
        setNewName={setNewName}
        newNumber={newNumber}
        setNewNumber={setNewNumber}
        setMessage={setMessage}
        
      />
      <h3>Numbers</h3>

      <Persons
        persons={persons}
        setPersons={setPersons}
        filterValue={filterValue}
        setMessage={setMessage}
      />
    </div>
  );
}

export default App;
