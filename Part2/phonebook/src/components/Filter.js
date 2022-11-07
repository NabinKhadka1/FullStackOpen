const Filter = ({ filterValue, setFilterValue }) => {
  const handleFilterOperation = (event) => setFilterValue(event.target.value);

  return (
    <p>
      filter shown with
      <input value={filterValue} onChange={handleFilterOperation} />
    </p>
  );
};
export default Filter;
