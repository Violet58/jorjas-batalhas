const express = require("express");
const { createCanvas } = require("canvas");

const app = express();
const port = process.env.PORT || 3000;

// rota raiz (teste)
app.get("/", (req, res) => {
  res.send("API de cards online 🔥");
});

// rota do card
app.get("/card", (req, res) => {
  const nome = req.query.nome || "Sem nome";
  const almas = req.query.almas || "0";
  const xp = req.query.xp || "0";

  const canvas = createCanvas(600, 300);
  const ctx = canvas.getContext("2d");

  // fundo
  ctx.fillStyle = "#1e1e2f";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  // título
  ctx.fillStyle = "#ffffff";
  ctx.font = "bold 32px Arial";
  ctx.fillText("CARD DO JOGADOR", 160, 50);

  // textos
  ctx.font = "24px Arial";
  ctx.fillText(`Nome: ${nome}`, 50, 120);
  ctx.fillText(`Almas: ${almas}`, 50, 170);
  ctx.fillText(`XP: ${xp}`, 50, 220);

  res.setHeader("Content-Type", "image/png");
  res.send(canvas.toBuffer());
});

app.listen(port, () => {
  console.log("Servidor rodando na porta " + port);
});
