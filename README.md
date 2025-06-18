# 🌱 Eco Games - Jogos Educativos sobre Meio Ambiente

![Eco Games](https://img.shields.io/badge/Versão-2.0.0-brightgreen.svg)
![HTML5](https://img.shields.io/badge/HTML5-E34F26?logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?logo=javascript&logoColor=black)
![Vue.js](https://img.shields.io/badge/Vue.js-4FC08D?logo=vue.js&logoColor=white)
![Bootstrap](https://img.shields.io/badge/Bootstrap-7952B3?logo=bootstrap&logoColor=white)

## 📋 Descrição

**Eco Games** é uma plataforma educativa interativa focada no ensino sobre meio ambiente e sustentabilidade para estudantes. O projeto oferece uma coleção de 4 jogos educativos que ensinam sobre coleta seletiva, reciclagem e consciência ambiental de forma divertida e envolvente.

### 🎯 Objetivo

Educar crianças e jovens sobre:

- **Coleta Seletiva** - Separação correta de resíduos
- **Reciclagem** - Processo de reaproveitamento de materiais
- **Sustentabilidade** - Práticas ambientalmente responsáveis
- **Consciência Ambiental** - Importância da preservação do meio ambiente

## 🎮 Jogos Disponíveis

### 1. 🧠 **Quiz Ambiental**

- **Objetivo**: Responder perguntas sobre meio ambiente e sustentabilidade
- **Mecânica**: Quiz de múltipla escolha com 4 alternativas
- **Pontuação**: +10 pontos por resposta correta
- **Dificuldade**: Progressiva com 20 perguntas

### 2. 🎯 **Clique Rápido**

- **Objetivo**: Identificar e clicar apenas nos materiais recicláveis
- **Mecânica**: Clique nos objetos corretos, evite os incorretos
- **Pontuação**: +5 pontos por acerto, -2 pontos por erro
- **Tempo**: 30 segundos de duração

### 3. 🗂️ **Arrastar e Soltar**

- **Objetivo**: Classificar materiais nas lixeiras corretas
- **Mecânica**: Drag & Drop dos materiais para as lixeiras certas
- **Pontuação**: +8 pontos por classificação correta
- **Sistema**: Coleta seletiva brasileira (5 cores)

### 4. 🧩 **Jogo da Memória**

- **Objetivo**: Encontrar pares de cartas com materiais recicláveis
- **Mecânica**: Clique para virar cartas e encontrar pares
- **Pontuação**: +3 pontos por par encontrado
- **Níveis**: Grid 4x4 com 8 pares

## 🎨 Características Visuais

### ✨ Sistema SVG Avançado

- **SVGs Inline**: Todos os ícones são SVGs incorporados (sem dependências externas)
- **Gradientes**: Efeitos visuais profissionais com gradientes lineares e radiais
- **Sombras**: Sistema de sombras drop-shadow para profundidade
- **Responsividade**: Adaptação automática para todos os dispositivos
- **Performance**: Carregamento instantâneo sem requisições HTTP

### 🎯 Design Brasileiro

- **Lixeiras**: Cores oficiais da coleta seletiva brasileira
  - 🔵 **Azul** - Papel e Papelão
  - 🟡 **Amarelo** - Plástico
  - 🟢 **Verde** - Vidro
  - 🔴 **Vermelho** - Metal
  - 🟤 **Marrom** - Orgânico

### 📱 Responsividade Completa

- **Desktop**: Experiência completa com todas as funcionalidades
- **Tablet**: Interface adaptada para telas médias (≤768px)
- **Mobile**: Otimização para smartphones (≤576px)
- **Mini Mobile**: Suporte para telas pequenas (≤400px)

## 🛠️ Tecnologias Utilizadas

### Frontend

- **HTML5** - Estrutura semântica moderna
- **CSS3** - Estilos avançados com Flexbox, Grid e animações
- **JavaScript ES6+** - Lógica de aplicação moderna
- **Vue.js 3** - Framework reativo para interface dinâmica
- **Bootstrap 5** - Framework CSS para componentes e layout
- **Animate.css** - Biblioteca de animações CSS

### Backend

- **Node.js** - Ambiente de execução JavaScript
- **JSON Server** - API REST fake para persistência de dados
- **Express.js** - Framework web (via json-server)

### Ícones e Fontes

- **Bootstrap Icons** - Biblioteca de ícones vetoriais
- **SVGs Customizados** - Ícones temáticos criados especificamente para o projeto

## 📦 Estrutura do Projeto

```
trabalho-meio-ambiente/
├── 📄 index.html          # Interface principal da aplicação
├── 🎨 style.css           # Estilos CSS personalizados e responsivos
├── ⚡ main.js             # Lógica Vue.js e controle dos jogos
├── 🗄️ db.json             # Banco de dados (ranking de pontuações)
├── 🔧 server.js           # Servidor backend (alternativo)
├── 🛠️ package.json        # Configurações do Node.js e dependências
├── 📝 CONFIGURACAO_JSONBIN.md # Guia para configurar o ranking no GitHub Pages
├── 🗺️ routes.json         # Configuração de rotas da API
├── 📖 README.md          # Documentação do projeto (este arquivo)
└── 📋 MELHORIAS_SVG.md   # Documentação das melhorias visuais
```

## 🚀 Como Executar o Projeto

### Pré-requisitos

- **Node.js** versão 14 ou superior
- **NPM** ou **Yarn**
- Navegador web moderno

### 📥 Instalação

1. **Clone ou baixe o projeto**

```bash
cd trabalho-meio-ambiente
```

2. **Instale as dependências**

```bash
npm install
```

### ▶️ Execução

#### Opção 1: JSON Server (Recomendado)

```bash
# Iniciar a API do ranking
npm start
# ou
npm run server
# ou
npm run dev
```

A API estará disponível em: `http://localhost:3001`

#### Opção 2: Servidor Python (Simples)

```bash
# Em um terminal separado, sirva os arquivos estáticos
python3 -m http.server 8000
```

O site estará disponível em: `http://localhost:8000`

#### Opção 3: Servidor Node.js customizado

```bash
node server.js
```

### 🌐 Acesso

Abra seu navegador e acesse:

- **Site**: `http://localhost:8000` (com Python)
- **API**: `http://localhost:3001` (JSON Server)

## 🎯 Como Jogar

### 1. **Primeiro Acesso**

1. Preencha seu nome (máximo 20 caracteres)
2. Selecione seu ano escolar
3. Digite sua turma/sala
4. Escolha um avatar temático
5. Clique em "Começar a Jogar"

### 2. **Interface Principal**

- **Barra Superior**: Exibe pontos atuais e avatar selecionado
- **Menu Principal**: Acesso aos 4 jogos disponíveis
- **Ranking**: Visualize os melhores jogadores
- **Perfil**: Altere suas informações quando necessário

### 3. **Sistema de Pontuação**

- **Quiz**: 10 pontos por resposta correta
- **Clique**: +5 correto, -2 incorreto
- **Arrastar**: 8 pontos por classificação correta
- **Memória**: 3 pontos por par encontrado

### 4. **Ranking**

- Sistema automático de classificação
- Armazena: Nome, Turma, Pontuação Total, Data
- Ranking atualizado em tempo real

## 🏆 Sistema de Gamificação

### 📊 Pontuação

- **Sistema Cumulativo**: Pontos se acumulam entre sessões
- **Feedback Imediato**: Pontuação exibida em tempo real
- **Ranking Global**: Competição saudável entre estudantes

### 🎖️ Avatares Temáticos

13 avatares disponíveis com tema ambiental:

- 🍃 Folha (símbolo da natureza)
- 🌳 Árvore (representando florestas)
- 💧 Gota d'água (recursos hídricos)
- 🌸 Flor (biodiversidade)
- ☀️ Sol (energia renovável)
- ☁️ Nuvem (ciclo da água)
- 🏔️ Montanha (ecossistemas)
- 🍄 Cogumelo (decomposição natural)
- 🌵 Cacto (adaptação ambiental)
- 🥤 Garrafa PET (reciclagem)
- 🥫 Lata (coleta seletiva)
- 🗂️ Lixeira (organização)
- ♻️ Reciclagem (sustentabilidade)

## 🎨 Melhorias Visuais Implementadas

### ✨ Sistema SVG Avançado

O projeto possui um sistema completo de SVGs customizados:

#### 🎯 **Categorias de SVGs**

- **Lixeiras** (`bins`): 5 lixeiras com cores oficiais brasileiras
- **Materiais** (`materials`): Objetos recicláveis realistas
- **Avatares** (`avatars`): Elementos naturais temáticos
- **Interface** (`ui`): Ícones de navegação e ações

#### 🎨 **Melhorias Visuais**

- **Gradientes**: Efeitos de profundidade em todos os SVGs
- **Sombras**: Sistema drop-shadow para realismo
- **Animações**: Transições suaves e efeitos hover
- **Responsividade**: Redimensionamento inteligente

#### 📐 **Sistema de Tamanhos**

- **Quiz**: 100px (foco principal)
- **Click**: 80px (comparação visual)
- **Drag & Drop**: 60px (gameplay fluido)
- **Memória**: 50px (grid compacto)
- **Navegação**: 28px-48px (contexto específico)

Para mais detalhes sobre as melhorias visuais, consulte: [`MELHORIAS_SVG.md`](./MELHORIAS_SVG.md)

## 📚 Aspectos Educativos

### 🌍 **Consciência Ambiental**

- Ensina importância da separação de resíduos
- Demonstra processo de reciclagem
- Promove hábitos sustentáveis
- Contextualiza com realidade brasileira

### 🧠 **Desenvolvimento Cognitivo**

- **Memória**: Exercita capacidade de memorização
- **Raciocínio**: Desenvolve pensamento lógico
- **Coordenação**: Melhora habilidades motoras
- **Conhecimento**: Amplia vocabulário ambiental

### 🎯 **Metodologia Ativa**

- Aprendizado através de jogos (gamificação)
- Feedback imediato para correção
- Competição saudável via ranking
- Progressão gradual de dificuldade

## 🔧 Recursos Técnicos Avançados

### ⚡ **Performance**

- **SVGs Inline**: Zero requisições HTTP para ícones
- **CSS Otimizado**: Uso eficiente de Flexbox e Grid
- **Vue.js Reativo**: Atualização eficiente da interface
- **Lazy Loading**: Carregamento otimizado de recursos

### 🛡️ **Robustez**

- **Validação**: Formulários com validação client-side
- **Tratamento de Erros**: Gerenciamento de falhas de API
- **Backup**: Sistema de backup automático do ranking
- **Compatibilidade**: Suporte a navegadores modernos

### 📱 **Acessibilidade**

- **Contraste**: Cores com contraste adequado
- **Tamanhos**: Elementos com tamanhos mínimos
- **Navegação**: Interface intuitiva e clara
- **Responsividade**: Funcional em todos os dispositivos

## 🎓 Público-Alvo

### 👥 **Estudantes**

- **Faixa Etária**: 8 a 16 anos
- **Nível**: Ensino Fundamental e Médio
- **Contexto**: Salas de aula, casa, laboratórios

### 🏫 **Educadores**

- **Professores**: Ferramenta pedagógica interativa
- **Coordenadores**: Recursos para projetos ambientais
- **Pais**: Atividade educativa em família

## 🔄 Atualizações e Melhorias

### ✅ **Versão 2.0.0 - Sistema SVG Completo**

- Sistema completo de SVGs inline
- Melhorias visuais com gradientes e sombras
- Responsividade aprimorada
- Performance otimizada
- Correções na exibição de pontos

### 🚧 **Próximas Versões**

- Sistema de níveis de dificuldade
- Novos tipos de jogos educativos
- Relatórios de progresso para professores
- Modo offline completo
- Integração com redes sociais educativas

## 📞 Suporte e Contribuição

### 🐛 **Reportar Problemas**

Se encontrar algum bug ou tiver sugestões:

1. Verifique se o problema já foi reportado
2. Descreva o problema detalhadamente
3. Inclua informações do navegador e sistema
4. Forneça passos para reproduzir o erro

### 🤝 **Contribuições**

Contribuições são bem-vindas! Para contribuir:

1. Faça um fork do projeto
2. Crie uma branch para sua feature
3. Implemente suas melhorias
4. Teste em diferentes dispositivos
5. Envie um pull request

### 📧 **Contato**

Para dúvidas educacionais ou implementação:

- Consulte a documentação completa
- Verifique os exemplos de uso
- Entre em contato via issues do projeto

## 📄 Licença

Este projeto é licenciado sob a licença ISC - veja o arquivo [package.json](package.json) para detalhes.

---

**Eco Games** - Educação ambiental através de jogos interativos! 🌱🎮

_Desenvolvido com ❤️ para a educação ambiental brasileira_
