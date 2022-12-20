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

app.listen(port);

function execSQLQuery(sqlQry, res, array = true) {
  require("dotenv").config();
  const host = process.env.ENVhost;
  const password = process.env.ENVpassword;
  const connection = mysql.createConnection({
    host: host,
    port: 3307,
    user: "root",
    password: password,
    database: "testapp",
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

app.get("/pacientes/:id", (req, res) => {
  let filter = "";
  if (req.params.id) {
    filter = " WHERE id = " + parseInt(req.params.id);
  }
  execSQLQuery("SELECT * FROM pacientes" + filter, res, false);
});

app.get("/pacientes", (req, res) => {
  execSQLQuery("SELECT * FROM pacientes ORDER BY name ", res);
});

app.delete("/pacientes/:id", (req, res) => {
  execSQLQuery(
    "DELETE FROM pacientes WHERE id=" + parseInt(req.params.id),
    res
  );
});

app.post("/pacientes", (req, res) => {
  const name = req.body.name;
  const datanacimento = req.body.datanacimento;
  const email = req.body.email;
  const address = req.body.address;
  const number = req.body.number;

  execSQLQuery(
    `INSERT INTO pacientes(name, birthdate, email, address, number) VALUES('${name}','${datanacimento}', '${email}', '${address}', '${number}')`,
    res
  );
});

app.patch("/pacientes/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const name = req.body.name;
  const datanacimento = req.body.datanacimento;
  const email = req.body.email;
  const address = req.body.address;
  const number = req.body.number;
  execSQLQuery(
    `UPDATE pacientes SET name='${name}', birthdate='${datanacimento}', email='${email}', address='${address}', number='${number}'  WHERE id=${id}`,
    res
  );
});

app.post("/", (req, res) => {
  execSQLQuery(
    `CREATE TABLE IF NOT EXISTS testapp.pacientes (
      id INT NOT NULL AUTO_INCREMENT,
      name VARCHAR(255) NOT NULL,
      birthdate VARCHAR(255) NOT NULL,
      email VARCHAR(255) NOT NULL,
      address VARCHAR(255) NOT NULL,
      number INT NOT NULL,
      PRIMARY KEY (id),
      UNIQUE INDEX id_UNIQUE (id ASC) VISIBLE)
    ENGINE = InnoDB
    DEFAULT CHARACTER SET = utf8mb4
    COLLATE = utf8mb4_0900_ai_ci;`,
    res
  );
});
