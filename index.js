const express = require("express");
const { createCanvas, loadImage } = require("canvas");
const fetch = require("node-fetch");

const app = express();
app.use(express.json());

app.get("/card", async (req, res) => {
  const username = req.query.username || "Sky";
  const avatarUrl = req.query.avatar || "https://cdn.discordapp.com/embed/avatars/0.png";
  const almas = parseInt(req.query.almas) || 5;
  const xpAtual = parseInt(req.query.xpAtual) || 200;
  const xpMax = parseInt(req.query.xpMax) || 500;

  // Criar canvas
  const width = 360;
  const height = 180;
  const canvas = createCanvas(width, height);
  const ctx = canvas.getContext("2d");

  // Fundo
  const gradient = ctx.createLinearGradient(0, 0, width, height);
  gradient.addColorStop(0, "#7f5cff");
  gradient.addColorStop(1, "#00ffd5");
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, width, height);

  // Barra de XP
  const xpPercent = Math.min(xpAtual / xpMax, 1);
  ctx.fillStyle = "rgba(255,255,255,0.2)";
  ctx.fillRect(20, 140, width - 40, 20);
  ctx.fillStyle = "#ffe259";
  ctx.fillRect(20, 140, (width - 40) * xpPercent, 20);

  // Contorno da barra
  ctx.strokeStyle = "#fff";
  ctx.lineWidth = 2;
  ctx.strokeRect(20, 140, width - 40, 20);

  // Texto
  ctx.fillStyle = "#fff";
  ctx.font = "bold 18px Sans";
  ctx.fillText(username, 110, 50);
  ctx.font = "14px Sans";
  ctx.fillText(`💠 Almas: ${almas}`, 110, 80);
  ctx.fillText(`⚡ XP: ${xpAtual} / ${xpMax}`, 110, 110);

  // Avatar
  try {
    const avatarImg = await loadImage(avatarUrl);
    ctx.save();
    ctx.beginPath();
    ctx.arc(50, 70, 40, 0, Math.PI * 2, true);
    ctx.closePath();
    ctx.clip();
    ctx.drawImage(avatarImg, 10, 30, 80, 80);
    ctx.restore();
  } catch (err) {
    console.log("Erro ao carregar avatar:", err);
  }

  // Enviar como PNG
  res.setHeader("Content-Type", "image/png");
  canvas.pngStream().pipe(res);
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Card server online na porta ${PORT}`));
