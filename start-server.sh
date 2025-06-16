#!/bin/bash

echo "🚀 Iniciando Eco Games com JSON Server..."
echo "=================================="

# Verificar se Node.js está instalado
if ! command -v node &> /dev/null; then
    echo "❌ Node.js não encontrado. Por favor, instale Node.js primeiro."
    echo "   Visite: https://nodejs.org/"
    exit 1
fi

# Verificar se json-server está instalado
if ! npm list json-server &> /dev/null; then
    echo "📦 Instalando json-server..."
    npm install json-server
fi

# Obter IP local
LOCAL_IP=$(hostname -I | awk '{print $1}')

echo ""
echo "🌐 Servidor será iniciado em:"
echo "   - Local: http://localhost:3001"
echo "   - Rede:  http://$LOCAL_IP:3001"
echo ""
echo "🎮 Para acessar o jogo:"
echo "   - http://localhost:3001/index.html"
echo "   - http://$LOCAL_IP:3001/index.html"
echo ""
echo "📊 API endpoints:"
echo "   - Ranking: http://localhost:3001/api/ranking"
echo "   - Usuários: http://localhost:3001/api/users"
echo ""
echo "⚡ Pressione Ctrl+C para parar o servidor"
echo "=================================="

# Iniciar o servidor usando npx
echo "🚀 Iniciando servidor com npx json-server..."
npx json-server db.json --port 3001 --host 0.0.0.0
