const jsonServer = require("json-server");
const server = jsonServer.create();
const router = jsonServer.router("db.json");
const middlewares = jsonServer.defaults({
  static: "./",
});

// Configurar CORS
server.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization, Cache-Control"
  );
  res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, DELETE");
  if (req.method === "OPTIONS") {
    res.sendStatus(200);
  } else {
    next();
  }
});

// Servir arquivos estáticos
server.use(middlewares);

// Middleware personalizado para ranking
server.use(jsonServer.bodyParser);
server.use((req, res, next) => {
  if (req.method === "POST" && req.path === "/ranking") {
    req.body.createdAt = new Date().toISOString();
    req.body.lastUpdate = new Date().toISOString();
    req.body.id = Date.now(); // ID único baseado em timestamp
  }
  if (req.method === "PUT") {
    req.body.lastUpdate = new Date().toISOString();
  }
  next();
});

// Usar as rotas padrão
server.use("/api", router);

const PORT = process.env.PORT || 3001;
server.listen(PORT, "0.0.0.0", () => {
  console.log(`\n🚀 Servidor JSON Server rodando!`);
  console.log(`📱 Acesse localmente: http://localhost:${PORT}`);
  console.log(`🌐 Acesse na rede: http://[SEU_IP]:${PORT}`);
  console.log(`📊 API Ranking: http://localhost:${PORT}/api/ranking`);
  console.log(`📋 Banco de dados: db.json`);
  console.log(
    `\n🎮 Para acessar o jogo: http://localhost:${PORT}/index.html\n`
  );
});
