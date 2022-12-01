import { useState } from "react";

const SearchForm = ({ callback }) => {
  const [query, setQuery] = useState();

  const handleSubmit = (e) => {
    e.preventDefault();
    callback(query);
  };
  return (
    <form onSubmit={handleSubmit}>
      <input type="text" onChange={(e) => setQuery(e.target.value)} />
      <input type="submit" value="Buscar" />
    </form>
  );
};

export default SearchForm;
