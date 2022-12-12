import { Button } from "@mui/material";
import { useState } from "react";

const SearchForm = ({ callback }) => {
  const [query, setQuery] = useState();

  const handleSubmit = (e) => {
    e.preventDefault();
    callback(query);
  };
  return (
    <form onSubmit={handleSubmit} className="form-searchForm">
      <input
        className="input-searchform"
        type="text"
        onChange={(e) => setQuery(e.target.value)}
        style={{
          width: "70%",
          height: "40px",
          padding: "8px",
        }}
      />
      <Button
        type="submit"
        className="btn-cadastro"
        variant="contained"
        sx={{ fontSize: 14 }}
      >
        Buscar
      </Button>
    </form>
  );
};

export default SearchForm;
