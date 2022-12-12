import "./Busca.css";
import Button from "@mui/material/Button";

import { useSearchParams, Link } from "react-router-dom";
import { useFetch } from "../Hooks/useFetch";
import SearchForm from "../Components/SearchForm";
import { useEffect, useState } from "react";

import EditIcon from "@mui/icons-material/Edit";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import api from "../api/configApi";
import toast from "react-hot-toast";

const notify = () => toast("Usuário apagado com sucesso!", { icon: "✅" });

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
      const index = item.name.toLowerCase().indexOf(value.toLowerCase());
      if (index > -1) {
        return true;
      } else {
        return false;
      }
    });
    setData(filter);
  }

  return (
    <div className="container-busca">
      <div className="quadro">
        <h1>Busca de registro</h1>
        <div className="search">
          <div className="input-btn-buscar">
            <SearchForm callback={onSearch} />
          </div>
          <Link to="/Cadastro" style={{ textDecoration: "none" }}>
            <Button
              className="btn-cadastro"
              variant="contained"
              sx={{ fontSize: 14 }}
            >
              Cadastrar
            </Button>
          </Link>
        </div>
        <div className="lista">
          <ul className="product">
            {loading && (
              <h1 style={{ display: "flex", justifyContent: "center" }}>
                Carregando...
              </h1>
            )}
            {erro && <p>{erro}</p>}
            {data &&
              data.length &&
              data.map((item) => (
                <table key={item.id}>
                  <tbody>
                    <tr>
                      <td>{item.name}</td>
                      <td className="link-detail">
                        <Link
                          to={`/Alteracao/${item.id}`}
                          style={{ marginRight: 5 }}
                        >
                          <EditIcon
                            className="icon-edit"
                            sx={{
                              color: "action",
                              border: 0,
                              borderRadius: 1.5,
                              bgcolor: "primary.main",
                              width: 40,
                              height: 30,
                              "&:hover": {
                                color: "rgb(35, 96, 208)",
                              },
                              "&:active": {
                                bgcolor: "rgb(218, 218, 218)",
                              },
                            }}
                          />
                        </Link>{" "}
                        {/* <Delete props={item.id} /> */}
                        <div>
                          <DeleteForeverIcon
                            className="DeleteForeverIcon"
                            sx={{
                              color: "white",
                              border: 0,
                              borderRadius: 1.5,
                              bgcolor: "rgb(201, 0, 0)",
                              width: 40,
                              height: 30,
                              "&:hover": {
                                color: "red",
                              },
                              "&:active": {
                                bgcolor: "rgb(218, 218, 218)",
                              },
                            }}
                            // a função está aqui por causa do item.id
                            onClick={async () => {
                              await api
                                .delete("/pacientes/" + item.id)
                                .then(function (response) {
                                  console.log(response.userdata);
                                  notify();
                                  // precisa atualizar a lista
                                })
                                .catch(function (error) {
                                  console.error(error.response);
                                });
                            }}
                          />
                        </div>
                      </td>
                    </tr>
                  </tbody>
                </table>
              ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Busca;
