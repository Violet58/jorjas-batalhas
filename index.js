const express = require("express");
const { createCanvas } = require("canvas");

const app = express();
const port = process.env.PORT || 3000;

const xpAtual = 200;
const xpMax = 500;

const xpPercent = Math.min((xpAtual / xpMax) * 100, 100);

app.get("/", (req, res) => {
  res.send(`
<!DOCTYPE html>
<html lang="pt-BR">
<head>
<meta charset="UTF-8">
<title>Card do Jogador</title>

<style>
* {
  box-sizing: border-box;
}

body {
  margin: 0;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background: radial-gradient(circle at top, #0f0c29, #302b63, #24243e);
  font-family: 'Segoe UI', sans-serif;
  color: white;
}

.card {
  width: 360px;
  padding: 20px;
  border-radius: 20px;
  background: linear-gradient(135deg, #7f5cff, #00ffd5);
  box-shadow: 0 0 40px rgba(127,92,255,0.6);
  position: relative;
}

.card::before {
  content: "";
  position: absolute;
  inset: 0;
  border-radius: 20px;
  background: linear-gradient(135deg, #7f5cff, #00ffd5);
  filter: blur(25px);
  opacity: 0.6;
  z-index: -1;
}

.header {
  display: flex;
  align-items: center;
  gap: 15px;
}

.avatar {
  width: 72px;
  height: 72px;
  border-radius: 50%;
  border: 3px solid white;
  object-fit: cover;
}

.title {
  font-size: 20px;
  font-weight: bold;
}

.stats {
  margin-top: 15px;
  background: rgba(0,0,0,0.25);
  padding: 15px;
  border-radius: 15px;
}

.stat {
  display: flex;
  justify-content: space-between;
  margin-bottom: 8px;
  font-size: 15px;
}

.xp-bar {
  height: 12px;
  background: rgba(255,255,255,0.2);
  border-radius: 10px;
  overflow: hidden;
  margin-top: 6px;
}

.xp-fill {
  height: 100%;
  width: 40%;
  background: linear-gradient(90deg, #ffe259, #ffa751);
}
</style>
</head>

<body>

<div class="card">
  <div class="header">
    <img class="avatar" src="https://cdn.discordapp.com/embed/avatars/0.png">
    <div>
      <div class="title">Sky</div>
      <small>🌌 Portador de Almas</small>
    </div>
  </div>

  <div class="stats">
    <div class="stat">
      <span>💠 Almas</span>
      <span>5</span>
    </div>

    <div class="stat">
      <span>⚡ XP</span>
      <span>200</span>
    </div>

    <div class="xp-bar">
      <div class="xp-fill"></div>
    </div>
  </div>
</div>

</body>
</html>
`);
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
