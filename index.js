const express = require('express');
const { createCanvas, loadImage } = require('canvas');
const app = express();

app.get('/card', async (req, res) => {
  const { username = 'Player', avatar = 'https://cdn.discordapp.com/embed/avatars/0.png', almas = 0, xpAtual = 0, xpMax = 500 } = req.query;

  const width = 400;
  const height = 180;
  const canvas = createCanvas(width, height);
  const ctx = canvas.getContext('2d');

  // Fundo gradient
  const bg = ctx.createLinearGradient(0, 0, width, height);
  bg.addColorStop(0, '#7f5cff');
  bg.addColorStop(1, '#00ffd5');
  ctx.fillStyle = bg;
  ctx.fillRect(0, 0, width, height);

  // Blur atrás (glow)
  ctx.shadowColor = 'rgba(255,255,255,0.3)';
  ctx.shadowBlur = 30;
  ctx.fillRect(0, 0, width, height);

  // Avatar
  try {
    const img = await loadImage(avatar);
    ctx.save();
    ctx.beginPath();
    ctx.arc(80, 90, 50, 0, Math.PI * 2, true); // círculo
    ctx.closePath();
    ctx.clip();
    ctx.drawImage(img, 30, 40, 100, 100);
    ctx.restore();

    // Borda glow
    ctx.strokeStyle = '#fff';
    ctx.lineWidth = 4;
    ctx.beginPath();
    ctx.arc(80, 90, 50, 0, Math.PI * 2);
    ctx.stroke();
  } catch (err) {
    console.log('Erro carregando avatar:', err);
  }

  // Nome
  ctx.fillStyle = '#fff';
  ctx.font = 'bold 22px Segoe UI';
  ctx.fillText(username, 150, 60);

  // Almas
  ctx.font = '16px Segoe UI';
  ctx.fillText(`💠 Almas: ${almas}`, 150, 90);

  // XP
  ctx.fillText(`⚡ XP: ${xpAtual} / ${xpMax}`, 150, 120);

  // Barra de XP
  const xpPercent = Math.min(1, xpAtual / xpMax);
  ctx.fillStyle = '#ffffff50';
  ctx.fillRect(150, 130, 200, 15);

  const gradient = ctx.createLinearGradient(150, 130, 150 + 200 * xpPercent, 145);
  gradient.addColorStop(0, '#ffe259');
  gradient.addColorStop(1, '#ffa751');
  ctx.fillStyle = gradient;
  ctx.fillRect(150, 130, 200 * xpPercent, 15);

  ctx.strokeStyle = '#fff';
  ctx.lineWidth = 2;
  ctx.strokeRect(150, 130, 200, 15);

  // Enviar PNG direto
  res.setHeader('Content-Type', 'image/png');
  res.send(canvas.toBuffer());
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Card server online na porta ${PORT}`));
