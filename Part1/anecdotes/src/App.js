import { useState } from "react";
const anecdotes = [
  "If it hurts, do it more often.",
  "Adding manpower to a late software project makes it later!",
  "The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.",
  "Any fool can write code that a computer can understand. Good programmers write code that humans can understand.",
  "Premature optimization is the root of all evil.",
  "Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.",
  "Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.",
];
const NextAnecdote = ({ selected, point }) => {
  return (
    <>
      <h1>Anecdote of the day</h1>
      <p>{anecdotes[selected]}</p>
      <p>has {point[selected]} votes</p>
    </>
  );
};

const Button = ({ click, text }) => {
  return <button onClick={click}>{text}</button>;
};

const HighestVoteAnecdote = ({ point }) => {
  let maxVotedIndex = Object.keys(point).reduce((a, b) =>
    point[a] > point[b] ? a : b
  );
  return (
    <>
      <h1>Anecdote with most votes</h1>
      <p>{anecdotes[maxVotedIndex]}</p>
    </>
  );
};
function App() {
  let randomLength = Math.floor(Math.random() * anecdotes.length);

  const [selected, setSelected] = useState(0);
  const [point, setPoint] = useState({
    0: 1,
    1: 1,
    2: 1,
    3: 3,
    4: 2,
    5: 2,
    6: 4,
  });

  const handleVote = () => {
    setPoint({
      ...point,
      [selected]: point[selected] + 1,
    });
  };
  return (
    <>
      <NextAnecdote selected={selected} point={point} />
      <Button click={handleVote} text="vote" />
      <Button click={() => setSelected(randomLength)} text="next anecdote" />
      <HighestVoteAnecdote point={point} />
    </>
  );
}

export default App;
