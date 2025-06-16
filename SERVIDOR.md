# 🚀 Como Usar o Servidor JSON Server

## 📋 Pré-requisitos

- Node.js instalado (versão 14 ou superior)
- NPM (vem com Node.js)

## 🏃‍♂️ Início Rápido

### Opção 1: Script Automático (Recomendado)

```bash
./start-server.sh
```

### Opção 2: Comando Manual

```bash
npm start
```

### Opção 3: JSON Server Simples

```bash
npm run dev
```

## 🌐 URLs de Acesso

### 🎮 Website do Jogo

- **Local**: http://localhost:3001/index.html
- **Rede**: http://[SEU_IP]:3001/index.html

### 📊 API Endpoints

- **Ranking**: http://localhost:3001/api/ranking
- **Usuários**: http://localhost:3001/api/users
- **Estatísticas**: http://localhost:3001/api/gameStats

## 🔧 Configuração de Rede

### Para Acesso em Sala de Aula:

1. Descobrir seu IP:

   ```bash
   # Linux/Mac
   hostname -I

   # Windows
   ipconfig
   ```

2. Compartilhar com os alunos:
   - URL: `http://[SEU_IP]:3001/index.html`
   - Exemplo: `http://192.168.1.100:3001/index.html`

## 📁 Estrutura de Dados

### Ranking (`/api/ranking`)

```json
{
  "id": 1,
  "name": "Nome do Aluno",
  "class": "5º Ano A",
  "points": 150,
  "avatar": "url_do_avatar",
  "createdAt": "2025-06-09T19:30:00.000Z",
  "lastUpdate": "2025-06-09T19:30:00.000Z"
}
```

## 🛠️ Comandos Úteis

### Backup do Banco de Dados

```bash
npm run backup
```

### Resetar Dados (cuidado!)

```bash
# Fazer backup primeiro
npm run backup

# Restaurar dados iniciais
git checkout db.json
```

### Ver Logs do Servidor

```bash
# Logs em tempo real
tail -f server.log
```

## 🔍 Troubleshooting

### Porta 3001 em Uso

```bash
# Encontrar processo usando a porta
lsof -i :3001

# Matar processo (substitua PID)
kill -9 [PID]
```

### Erro de Conexão

1. Verificar se o servidor está rodando
2. Verificar firewall/antivírus
3. Tentar porta diferente editando `server.js`

### Dados Não Salvam

1. Verificar permissões do arquivo `db.json`
2. Verificar espaço em disco
3. Verificar se não há outro servidor rodando

## 📱 Acesso Mobile

Para testar em dispositivos móveis na mesma rede:

1. Conectar dispositivo no mesmo WiFi
2. Acessar: `http://[IP_DO_SERVIDOR]:3001/index.html`

## 🔒 Segurança

⚠️ **Importante**: Este servidor é para uso educacional/local apenas!

- Não usar em produção sem configurações de segurança
- Dados não são criptografados
- Sem autenticação implementada

## 🆘 Suporte

### Verificar Status

- API: http://localhost:3001/api/ranking
- Health: http://localhost:3001/api/users

### Logs

```bash
# Verificar erros
npm start 2>&1 | tee server.log
```

### Contato

Em caso de problemas, verificar:

1. Console do navegador (F12)
2. Logs do terminal
3. Arquivo `db.json` não corrompido
