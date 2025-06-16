# 🌱 Eco Games - Jogos Educativos sobre Meio Ambiente

## 📋 Descrição

Website educativo completo com jogos interativos sobre meio ambiente e reciclagem, desenvolvido para crianças de até 14 anos. O projeto utiliza HTML, CSS, Bootstrap e Vue.js para criar uma experiência envolvente e educativa.

## 🎮 Jogos Disponíveis

### 1. Quiz Ambiental

- 14 perguntas sobre meio ambiente e sustentabilidade
- Sistema de pontuação com bônus por sequências de acertos
- Progresso visual e feedback imediato
- Perguntas aleatórias para maior rejogabilidade

### 2. Jogo de Arrastar e Soltar

- 20 itens para separação na coleta seletiva
- **5 lixeiras com cores corretas da coleta seletiva:**
  - 🟡 **Amarelo**: Plásticos
  - 🔵 **Azul**: Papéis
  - 🟤 **Marrom**: Orgânicos
  - 🔴 **Vermelho**: Metais
  - 🟢 **Verde**: Vidros
- Ícones apropriados para cada tipo de lixeira
- Efeitos visuais de arrastar e soltar
- Feedback educativo específico para cada acerto/erro

### 3. Jogo da Memória Ecológica

- 10 pares de cartas com temas ambientais
- 3 níveis de dificuldade (Fácil, Médio, Difícil)
- Sistema de tempo e contador de jogadas
- Animações 3D nas cartas
- Pontuação baseada em performance

## 🏆 Sistema de Pontuação

- **Quiz**: 10 pontos + bônus por sequência
- **Arrastar e Soltar**: 10 pontos + bônus por tipo de jogo
- **Memória**: Pontuação variável baseada em tempo e jogadas
- **Ranking persistente** salvo localmente

## 👤 Sistema de Usuário

- **Registro com:**
  - Nome do usuário
  - Ano escolar (1º Ano até 3º EM)
  - Sala/turma
  - **42+ avatares temáticos** (natureza, animais, plantas)
- Avatar exibido na navegação e ranking
- Dados salvos localmente

## 🌐 **Servidor JSON Server (Novo!)**

- **Persistência compartilhada** com JSON Server para rankings globais
- **API REST** com endpoints para ranking, usuários e estatísticas
- **Acesso em rede local** perfeito para uso em sala de aula
- **Backup automático** em localStorage como fallback offline
- **Indicador de status** de conexão em tempo real

### 🚀 **Como Iniciar o Servidor:**

```bash
# Opção 1: Servidor completo (recomendado)
./start-full-server.sh
# Website: http://localhost:8080
# API: http://localhost:3001/ranking

# Opção 2: Apenas JSON Server
npm start
# Website + API: http://localhost:3001/index.html

# Opção 3: Script simples
./start-server.sh
# Website + API: http://localhost:3001/index.html
```

### 🌐 **URLs de Acesso:**

- **Website**: http://localhost:8080 (opção 1) ou http://localhost:3001/index.html (opções 2-3)
- **API Ranking**: http://localhost:3001/ranking
- **Em rede**: http://[SEU_IP]:8080 ou http://[SEU_IP]:3001/index.html

### 📊 **Benefícios do Servidor:**

- **Ranking global**: Todos os alunos veem o mesmo ranking
- **Competição saudável**: Rankings atualizados em tempo real
- **Uso em sala**: Um professor roda o servidor, alunos se conectam
- **Persistência real**: Dados não se perdem ao fechar o navegador
- **Fallback inteligente**: Funciona offline se o servidor cair

## 🎨 Design e UX

- **Design moderno** com gradientes e efeitos glassmorphism
- **Totalmente responsivo** (desktop, tablet, mobile)
- **Animações suaves** com Animate.css
- **Cores da coleta seletiva** aplicadas corretamente
- **Acessibilidade** com estados de foco e reduced motion
- **Bootstrap 5** para layout responsivo

## 🛠️ Tecnologias Utilizadas

- **HTML5** - Estrutura semântica
- **CSS3** - Estilos modernos com variáveis CSS
- **Bootstrap 5** - Framework responsivo
- **Vue.js 3** - Reatividade e componentes
- **Bootstrap Icons** - Iconografia
- **Animate.css** - Animações

## 📱 Responsividade

- **Desktop**: Layout completo com todas as funcionalidades
- **Tablet** (≤768px): Ajustes de tamanho e layout
- **Mobile** (≤576px): Interface otimizada para touch
- **Pequenos** (≤400px): Layout minimalista

## 🌟 Melhorias Recentes

### Lixeiras de Coleta Seletiva

- ✅ Ícones específicos para cada tipo de material
- ✅ Cores oficiais da coleta seletiva brasileira
- ✅ Feedback educativo melhorado
- ✅ Efeitos visuais de drag-and-drop
- ✅ Inclusão da categoria "Vidro" (verde)
- ✅ Bordas coloridas nas lixeiras

## 🚀 Como Usar

1. Abra o arquivo `index.html` em um navegador
2. Preencha os dados no modal de boas-vindas
3. Escolha seu avatar favorito
4. Navegue pelos jogos usando o menu
5. Acumule pontos e suba no ranking!

## 📁 Estrutura de Arquivos

```
trabalho-meio-ambiente/
├── index.html          # Página principal
├── main.js            # Lógica Vue.js e jogos
├── style.css          # Estilos personalizados
└── README.md          # Esta documentação
```

## 🎯 Objetivos Educativos

- Conscientização sobre coleta seletiva
- Aprendizado sobre sustentabilidade
- Desenvolvimento de responsabilidade ambiental
- Gamificação do aprendizado ecológico

## 🔄 Persistência de Dados

- Ranking salvo no `localStorage`
- Simulação de persistência JSON
- Dados mantidos entre sessões
- Sistema de melhor pontuação

---

**Desenvolvido com 💚 para a educação ambiental infantil**
