const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");
const bodyParser = require("body-parser");
const app = express();

app.use(cors());
app.use(bodyParser.json());


const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "senai",
  database: "bibliofile",
});

db.connect((err) => {
  if (err) console.error(" Erro ao conectar ao MySQL:", err);
  else console.log(" Conectado ao MySQL!");
});



app.post("/login", (req, res) => {
  const { email, senha } = req.body;
  if (!email || !senha) {
    return res.status(400).json({ erro: "Preencha todos os campos!" });
  }

  const sql = "SELECT * FROM usuarios WHERE email = ? AND senha = ?";
  db.query(sql, [email, senha], (err, results) => {
    if (err) return res.status(500).json({ erro: "Erro no servidor." });
    if (results.length === 0) {
      return res.status(401).json({ erro: "Email ou senha incorretos!" });
    }

    res.status(200).json({
      mensagem: `Bem-vindo(a), ${results[0].nome}!`,
      usuario_id: results[0].id
    });
  });
});


app.get("/leituras", (req, res) => {
  const { genero, nota } = req.query;
  let sql = "SELECT * FROM leituras WHERE 1=1";
  const params = [];

  if (genero && genero !== "Todos os gêneros") {
    sql += " AND genero = ?";
    params.push(genero);
  }
  if (nota && nota !== "Todas as notas") {
    sql += " AND nota = ?";
    params.push(nota);
  }

  sql += " ORDER BY data_registro DESC";

  db.query(sql, params, (err, results) => {
    if (err) return res.status(500).json({ error: err });
    res.json(results);
  });
});

app.post("/leituras", (req, res) => {
  const { usuario_id, titulo, autor, genero, paginas, tempo_leitura, nota, resenha } = req.body;

  if (!titulo || !autor || !nota) {
    return res.status(400).json({ error: "Título, autor e nota são obrigatórios." });
  }

  const sql = `
    INSERT INTO leituras (usuario_id, titulo, autor, genero, paginas, tempo_leitura, nota, resenha, data_registro)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, NOW())
  `;

  db.query(sql, [usuario_id || 1, titulo, autor, genero, paginas, tempo_leitura, nota, resenha], (err) => {
    if (err) return res.status(500).json({ error: err });

    atualizarEstatisticas(usuario_id || 1, (erro) => {
      if (erro) return res.status(500).json({ error: erro });
      res.status(201).json({ message: "Leitura registrada e estatísticas atualizadas!" });
    });
  });
});


app.get("/usuarios/:id", (req, res) => {
  const { id } = req.params;
  const sql = "SELECT id, nome, email, livros_lidos, media_notas FROM usuarios WHERE id = ?";
  
  db.query(sql, [id], (err, result) => {
    if (err) return res.status(500).json({ error: err });
    if (result.length === 0) return res.status(404).json({ error: "Usuário não encontrado" });
    res.json(result[0]);
  });
});



function atualizarEstatisticas(usuario_id, callback) {
  const sqlMedia = `
    SELECT COUNT(*) AS total, AVG(nota) AS media
    FROM leituras
    WHERE usuario_id = ?
  `;

  db.query(sqlMedia, [usuario_id], (err, result) => {
    if (err) return callback(err);

    const total = result[0].total || 0;
    const media = result[0].media || 0;

    const sqlUpdate = `
      UPDATE usuarios
      SET livros_lidos = ?, media_notas = ?
      WHERE id = ?
    `;
    db.query(sqlUpdate, [total, media, usuario_id], callback);
  });
}


const PORT = 3000;
app.listen(PORT, () => console.log(` Servidor rodando em http://localhost:${PORT}`));
