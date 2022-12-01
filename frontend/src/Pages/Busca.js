import "./Busca.css";
import Button from "@mui/material/Button";

import { useSearchParams, Link } from "react-router-dom";
import { useFetch } from "../Hooks/useFetch";
import SearchForm from "../Components/SearchForm";
import { useEffect, useState } from "react";

const Busca = () => {
  const [searchParams] = useSearchParams();

  const url =
    "http://localhost:3000/pacientes" +
    (searchParams ? "?" : "") +
    searchParams;

  const { data: items, loading, erro } = useFetch(url);

  const [data, setData] = useState(items);

  useEffect(() => {
    setData(items);
  }, [items]);

  function onSearch(value) {
    if (value === "") {
      setData(items);
    }
    const previous = items;
    const filter = previous.filter((item) => {
      const index = item.nome.toLowerCase().indexOf(value.toLowerCase());
      if (index > -1) {
        return true;
      } else {
        return false;
      }
    });
    setData(filter);
    // setData((previous) =>
    //   previous.filter((item) => item.nome.indexOf(value) > -1)
    // );
  }

  return (
    <div className="container-busca">
      <div className="quadro">
        <h1>Busca de registro</h1>
        <div className="search">
          <div className="input-btn-buscar">
            <SearchForm callback={onSearch} />
          </div>
          <Button variant="contained" size="large" href="../Cadastro">
            Novo
          </Button>
        </div>
        <div className="lista">
          <ul className="product">
            {erro && <p>{erro}</p>}
            {data &&
              data.map((item) => (
                <li key={item.id}>
                  <p>{item.nome}</p>
                  <Link to={`/Alteracao/${item.id}`}>Detalhes</Link>
                </li>
              ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Busca;
