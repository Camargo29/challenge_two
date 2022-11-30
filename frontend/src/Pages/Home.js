import medico from "../Assets/medico.png";
import "./Home.css";

import * as React from "react";

// componentes MUI
import Button from "@mui/material/Button";
import { Link } from "@mui/material";

const Home = () => {
  return (
    <div className="container">
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
            <Button variant="contained" size="large" href="../Busca">
              Buscar
              {/* <Link to="./Busca"     ?????      /> */}
            </Button>
          </div>
        </div>
        <img src={medico} alt="medico" className="imagem" />
      </div>
    </div>
  );
};

export default Home;
