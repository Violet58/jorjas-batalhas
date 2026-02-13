const express = require("express");
const { createCanvas, loadImage } = require("canvas");
const app = express();

app.get("/card", async (req, res) => {
  try {
    // Recebendo parâmetros da URL
    const username = req.query.username || "Sky";
    const avatarUrl = req.query.avatar || "https://cdn.discordapp.com/embed/avatars/0.png";
    const almas = parseInt(req.query.almas) || 0;
    const xpAtual = parseInt(req.query.xpAtual) || 0;
    const xpMax = parseInt(req.query.xpMax) || 500;

    // Criando o canvas
    const width = 400;
    const height = 180;
    const canvas = createCanvas(width, height);
    const ctx = canvas.getContext("2d");

    // Fundo com gradiente
    const grad = ctx.createLinearGradient(0, 0, width, height);
    grad.addColorStop(0, "#7f5cff");
    grad.addColorStop(1, "#00ffd5");
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, width, height);

    // Sombra atrás do card
    ctx.shadowColor = "rgba(0,0,0,0.4)";
    ctx.shadowBlur = 20;
    ctx.shadowOffsetX = 0;
    ctx.shadowOffsetY = 5;

    // Avatar
    const avatar = await loadImage(avatarUrl);
    ctx.save();
    ctx.beginPath();
    ctx.arc(50, 90, 40, 0, Math.PI * 2);
    ctx.closePath();
    ctx.clip();
    ctx.drawImage(avatar, 10, 50, 80, 80);
    ctx.restore();

    // Nome
    ctx.fillStyle = "#fff";
    ctx.font = "bold 24px Segoe UI";
    ctx.fillText(username, 110, 80);

    // Almas
    ctx.font = "16px Segoe UI";
    ctx.fillText(`💠 Almas: ${almas}`, 110, 110);

    // XP
    ctx.fillText(`⚡ XP: ${xpAtual}/${xpMax}`, 110, 140);

    // Barra de XP
    const barWidth = 250;
    const barHeight = 20;
    const xpPercent = Math.min(xpAtual / xpMax, 1);
    ctx.fillStyle = "rgba(255,255,255,0.2)";
    ctx.fillRect(110, 150, barWidth, barHeight);
    ctx.fillStyle = "#ffe259";
    ctx.fillRect(110, 150, barWidth * xpPercent, barHeight);
    ctx.strokeStyle = "#fff";
    ctx.lineWidth = 2;
    ctx.strokeRect(110, 150, barWidth, barHeight);

    // Enviar PNG
    res.setHeader("Content-Type", "image/png");
    res.send(canvas.toBuffer());
  } catch (err) {
    console.log(err);
    res.status(500).send("Erro ao gerar o card");
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log("Servidor online na porta " + PORT));
