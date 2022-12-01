import { useEffect, useLayoutEffect, useMemo, useState } from "react";
import "./Cadastro.css";
import api from "../api/configApi";
import { useParams } from "react-router-dom";
import axios from "axios";

const Alteracao = () => {
  console.log("Render");
  const [post, setPost] = useState();

  const { id } = useParams();

  const url = useMemo(() => {
    return "http://localhost:3000/pacientes/" + id;
  }, [id]);

  console.log("post", post);

  // const url = "http://localhost:3000/pacientes/" + id;

  // PUXAR USÚARIOS DO SISTEMA E PREENCHER
  useLayoutEffect(() => {
    axios
      .get(url)
      .then((response) => setPost(response.data))
      .catch((err) => {
        console.error("ops! ocorreu um erro" + err);
      });
  }, []);

  // apagar usuário
  const delUser = async (e) => {
    e.preventDefault();

    await api
      .delete("/pacientes/" + id)
      .then(function (response) {
        console.log(response.userdata);
        alert("apagado");
        // <Navigate to="/" />; NÃO ESTÁ REDIRECIONANDO PARA A PAGINA DE BUSCA
      })
      .catch(function (error) {
        console.error(error.response);
      });
  };

  if (post) {
    console.log("post", post);
  }

  const submitUser = async (e) => {
    e.preventDefault();
  };

  return (
    <div className="container-cadastro">
      <form onSubmit={submitUser}>
        <div className="quadro-cadastro">
          <h1>Cadastro de paciente</h1>
          <label htmlFor="name">Nome Completo</label>
          {post?.nome ? (
            <input
              type="text"
              name="name"
              placeholder="Digite seu nome completo"
              onChange={(e) =>
                setPost((previous) => ({ ...previous, nome: e.target.value }))
              }
              value={post.nome}
              // defaultValue={"teste"}
            />
          ) : (
            <input
              type="text"
              name="name"
              disabled
              placeholder="Carregando..."
            />
          )}

          <label htmlFor="data">Data de Nascimento</label>
          {post?.datanacimento ? (
            <input
              type="text"
              name="name"
              placeholder="Digite seu nome completo"
              onChange={(e) =>
                setPost((previous) => ({
                  ...previous,
                  datanacimento: e.target.value,
                }))
              }
              value={post.datanacimento}
              // defaultValue={"teste"}
            />
          ) : (
            <input type="text" name="name" disabled placeholder="00/00/0000" />
          )}
          <label htmlFor="Email">E-mail</label>
          <input
            type="email"
            name="Email"
            placeholder="seuemail@email.com"
            // onChange={(e) => setEmail(e.target.value)}
          />
          <div className="endereço">
            <div className="rua">
              <label htmlFor="ender">Endereço completo</label>
              <input
                type="text"
                name="ender"
                placeholder="Rua, Bairro"
                // onChange={(e) => setEnder(e.target.value)}
              />
            </div>
            <div className="numero">
              <label htmlFor="numero">Número</label>
              <input
                type="number"
                name="numero"
                // onChange={(e) => setNum(e.target.value)}
              />
            </div>
          </div>
          <input type="submit" className="btn-enviar" value="Concluir" />
          <button onClick={delUser}>Deletar</button>
        </div>
      </form>
    </div>
  );
};

export default Alteracao;
