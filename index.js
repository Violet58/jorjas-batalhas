const express = require('express');
const { createCanvas, loadImage } = require('canvas');
const app = express();

app.get('/card', async (req, res) => {
  const { username = 'Player', avatar = 'https://cdn.discordapp.com/embed/avatars/0.png', almas = 0, xpAtual = 0, xpMax = 500, level = 1 } = req.query;

  const width = 420;
  const height = 200;
  const canvas = createCanvas(width, height);
  const ctx = canvas.getContext('2d');

  // Fundo animado pseudo-glow (linear gradient dinâmico)
  const time = Date.now() / 1000;
  const color1 = `hsl(${(time*40)%360}, 70%, 50%)`;
  const color2 = `hsl(${(time*40+60)%360}, 70%, 50%)`;
  const bg = ctx.createLinearGradient(0, 0, width, height);
  bg.addColorStop(0, color1);
  bg.addColorStop(1, color2);
  ctx.fillStyle = bg;
  ctx.fillRect(0, 0, width, height);

  // Avatar com borda glow
  try {
    const img = await loadImage(avatar);
    ctx.save();
    ctx.beginPath();
    ctx.arc(80, 100, 50, 0, Math.PI*2);
    ctx.closePath();
    ctx.clip();
    ctx.drawImage(img, 30, 50, 100, 100);
    ctx.restore();

    ctx.shadowColor = '#ffffffaa';
    ctx.shadowBlur = 20;
    ctx.lineWidth = 4;
    ctx.strokeStyle = '#fff';
    ctx.beginPath();
    ctx.arc(80, 100, 50, 0, Math.PI*2);
    ctx.stroke();
  } catch (err) {
    console.log('Erro carregando avatar:', err);
  }

  // Nome
  ctx.fillStyle = '#fff';
  ctx.font = 'bold 24px Segoe UI';
  ctx.fillText(username, 150, 60);

  // Level
  ctx.font = 'bold 18px Segoe UI';
  ctx.fillText(`Lv. ${level}`, 150, 90);

  // Almas
  ctx.font = '16px Segoe UI';
  ctx.fillText(`💠 Almas: ${almas}`, 150, 120);

  // XP
  ctx.fillText(`⚡ XP: ${xpAtual} / ${xpMax}`, 150, 145);

  // Barra de XP animada
  const xpPercent = Math.min(1, xpAtual/xpMax);
  ctx.fillStyle = '#ffffff33';
  ctx.fillRect(150, 155, 220, 18);

  const gradient = ctx.createLinearGradient(150, 155, 150 + 220*xpPercent, 173);
  gradient.addColorStop(0, '#ffe259');
  gradient.addColorStop(1, '#ffa751');
  ctx.fillStyle = gradient;
  ctx.fillRect(150, 155, 220*xpPercent, 18);

  ctx.strokeStyle = '#fff';
  ctx.lineWidth = 2;
  ctx.strokeRect(150, 155, 220, 18);

  res.setHeader('Content-Type', 'image/png');
  res.send(canvas.toBuffer());
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Card server ultra online na porta ${PORT}`));
