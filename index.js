const express = require("express");
const app = express();

app.use(express.json());

app.get("/card", async (req, res) => {
  // ✅ RECEBENDO OS DADOS VIA QUERY
  const username = req.query.username || "Sky"; // nome do usuário
  const avatar = req.query.avatar || "https://cdn.discordapp.com/embed/avatars/0.png"; // avatar do Discord
  const almas = parseInt(req.query.almas) || 5; // número de almas
  const xpAtual = parseInt(req.query.xpAtual) || 200; // XP atual
  const xpMax = parseInt(req.query.xpMax) || 500; // XP máximo

  // ✅ CALCULANDO PORCENTAGEM DA BARRA
  const xpPercent = Math.min((xpAtual / xpMax) * 100, 100);

  // ✅ ENVIANDO HTML COM CSS DINÂMICO
  res.send(`
  <!DOCTYPE html>
  <html lang="pt-BR">
  <head>
  <meta charset="UTF-8">
  <title>Card do Jogador</title>
  <style>
  * { box-sizing: border-box; }
  body { margin: 0; height: 100vh; display: flex; justify-content: center; align-items: center; background: radial-gradient(circle at top, #0f0c29, #302b63, #24243e); font-family: 'Segoe UI', sans-serif; color: white; }
  .card { width: 360px; padding: 20px; border-radius: 20px; background: linear-gradient(135deg, #7f5cff, #00ffd5); box-shadow: 0 0 40px rgba(127,92,255,0.6); position: relative; }
  .card::before { content: ""; position: absolute; inset: 0; border-radius: 20px; background: linear-gradient(135deg, #7f5cff, #00ffd5); filter: blur(25px); opacity: 0.6; z-index: -1; }
  .header { display: flex; align-items: center; gap: 15px; }
  .avatar { width: 72px; height: 72px; border-radius: 50%; border: 3px solid white; object-fit: cover; }
  .title { font-size: 20px; font-weight: bold; }
  .stats { margin-top: 15px; background: rgba(0,0,0,0.25); padding: 15px; border-radius: 15px; }
  .stat { display: flex; justify-content: space-between; margin-bottom: 8px; font-size: 15px; }
  .xp-bar { height: 12px; background: rgba(255,255,255,0.2); border-radius: 10px; overflow: hidden; margin-top: 6px; }
  .xp-fill { height: 100%; width: ${xpPercent}%; background: linear-gradient(90deg, #ffe259, #ffa751); border-radius: 10px; box-shadow: 0 0 10px rgba(255,200,80,0.8); transition: width 0.5s ease; }
  </style>
  </head>

  <body>
  <div class="card">
    <div class="header">
      <img class="avatar" src="${avatar}">
      <div>
        <div class="title">${username}</div>
        <small>🌌 Portador de Almas</small>
      </div>
    </div>

    <div class="stats">
      <div class="stat">
        <span>💠 Almas</span>
        <span>${almas}</span>
      </div>

      <div class="stat">
        <span>⚡ XP</span>
        <span>${xpAtual} / ${xpMax}</span>
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

// 🔥 PORTA
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Card server online na porta ${PORT}`));
