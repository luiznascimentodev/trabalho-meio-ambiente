#!/bin/bash

# Script para iniciar servidor com arquivos estáticos
echo "🚀 Iniciando Eco Games com JSON Server..."
echo "=================================="

# Verificar se Node.js está instalado
if ! command -v node &> /dev/null; then
    echo "❌ Node.js não encontrado. Por favor, instale Node.js primeiro."
    echo "   Visite: https://nodejs.org/"
    exit 1
fi

# Obter IP local
LOCAL_IP=$(hostname -I | awk '{print $1}' 2>/dev/null || echo "localhost")

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
echo "   - Ranking: http://localhost:3001/ranking"
echo "   - Usuários: http://localhost:3001/users"
echo ""
echo "⚡ Pressione Ctrl+C para parar o servidor"
echo "=================================="

# Iniciar servidor HTTP simples para arquivos estáticos em background
echo "📁 Iniciando servidor de arquivos estáticos na porta 8080..."
python3 -m http.server 8080 > /dev/null 2>&1 &
HTTP_PID=$!

# Aguardar um pouco para o servidor HTTP iniciar
sleep 2

echo "📊 Iniciando JSON Server na porta 3001..."
# Iniciar o JSON Server
npx json-server db.json --port 3001 --host 0.0.0.0 &
JSON_PID=$!

# Função para limpar processos ao sair
cleanup() {
    echo ""
    echo "🛑 Parando servidores..."
    kill $HTTP_PID 2>/dev/null
    kill $JSON_PID 2>/dev/null
    echo "✅ Servidores parados!"
    exit 0
}

# Capturar sinais de interrupção
trap cleanup SIGINT SIGTERM

echo ""
echo "✅ Servidores iniciados!"
echo "🎮 Website: http://localhost:8080"
echo "📊 API: http://localhost:3001/ranking"
echo ""

# Manter o script rodando
wait
