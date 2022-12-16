import "./Read.css";
import { useSearchParams, Link, useNavigate } from "react-router-dom";
import { useFetch } from "../Hooks/useFetch";
import { useEffect, useState } from "react";
import api from "../api/configApi";
import SearchForm from "../Components/SearchForm";

import Button from "@mui/material/Button";
import EditIcon from "@mui/icons-material/Edit";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import toast from "react-hot-toast";

const notify = () => toast("Usuário apagado com sucesso!", { icon: "✅" });

const Read = () => {
  const navigate = useNavigate();

  const [searchParams] = useSearchParams();

  const url =
    "http://localhost:3000/pacientes" +
    (searchParams ? "?" : "") +
    searchParams;

  const { data: items, loading, erro } = useFetch(url);

  const [data, setData] = useState(items);

  useEffect(() => {
    setData(items);
  }, [items, url]);

  function onSearch(value) {
    if (value === "" || value === undefined) {
      setData(items);
      return;
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
    <div className="container-read">
      <div className="quadro">
        <h1>Busca de registro</h1>
        <div className="search">
          <div className="input-btn-read">
            <SearchForm callback={onSearch} />
          </div>
          <Link
            to="/Create"
            style={{ textDecoration: "none", width: "100% !importanted" }}
          >
            <Button
              className="btn-create"
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
                          to={`/Update/${item.id}`}
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
                        <div>
                          {/* Delete */}
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
                            onClick={async () => {
                              await api
                                .delete("/pacientes/" + item.id)
                                .then(function (response) {
                                  console.log(response.userdata);
                                  notify();
                                  navigate("/");
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

export default Read;
