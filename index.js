const express = require("express");
const puppeteer = require("puppeteer");

const app = express();
const port = process.env.PORT || 3000;

app.get("/", (req, res) => {
  res.send("API de Cards online ✅");
});

app.get("/card", async (req, res) => {
  try {
    const nome = req.query.nome || "Desconhecido";
    const almas = req.query.almas || 0;
    const xp = req.query.xp || 0;

    const html = `
      <html>
        <body style="
          width: 400px;
          height: 200px;
          background: linear-gradient(135deg, #6a11cb, #2575fc);
          color: white;
          font-family: Arial;
          display: flex;
          align-items: center;
          justify-content: center;
        ">
          <div style="text-align:center">
            <h2>${nome}</h2>
            <p>👻 Almas: ${almas}</p>
            <p>✨ XP: ${xp}</p>
          </div>
        </body>
      </html>
    `;

    const browser = await puppeteer.launch({
      args: ["--no-sandbox", "--disable-setuid-sandbox"]
    });

    const page = await browser.newPage();
    await page.setViewport({ width: 400, height: 200 });
    await page.setContent(html);

    const image = await page.screenshot({ type: "png" });

    await browser.close();

    res.set("Content-Type", "image/png");
    res.send(image);
  } catch (err) {
    console.error(err);
    res.status(500).send("Erro ao gerar o card");
  }
});

app.listen(port, () => {
  console.log("Servidor rodando na porta " + port);
});});

app.listen(port, () => {
  console.log("Servidor rodando na porta " + port);
});  } else {
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
