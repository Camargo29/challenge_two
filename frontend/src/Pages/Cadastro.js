import { useState } from "react";
import "./Cadastro.css";
import api from "../backend/configApi";

const Cadastro = () => {
  const [name, setName] = useState();
  const [nasci, setNasci] = useState();
  const [email, setEmail] = useState();
  const [ender, setEnder] = useState();
  const [num, setNum] = useState();

  const submitUser = async (e) => {
    e.preventDefault();

    const postuserdata = {
      id: "",
      nome: name,
      datanacimento: nasci,
      email: email,
      endereco: ender,
      numero: num,
    };

    await api
      .post("/pacientes", postuserdata)
      .then(function (response) {
        console.log(response.userdata);
        alert("cadastrado");
      })
      .catch(function (error) {
        console.error(error.response);
      });
  };

  return (
    <div className="container-cadastro">
      <form onSubmit={submitUser}>
        <div className="quadro-cadastro">
          <h1>Cadastro de paciente</h1>
          <label htmlFor="name">Nome Completo</label>
          <input
            type="text"
            name="name"
            placeholder="Digite seu nome completo"
            onChange={(e) => setName(e.target.value)}
          />
          <label htmlFor="data">Data de Nascimento</label>
          <input
            type="data"
            name="data"
            placeholder="dd/mm/aaaa"
            onChange={(e) => setNasci(e.target.value)}
          />
          <label htmlFor="Email">E-mail</label>
          <input
            type="email"
            name="Email"
            placeholder="seuemail@email.com"
            onChange={(e) => setEmail(e.target.value)}
          />
          <div className="endereço">
            <div className="rua">
              <label htmlFor="ender">Endereço completo</label>
              <input
                type="text"
                name="ender"
                placeholder="Rua, Bairro"
                onChange={(e) => setEnder(e.target.value)}
              />
            </div>
            <div className="numero">
              <label htmlFor="numero">Número</label>
              <input
                type="number"
                name="numero"
                onChange={(e) => setNum(e.target.value)}
              />
            </div>
          </div>
          <input type="submit" className="btn-enviar" value="enviar" />
        </div>
      </form>
    </div>
  );
};

export default Cadastro;
