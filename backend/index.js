const express = require("express");
var cors = require("cors");
const app = express();
const port = 3000;
const mysql = require("mysql2");

app.use(
  express.urlencoded({
    extended: true,
  })
);

app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
  res.json({ message: "Funcionando!!" });
});

//inicia o servidor
app.listen(port);

function execSQLQuery(sqlQry, res, array = true) {
  const connection = mysql.createConnection({
    host: "challenge.c45f7saownwh.us-east-1.rds.amazonaws.com",
    port: 3306,
    user: "admin",
    password: "camargo2902",
    database: "Registros",
  });

  connection.query(sqlQry, (error, results, fields) => {
    if (error) {
      res.json(error);
    } else {
      if (array) {
        res.json(results);
      } else {
        const [result] = results;
        res.json(result);
      }
    }
    connection.end();
  });
}

// Buscar clientes
app.get("/pacientes/:id", (req, res) => {
  let filter = "";
  if (req.params.id) {
    filter = " WHERE ID = " + parseInt(req.params.id);
  }
  execSQLQuery("SELECT * FROM Pacientes" + filter, res, false);
});

// Buscar clientes
app.get("/pacientes", (req, res) => {
  execSQLQuery("SELECT * FROM Pacientes", res);
});

// Excluir cliente
app.delete("/pacientes/:id", (req, res) => {
  execSQLQuery(
    "DELETE FROM Pacientes WHERE ID=" + parseInt(req.params.id),
    res
  );
});

// Adicionar clietes
app.post("/pacientes", (req, res) => {
  const nome = req.body.nome;
  const datanacimento = req.body.datanacimento;
  const email = req.body.email;
  const endereco = req.body.endereco;
  const numero = req.body.numero;

  execSQLQuery(
    `INSERT INTO Pacientes(Nome, datanacimento, email, endereco, numero) VALUES('${nome}','${datanacimento}', '${email}', '${endereco}', '${numero}')`,
    res
  );
});

// Atualizar clientes
app.patch("/clientes/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const nome = req.body.nome;
  const datanacimento = req.body.datanacimento;
  const email = req.body.email;
  const endereco = req.body.endereco;
  const numero = req.body.numero;
  execSQLQuery(
    `UPDATE Clientes SET Nome='${nome}', datanacimento='${datanacimento}', email='${email}', endereco='${endereco}', numero='${numero}'  WHERE ID=${id}`,
    res
  );
});
