const express = require("express");
const app = express();

app.use(express.json());

// “Banco de dados” temporário (fica na memória)
let usuarios = {};
let almas = {};

// Rota de teste
app.get("/", (req, res) => {
  res.send("API de batalhas do Jorjas online 🔥");
});

// Criar usuário
app.post("/usuario", (req, res) => {
  const { id, nome } = req.body;

  if (!id || !nome) {
    return res.status(400).send("Faltando id ou nome");
  }

  if (usuarios[id]) {
    return res.status(400).send("Usuário já existe");
  }

  usuarios[id] = {
    nome,
    almas: []
  };

  res.send({ msg: `Usuário ${nome} criado com sucesso` });
});

// Criar alma
app.post("/alma", (req, res) => {
  const { id, dono, poder } = req.body;

  if (!id || !dono || poder === undefined) {
    return res.status(400).send("Faltando dados");
  }

  if (!usuarios[dono]) {
    return res.status(400).send("Usuário não existe");
  }

  almas[id] = {
    dono,
    poder,
    xp: 0,
    nivel: 1
  };

  usuarios[dono].almas.push(id);

  res.send({ msg: "Alma criada com sucesso 👻" });
});

// Batalha entre duas almas
app.post("/batalha", (req, res) => {
  const { alma1, alma2 } = req.body;

  if (!almas[alma1] || !almas[alma2]) {
    return res.status(400).send("Alma não encontrada");
  }

  const poder1 = almas[alma1].poder + Math.random() * 10;
  const poder2 = almas[alma2].poder + Math.random() * 10;

  let vencedora;
  let perdedora;

  if (poder1 >= poder2) {
    vencedora = alma1;
    perdedora = alma2;
  } else {
    vencedora = alma2;
    perdedora = alma1;
  }

  // XP e level up
  almas[vencedora].xp += 10;

  if (almas[vencedora].xp >= almas[vencedora].nivel * 50) {
    almas[vencedora].nivel++;
    almas[vencedora].poder += 5;
  }

  res.send({
    vencedora,
    perdedora,
    nivel: almas[vencedora].nivel,
    xp: almas[vencedora].xp
  });
});

// Porta
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log("Servidor rodando na porta " + PORT);
});
