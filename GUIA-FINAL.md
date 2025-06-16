# 🎮 Eco Games - Guia de Uso do Servidor

## ✅ **Implementação Concluída!**

O sistema de ranking compartilhado com JSON Server foi implementado com sucesso! Agora todos os usuários podem ver e competir no mesmo ranking global.

## 🚀 **Como Iniciar (3 Opções)**

### **Opção 1: Script Completo (Recomendado)**

```bash
./start-full-server.sh
```

- 🎮 **Website**: http://localhost:8080
- 📊 **API**: http://localhost:3001/ranking

### **Opção 2: Apenas JSON Server**

```bash
npm start
```

- 📊 **API + Website**: http://localhost:3001/index.html

### **Opção 3: Script Simples**

```bash
./start-server.sh
```

- 📊 **API + Website**: http://localhost:3001/index.html

## 🌐 **Acesso em Rede (Sala de Aula)**

### **Para Professores:**

1. Execute um dos scripts acima
2. Descubra seu IP local:
   ```bash
   hostname -I | awk '{print $1}'
   ```
3. Compartilhe com os alunos: `http://[SEU_IP]:8080` ou `http://[SEU_IP]:3001/index.html`

### **Para Alunos:**

- Acesse a URL fornecida pelo professor
- Todos verão o mesmo ranking global
- Rankings são atualizados em tempo real

## 📊 **Recursos Implementados**

### ✅ **Ranking Compartilhado**

- **Persistência global**: Todos veem o mesmo ranking
- **Atualizações em tempo real**: Rankings sincronizados
- **Fallback inteligente**: Funciona offline se necessário
- **Backup automático**: Dados salvos em localStorage como backup

### ✅ **Indicadores Visuais**

- **Status de conexão**: 🟢 Online / 🔴 Offline / 🟡 Verificando
- **Avatares no ranking**: Cada usuário tem seu avatar
- **Timestamp**: Mostra quando foi a última atualização
- **Medalhas**: 🥇 🥈 🥉 para os top 3

### ✅ **API REST Completa**

- `GET /ranking` - Lista o ranking
- `POST /ranking` - Adiciona novo usuário
- `PUT /ranking/:id` - Atualiza pontuação
- `GET /users` - Lista usuários
- `GET /gameStats` - Estatísticas de jogos

## 🔧 **Configuração Técnica**

### **Portas Utilizadas:**

- **8080**: Servidor HTTP para arquivos estáticos (website)
- **3001**: JSON Server para API de dados

### **Arquivos Importantes:**

- `db.json` - Banco de dados do ranking
- `start-full-server.sh` - Script completo (recomendado)
- `start-server.sh` - Script simples
- `package.json` - Configurações npm

### **URLs de Teste:**

```bash
# Website
curl http://localhost:8080

# API Ranking
curl http://localhost:3001/ranking

# Adicionar usuário (exemplo)
curl -X POST http://localhost:3001/ranking \
  -H "Content-Type: application/json" \
  -d '{"name":"Teste","class":"5º A","points":100,"avatar":"url"}'
```

## 🎯 **Benefícios Alcançados**

### **Para Professores:**

- ✅ **Setup simples**: Um comando inicia tudo
- ✅ **Ranking global**: Toda turma compete no mesmo ranking
- ✅ **Sem configuração**: Funciona imediatamente
- ✅ **Backup automático**: Dados não se perdem

### **Para Alunos:**

- ✅ **Competição saudável**: Rankings em tempo real
- ✅ **Motivação extra**: Ver posição no ranking global
- ✅ **Persistência**: Pontuações mantidas entre sessões
- ✅ **Avatares**: Personalização visual

### **Técnico:**

- ✅ **Fallback robusto**: Funciona online e offline
- ✅ **API REST**: Facilmente extensível
- ✅ **Cross-platform**: Funciona em qualquer sistema
- ✅ **Zero configuração**: Pronto para usar

## 🔍 **Troubleshooting**

### **Porta em uso:**

```bash
# Parar todos os servidores
pkill -f "json-server|http.server"

# Ou forçar parada
lsof -ti:3001 | xargs kill -9
lsof -ti:8080 | xargs kill -9
```

### **Problemas de conexão:**

1. Verificar se ambos os servidores estão rodando
2. Testar URLs individualmente
3. Verificar firewall/antivírus
4. Usar modo offline (fallback automático)

### **Dados corrompidos:**

```bash
# Fazer backup
npm run backup

# Restaurar dados iniciais
git checkout db.json
```

## 🎉 **Projeto Finalizado!**

O sistema está **completamente funcional** com:

- ✅ Ranking compartilhado entre todos os usuários
- ✅ Jogos educativos sobre meio ambiente
- ✅ Sistema de pontuação avançado
- ✅ Interface moderna e responsiva
- ✅ Coleta seletiva com cores corretas
- ✅ Persistência robusta com fallback

**Pronto para uso em sala de aula!** 🎓🌱
