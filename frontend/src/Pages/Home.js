import medico from "../Assets/medico.png";
import "./Home.css";

import * as React from "react";

// componentes MUI
import Button from "@mui/material/Button";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div
      className="container"
      style={{
        overflow: "hidden",
        display: "flex",
        width: "100%",
      }}
    >
      <div className="headler">
        <h1>Seja Bem-Vindo</h1>
      </div>
      <div className="body">
        <div className="text">
          <p>
            Aqui é onde você pode administrar todos os seus pacientes. Nesse
            ambiente é possível, cadastrar novos pacientes, encontrar
            informações sobre tais, atualizar informações e se necessário, até
            apagar registros.
          </p>
          <div className="entrar">
            <Link to="/Busca" style={{ textDecoration: "none" }}>
              <Button
                className="btn-entrar"
                variant="contained"
                sx={{ fontSize: 14 }}
              >
                Buscar
              </Button>
            </Link>
          </div>
        </div>
        <img src={medico} alt="medico" className="imagem" />
      </div>
    </div>
  );
};

export default Home;
