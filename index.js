const express = require("express");
const app = express();
const mysql = require("mysql");
const cors = require("cors");

app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
  user: "root",
  host: "localhost",
  password: "SenhaForte123%",
  database: "clientes",
});

app.post("/create", (req, res) => {
  const nome = req.body.nome;
  const idade = req.body.idade;
  const email = req.body.email;

  db.query(
    "INSERT INTO cliente (nome, idade, email) VALUES (?,?,?)", 
    [nome, idade, email], 
    (err, result) => {
    err ? console.log(err) : res.send("Values Inserted");
    /*
    if (err) {
        console.log(err)
    } else {
        res.send("Values inserted")
    }
    */
    }
  );
});

app.get("/list", (req, res) => {
  db.query(
    "SELECT * FROM cliente",
    (err, result) => {
      err ? console.log(err) : res.send(result);
    }
  )
});

app.listen(8080, () => {
  console.log("Server started on port 8080");
});
