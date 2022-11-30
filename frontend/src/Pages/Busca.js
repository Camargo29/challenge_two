import "./Busca.css";
import Button from "@mui/material/Button";

import { useSearchParams, Link } from "react-router-dom";
import { useFetch } from "../Hooks/useFetch";
import SearchForm from "../Components/SearchForm";

const Busca = () => {
  const [searchParams] = useSearchParams();

  const url = "http://localhost:3000/pacientes?" + searchParams;

  const { data: items, loading, erro } = useFetch(url);

  return (
    <div className="container-busca">
      <div className="quadro">
        <h1>Busca de registro</h1>
        <div className="search">
          <div className="input-btn-buscar">
            <SearchForm />
          </div>
          <Button variant="contained" size="large" href="../Cadastro">
            Novo
          </Button>
        </div>
        <div className="lista">
          <ul className="product">
            {erro && <p>{erro}</p>}
            {items &&
              items.map((item) => (
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
