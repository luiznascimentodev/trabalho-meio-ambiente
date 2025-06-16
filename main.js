// main.js - Vue com roteamento simples e 4 jogos educativos
const { createApp, ref } = Vue;

// Jogo 1: Quiz de perguntas e respostas
const GameQuiz = {
  props: ["addPoints"],
  data() {
    return {
      questions: [
        {
          q: "Qual dessas atitudes ajuda a salvar o meio ambiente?",
          options: [
            "Jogar lixo no chão",
            "Plantar árvores",
            "Desperdiçar água",
            "Queimar lixo",
          ],
          answer: 1,
          img: "https://cdn-icons-png.flaticon.com/512/427/427735.png",
        },
        {
          q: "Qual é a cor da lixeira para papel?",
          options: ["Azul", "Vermelha", "Verde", "Amarela"],
          answer: 0,
          img: "https://cdn-icons-png.flaticon.com/512/483/483947.png",
        },
        {
          q: "O que devemos fazer com pilhas usadas?",
          options: [
            "Jogar no lixo comum",
            "Levar a ponto de coleta",
            "Enterrar",
            "Jogar no vaso sanitário",
          ],
          answer: 1,
          img: "https://cdn-icons-png.flaticon.com/512/1046/1046857.png",
        },
        {
          q: "Qual dessas ações economiza água?",
          options: [
            "Deixar torneira aberta",
            "Tomar banhos longos",
            "Consertar vazamentos",
            "Lavar calçada com mangueira",
          ],
          answer: 2,
          img: "https://cdn-icons-png.flaticon.com/512/1684/1684375.png",
        },
        // Novas perguntas
        {
          q: "Qual material deve ser descartado na lixeira verde?",
          options: ["Vidro", "Metal", "Papel", "Plástico"],
          answer: 0,
          img: "https://cdn-icons-png.flaticon.com/512/2921/2921816.png",
        },
        {
          q: "Qual dessas atitudes NÃO é sustentável?",
          options: [
            "Reutilizar sacolas",
            "Desperdiçar energia",
            "Reciclar papel",
            "Economizar água",
          ],
          answer: 1,
          img: "https://cdn-icons-png.flaticon.com/512/1046/1046857.png",
        },
        {
          q: "O que é compostagem?",
          options: [
            "Queimar lixo",
            "Transformar resíduos orgânicos em adubo",
            "Jogar lixo no rio",
            "Misturar lixo reciclável",
          ],
          answer: 1,
          img: "https://cdn-icons-png.flaticon.com/512/590/590685.png",
        },
        {
          q: "Qual é a melhor forma de economizar energia em casa?",
          options: [
            "Deixar luzes acesas",
            "Usar lâmpadas LED",
            "Ligar aparelhos sem necessidade",
            "Abrir a geladeira toda hora",
          ],
          answer: 1,
          img: "https://cdn-icons-png.flaticon.com/512/1046/1046857.png",
        },
        {
          q: "Qual dessas ações ajuda a proteger os animais?",
          options: [
            "Jogar lixo em rios",
            "Preservar florestas",
            "Desmatar",
            "Poluir o ar",
          ],
          answer: 1,
          img: "https://cdn-icons-png.flaticon.com/512/616/616408.png",
        },
        {
          q: "O que significa reciclar?",
          options: [
            "Reutilizar materiais",
            "Jogar fora",
            "Queimar lixo",
            "Enterrar resíduos",
          ],
          answer: 0,
          img: "https://cdn-icons-png.flaticon.com/512/565/565547.png",
        },
        {
          q: "Qual é a cor da lixeira para metal?",
          options: ["Vermelha", "Verde", "Azul", "Amarela"],
          answer: 0,
          img: "https://cdn-icons-png.flaticon.com/512/483/483946.png",
        },
        {
          q: "Por que devemos plantar árvores?",
          options: [
            "Para poluir o ar",
            "Para aumentar o lixo",
            "Para melhorar o meio ambiente",
            "Para gastar água",
          ],
          answer: 2,
          img: "https://cdn-icons-png.flaticon.com/512/427/427735.png",
        },
        {
          q: "Qual dessas atitudes reduz a produção de lixo?",
          options: [
            "Usar produtos descartáveis",
            "Reutilizar embalagens",
            "Jogar lixo na rua",
            "Desperdiçar comida",
          ],
          answer: 1,
          img: "https://cdn-icons-png.flaticon.com/512/565/565547.png",
        },
        {
          q: "O que devemos fazer com óleo de cozinha usado?",
          options: [
            "Jogar na pia",
            "Descartar no lixo comum",
            "Levar a ponto de coleta",
            "Jogar no vaso sanitário",
          ],
          answer: 2,
          img: "https://cdn-icons-png.flaticon.com/512/1046/1046857.png",
        },
      ],
      current: 0,
      selected: null,
      feedback: "",
      showNext: false,
      answeredQuestions: new Set(), // Controle de perguntas respondidas
      availableQuestions: [], // Array de perguntas disponíveis
      currentQuestion: null, // Pergunta atual
      isGameOver: false, // Controle de fim de jogo
      correctAnswers: 0, // Contador de respostas corretas
      totalAnswered: 0, // Total de perguntas respondidas
      streakCount: 0, // Sequência de acertos
    };
  },
  created() {
    // Inicializa o jogo com perguntas aleatórias
    this.initializeGame();
  },
  methods: {
    initializeGame() {
      // Embaralha todas as perguntas
      this.availableQuestions = [...this.questions]
        .map((value) => ({ value, sort: Math.random() }))
        .sort((a, b) => a.sort - b.sort)
        .map(({ value }) => value);

      // Seleciona a primeira pergunta
      this.selectNextQuestion();
    },
    selectNextQuestion() {
      if (this.availableQuestions.length === 0) {
        this.isGameOver = true;
        return;
      }

      // Seleciona uma pergunta aleatória das disponíveis
      const randomIndex = Math.floor(
        Math.random() * this.availableQuestions.length
      );
      this.currentQuestion = this.availableQuestions[randomIndex];

      // Remove a pergunta selecionada das disponíveis
      this.availableQuestions.splice(randomIndex, 1);

      // Reseta o estado da pergunta
      this.selected = null;
      this.feedback = "";
      this.showNext = false;
    },
    selectOption(idx) {
      if (this.selected !== null) return;

      this.selected = idx;
      this.totalAnswered++;

      if (idx === this.currentQuestion.answer) {
        this.correctAnswers++;
        this.streakCount++;

        // Calcula pontos bônus baseado na sequência
        let bonusPoints = 0;
        if (this.streakCount >= 3) bonusPoints = 5;
        if (this.streakCount >= 5) bonusPoints = 10;
        if (this.streakCount >= 7) bonusPoints = 15;

        this.feedback = `Correto! +10 pontos ${
          bonusPoints > 0 ? `+ ${bonusPoints} bônus!` : ""
        }`;
        this.addPoints(10 + bonusPoints, "quiz");

        // Adiciona efeitos visuais para feedback positivo
        this.$nextTick(() => {
          const element = document.querySelector(".feedback-message");
          if (element) {
            element.classList.add("animate__animated", "animate__bounceIn");
          }
        });
      } else {
        this.streakCount = 0;
        this.feedback =
          "Ops! A resposta correta era: " +
          this.currentQuestion.options[this.currentQuestion.answer];
      }

      // Marca a pergunta como respondida
      this.answeredQuestions.add(this.currentQuestion.id);
      this.showNext = true;
    },
    nextQuestion() {
      this.selectNextQuestion();
    },
    restartGame() {
      this.answeredQuestions.clear();
      this.correctAnswers = 0;
      this.totalAnswered = 0;
      this.streakCount = 0;
      this.isGameOver = false;
      this.initializeGame();
    },
  },
  template: `
    <div class="quiz-container text-center">
      <div v-if="!isGameOver">
        <!-- Progresso -->
        <div class="progress mb-4" style="height: 10px;">
          <div class="progress-bar bg-success" role="progressbar"
               :style="{ width: (answeredQuestions.size / questions.length * 100) + '%' }">
          </div>
        </div>

        <!-- Contador -->
        <div class="mb-4">
          <span class="badge bg-primary">Pergunta {{ totalAnswered + 1 }} de {{ questions.length }}</span>
          <span class="badge bg-success ms-2">{{ correctAnswers }} Corretas</span>
          <span v-if="streakCount >= 3" class="badge bg-warning ms-2">
            <i class="bi bi-lightning-fill"></i> {{ streakCount }}x
          </span>
        </div>

        <!-- Pergunta atual -->
        <div class="card mb-4 question-card animate__animated animate__fadeIn">
          <div class="card-body">
            <img :src="currentQuestion.img" class="quiz-image mb-4" alt="Quiz">
            <h3 class="mb-4">{{ currentQuestion.q }}</h3>

            <div class="row justify-content-center">
              <div class="col-12 col-md-6" v-for="(opt, idx) in currentQuestion.options" :key="idx">
                <button class="btn btn-outline-primary w-100 mb-3 p-3 option-button"
                        :class="{
                          'btn-success': selected === idx && idx === currentQuestion.answer,
                          'btn-danger': selected === idx && idx !== currentQuestion.answer,
                          'disabled': selected !== null
                        }"
                        @click="selectOption(idx)">
                  {{ opt }}
                </button>
              </div>
            </div>
          </div>
        </div>

        <!-- Feedback -->
        <div v-if="feedback"
             class="alert feedback-message"
             :class="feedback.includes('Correto') ? 'alert-success' : 'alert-danger'">
          {{ feedback }}
        </div>

        <!-- Próxima pergunta -->
        <button v-if="showNext"
                class="btn btn-primary btn-lg animate__animated animate__bounceIn"
                @click="nextQuestion">
          <i class="bi bi-arrow-right-circle-fill me-2"></i>
          Próxima Pergunta
        </button>
      </div>

      <!-- Fim de jogo -->
      <div v-else class="game-over animate__animated animate__fadeIn">
        <div class="card">
          <div class="card-body">
            <h2 class="mb-4">
              <i class="bi bi-trophy-fill text-warning me-2"></i>
              Parabéns!
            </h2>
            <p class="lead">Você completou o quiz!</p>
            <p class="mb-4">
              Acertou {{ correctAnswers }} de {{ questions.length }} perguntas
              ({{ Math.round(correctAnswers/questions.length*100) }}%)
            </p>
            <button class="btn btn-primary btn-lg" @click="restartGame">
              <i class="bi bi-arrow-repeat me-2"></i>
              Jogar Novamente
            </button>
          </div>
        </div>
      </div>
    </div>
  `,
};

// Jogo 2: Clique no lixo correto
const GameClick = {
  props: ["addPoints"],
  data() {
    return {
      items: [
        {
          name: "Garrafa PET",
          type: "Plástico",
          img: "https://cdn-icons-png.flaticon.com/512/2921/2921822.png",
        },
        {
          name: "Jornal",
          type: "Papel",
          img: "https://cdn-icons-png.flaticon.com/512/2921/2921820.png",
        },
        {
          name: "Casca de Banana",
          type: "Orgânico",
          img: "https://cdn-icons-png.flaticon.com/512/590/590685.png",
        },
        {
          name: "Lata",
          type: "Metal",
          img: "https://cdn-icons-png.flaticon.com/512/1046/1046857.png",
        },
        // Novos itens
        {
          name: "Garrafa de Vidro",
          type: "Vidro",
          img: "https://cdn-icons-png.flaticon.com/512/2921/2921816.png",
        },
        {
          name: "Caixa de Papelão",
          type: "Papel",
          img: "https://cdn-icons-png.flaticon.com/512/2921/2921820.png",
        },
        {
          name: "Restos de Verdura",
          type: "Orgânico",
          img: "https://cdn-icons-png.flaticon.com/512/590/590685.png",
        },
        {
          name: "Pote de Iogurte",
          type: "Plástico",
          img: "https://cdn-icons-png.flaticon.com/512/2921/2921822.png",
        },
        {
          name: "Revista",
          type: "Papel",
          img: "https://cdn-icons-png.flaticon.com/512/2921/2921820.png",
        },
        {
          name: "Tampa de Garrafa",
          type: "Metal",
          img: "https://cdn-icons-png.flaticon.com/512/1046/1046857.png",
        },
        {
          name: "Guardanapo Sujo",
          type: "Orgânico",
          img: "https://cdn-icons-png.flaticon.com/512/590/590685.png",
        },
        {
          name: "Saco Plástico",
          type: "Plástico",
          img: "https://cdn-icons-png.flaticon.com/512/2921/2921822.png",
        },
        {
          name: "Jornal Velho",
          type: "Papel",
          img: "https://cdn-icons-png.flaticon.com/512/2921/2921820.png",
        },
        {
          name: "Prego",
          type: "Metal",
          img: "https://cdn-icons-png.flaticon.com/512/1046/1046857.png",
        },
        {
          name: "Copo de Vidro",
          type: "Vidro",
          img: "https://cdn-icons-png.flaticon.com/512/2921/2921816.png",
        },
        {
          name: "Latinha de Refrigerante",
          type: "Metal",
          img: "https://cdn-icons-png.flaticon.com/512/1046/1046857.png",
        },
        {
          name: "Papelão",
          type: "Papel",
          img: "https://cdn-icons-png.flaticon.com/512/2921/2921820.png",
        },
        {
          name: "Casca de Ovo",
          type: "Orgânico",
          img: "https://cdn-icons-png.flaticon.com/512/590/590685.png",
        },
        {
          name: "Embalagem de Plástico",
          type: "Plástico",
          img: "https://cdn-icons-png.flaticon.com/512/2921/2921822.png",
        },
        {
          name: "Frasco de Perfume",
          type: "Vidro",
          img: "https://cdn-icons-png.flaticon.com/512/2921/2921816.png",
        },
      ],
      bins: [
        {
          name: "Plástico",
          color: "warning",
          icon: "https://cdn-icons-png.flaticon.com/512/483/483944.png",
        },
        {
          name: "Papel",
          color: "primary",
          icon: "https://cdn-icons-png.flaticon.com/512/483/483947.png",
        },
        {
          name: "Orgânico",
          color: "success",
          icon: "https://cdn-icons-png.flaticon.com/512/483/483950.png",
        },
        {
          name: "Metal",
          color: "danger",
          icon: "https://cdn-icons-png.flaticon.com/512/483/483946.png",
        },
      ],
      current: 0,
      feedback: "",
      showNext: false,
    };
  },
  methods: {
    selectBin(bin) {
      if (this.showNext) return;
      if (bin.name === this.items[this.current].type) {
        this.feedback = "Correto! +10 pontos";
        this.addPoints(10);
      } else {
        this.feedback = "Ops! Tente novamente!";
      }
      this.showNext = true;
    },
    nextItem() {
      this.current++;
      this.feedback = "";
      this.showNext = false;
    },
  },
  template: `
    <div class="text-center">
      <!-- Jogo 2: Clique no lixo correto -->
      <!-- IMAGEM DO ITEM: -->
      <img :src="items[current].img" class="click-image" alt="Lixo">
      <h4 class="mb-3">Em qual lixeira este item deve ser jogado?</h4>
      <div class="row justify-content-center mb-3">
        <div class="col-6 col-md-3" v-for="bin in bins" :key="bin.name">
          <button class="btn w-100 mb-2" :class="'btn-' + bin.color" @click="selectBin(bin)">
            <img :src="bin.icon" style="width:32px;"> {{ bin.name }}
          </button>
        </div>
      </div>
      <div v-if="feedback" class="alert" :class="feedback.includes('Correto') ? 'alert-success' : 'alert-danger'">{{ feedback }}</div>
      <button v-if="showNext && current < items.length - 1" class="btn btn-primary" @click="nextItem">Próximo</button>
      <div v-if="current === items.length - 1 && showNext" class="mt-3 fw-bold text-success">Fim do jogo! Parabéns!</div>
    </div>
  `,
};

// Jogo 3: Arraste e solte (simples)
const GameDrag = {
  props: ["addPoints"],
  data() {
    return {
      items: [
        {
          name: "Garrafa PET",
          type: "Plástico",
          img: "https://cdn-icons-png.flaticon.com/512/2921/2921822.png",
        },
        {
          name: "Jornal",
          type: "Papel",
          img: "https://cdn-icons-png.flaticon.com/512/2921/2921820.png",
        },
        {
          name: "Casca de Banana",
          type: "Orgânico",
          img: "https://cdn-icons-png.flaticon.com/512/590/590685.png",
        },
        {
          name: "Lata",
          type: "Metal",
          img: "https://cdn-icons-png.flaticon.com/512/1046/1046857.png",
        },
        {
          name: "Garrafa de Vidro",
          type: "Vidro",
          img: "https://cdn-icons-png.flaticon.com/512/2921/2921816.png",
        },
        {
          name: "Caixa de Papelão",
          type: "Papel",
          img: "https://cdn-icons-png.flaticon.com/512/2921/2921820.png",
        },
        {
          name: "Restos de Verdura",
          type: "Orgânico",
          img: "https://cdn-icons-png.flaticon.com/512/590/590685.png",
        },
        {
          name: "Pote de Iogurte",
          type: "Plástico",
          img: "https://cdn-icons-png.flaticon.com/512/2921/2921822.png",
        },
        {
          name: "Revista",
          type: "Papel",
          img: "https://cdn-icons-png.flaticon.com/512/2921/2921820.png",
        },
        {
          name: "Tampa de Garrafa",
          type: "Metal",
          img: "https://cdn-icons-png.flaticon.com/512/1046/1046857.png",
        },
        {
          name: "Guardanapo Sujo",
          type: "Orgânico",
          img: "https://cdn-icons-png.flaticon.com/512/590/590685.png",
        },
        {
          name: "Saco Plástico",
          type: "Plástico",
          img: "https://cdn-icons-png.flaticon.com/512/2921/2921822.png",
        },
        {
          name: "Jornal Velho",
          type: "Papel",
          img: "https://cdn-icons-png.flaticon.com/512/2921/2921820.png",
        },
        {
          name: "Prego",
          type: "Metal",
          img: "https://cdn-icons-png.flaticon.com/512/1046/1046857.png",
        },
        {
          name: "Copo de Vidro",
          type: "Vidro",
          img: "https://cdn-icons-png.flaticon.com/512/2921/2921816.png",
        },
        {
          name: "Latinha de Refrigerante",
          type: "Metal",
          img: "https://cdn-icons-png.flaticon.com/512/1046/1046857.png",
        },
        {
          name: "Papelão",
          type: "Papel",
          img: "https://cdn-icons-png.flaticon.com/512/2921/2921820.png",
        },
        {
          name: "Casca de Ovo",
          type: "Orgânico",
          img: "https://cdn-icons-png.flaticon.com/512/590/590685.png",
        },
        {
          name: "Embalagem de Plástico",
          type: "Plástico",
          img: "https://cdn-icons-png.flaticon.com/512/2921/2921822.png",
        },
        {
          name: "Frasco de Perfume",
          type: "Vidro",
          img: "https://cdn-icons-png.flaticon.com/512/2921/2921816.png",
        },
      ],
      bins: [
        {
          name: "Plástico",
          icon: "https://cdn-icons-png.flaticon.com/512/1673/1673221.png",
          color: "Amarelo",
          description: "Amarelo - Plásticos",
        },
        {
          name: "Papel",
          icon: "https://cdn-icons-png.flaticon.com/512/1673/1673218.png",
          color: "Azul",
          description: "Azul - Papéis",
        },
        {
          name: "Orgânico",
          icon: "https://cdn-icons-png.flaticon.com/512/1673/1673223.png",
          color: "Marrom",
          description: "Marrom - Orgânicos",
        },
        {
          name: "Metal",
          icon: "https://cdn-icons-png.flaticon.com/512/1673/1673219.png",
          color: "Vermelho",
          description: "Vermelho - Metais",
        },
        {
          name: "Vidro",
          icon: "https://cdn-icons-png.flaticon.com/512/1673/1673220.png",
          color: "Verde",
          description: "Verde - Vidros",
        },
      ],
      dragging: null,
      feedback: "",
      done: false,
    };
  },
  methods: {
    onDragStart(idx) {
      this.dragging = idx;
    },
    onDrop(bin, event) {
      // Remove o efeito visual de drag over
      event.target.classList.remove("drag-over");

      if (this.dragging === null) return;
      const item = this.items[this.dragging];
      if (item.type === bin.name) {
        this.feedback = `Correto! ${
          item.name
        } vai para a lixeira ${bin.color.toLowerCase()}! +10 pontos`;
        this.addPoints(10, "drag");
        this.items.splice(this.dragging, 1);
      } else {
        this.feedback = `Ops! ${
          item.name
        } não vai na lixeira ${bin.color.toLowerCase()}. Tente novamente!`;
      }
      this.dragging = null;
      if (this.items.length === 0) this.done = true;
    },
    getBinBorderColor(color) {
      const colors = {
        Amarelo: "#ffc107",
        Azul: "#007bff",
        Marrom: "#8b4513",
        Vermelho: "#dc3545",
        Verde: "#28a745",
      };
      return colors[color] || "#6c757d";
    },
  },
  template: `
    <div class="text-center">
      <!-- Jogo 3: Arraste e solte -->
      <!-- IMAGEM DO JOGO: -->
      <img src="https://cdn-icons-png.flaticon.com/512/565/565547.png" class="drag-image" alt="Arraste">
      <h4 class="mb-4">Arraste o lixo para a lixeira correta!</h4>

      <!-- Itens para arrastar -->
      <div class="game-section">
        <h5>
          <i class="bi bi-box-seam me-2"></i>Itens para separar:
        </h5>
        <div class="d-flex flex-wrap justify-content-center gap-3">
          <div v-for="(item, idx) in items" :key="item.name"
               class="draggable-item"
               draggable="true"
               @dragstart="onDragStart(idx)">
            <img :src="item.img" :alt="item.name">
            <div>{{ item.name }}</div>
          </div>
        </div>
      </div>

      <!-- Lixeiras de coleta seletiva -->
      <div class="game-section">
        <h5>
          <i class="bi bi-recycle me-2"></i>Lixeiras de Coleta Seletiva:
        </h5>
        <div class="d-flex flex-wrap justify-content-center gap-3">
          <div v-for="bin in bins" :key="bin.name"
               class="drop-zone"
               :data-color="bin.color"
               :style="{borderColor: getBinBorderColor(bin.color)}"
               @dragover.prevent
               @dragenter.prevent="$event.target.classList.add('drag-over')"
               @dragleave.prevent="$event.target.classList.remove('drag-over')"
               @drop="onDrop(bin, $event)">
            <img :src="bin.icon" :alt="bin.name">
            <div class="fw-bold">{{ bin.name }}</div>
            <small>{{ bin.color }}</small>
          </div>
        </div>
      </div>

      <div v-if="feedback"
           class="alert animate__animated animate__fadeIn"
           :class="feedback.includes('Correto') ? 'alert-success' : 'alert-danger'">
        {{ feedback }}
      </div>

      <div v-if="done" class="mt-4">
        <div class="alert alert-success animate__animated animate__bounceIn">
          <h5 class="mb-3">
            <i class="bi bi-check-circle-fill me-2"></i>
            Parabéns! Você separou todo o lixo corretamente!
          </h5>
          <p class="mb-0">Você está ajudando a preservar o meio ambiente! 🌱</p>
        </div>
      </div>
    </div>
  `,
};

// Jogo 4: Memória ecológica
const GameMemory = {
  props: ["addPoints"],
  data() {
    return {
      cards: [
        {
          id: 1,
          name: "Árvore",
          img: "https://cdn-icons-png.flaticon.com/512/427/427735.png",
        },
        {
          id: 2,
          name: "Água",
          img: "https://cdn-icons-png.flaticon.com/512/1684/1684375.png",
        },
        {
          id: 3,
          name: "Reciclagem",
          img: "https://cdn-icons-png.flaticon.com/512/565/565547.png",
        },
        {
          id: 4,
          name: "Lixeira",
          img: "https://cdn-icons-png.flaticon.com/512/483/483947.png",
        },
        {
          id: 5,
          name: "Folha",
          img: "https://cdn-icons-png.flaticon.com/512/616/616408.png",
        },
        {
          id: 6,
          name: "Garrafa PET",
          img: "https://cdn-icons-png.flaticon.com/512/2921/2921822.png",
        },
        {
          id: 7,
          name: "Jornal",
          img: "https://cdn-icons-png.flaticon.com/512/2921/2921820.png",
        },
        {
          id: 8,
          name: "Casca de Banana",
          img: "https://cdn-icons-png.flaticon.com/512/590/590685.png",
        },
        {
          id: 9,
          name: "Lata",
          img: "https://cdn-icons-png.flaticon.com/512/1046/1046857.png",
        },
        {
          id: 10,
          name: "Garrafa de Vidro",
          img: "https://cdn-icons-png.flaticon.com/512/2921/2921816.png",
        },
      ],
      deck: [],
      flipped: [],
      matched: [],
      feedback: "",
      isLocked: false,
      moves: 0,
      startTime: null,
      endTime: null,
      isGameOver: false,
      difficulty: "medium", // easy, medium, hard
      difficultySettings: {
        easy: { pairs: 6, timeLimit: 120 },
        medium: { pairs: 8, timeLimit: 180 },
        hard: { pairs: 10, timeLimit: 240 },
      },
      timeLeft: 0,
      timer: null,
    };
  },
  computed: {
    gameStats() {
      if (!this.endTime) return null;
      const timeSpent = Math.floor((this.endTime - this.startTime) / 1000);
      const minutes = Math.floor(timeSpent / 60);
      const seconds = timeSpent % 60;
      return {
        moves: this.moves,
        time: `${minutes}:${seconds.toString().padStart(2, "0")}`,
        score: this.calculateScore(),
      };
    },
  },
  created() {
    this.initializeGame();
  },
  beforeUnmount() {
    this.stopTimer();
  },
  methods: {
    initializeGame() {
      // Seleciona cartas baseado na dificuldade
      const numPairs = this.difficultySettings[this.difficulty].pairs;
      const selectedCards = [...this.cards]
        .sort(() => Math.random() - 0.5)
        .slice(0, numPairs);

      // Duplica e embaralha
      this.deck = [...selectedCards, ...selectedCards]
        .map((card) => ({ ...card, isFlipped: false, isMatched: false }))
        .sort(() => Math.random() - 0.5);

      this.flipped = [];
      this.matched = [];
      this.moves = 0;
      this.feedback = "";
      this.isLocked = false;
      this.isGameOver = false;
      this.startTime = Date.now();
      this.timeLeft = this.difficultySettings[this.difficulty].timeLimit;

      this.startTimer();
    },
    startTimer() {
      this.stopTimer();
      this.timer = setInterval(() => {
        this.timeLeft--;
        if (this.timeLeft <= 0) {
          this.endGame(false);
        }
      }, 1000);
    },
    stopTimer() {
      if (this.timer) {
        clearInterval(this.timer);
        this.timer = null;
      }
    },
    flipCard(idx) {
      if (
        this.isLocked ||
        this.flipped.length === 2 ||
        this.flipped.includes(idx) ||
        this.matched.includes(idx) ||
        this.isGameOver
      )
        return;

      this.deck[idx].isFlipped = true;
      this.flipped.push(idx);

      if (this.flipped.length === 2) {
        this.moves++;
        this.isLocked = true;
        this.checkMatch();
      }
    },
    checkMatch() {
      const [firstIdx, secondIdx] = this.flipped;
      const firstCard = this.deck[firstIdx];
      const secondCard = this.deck[secondIdx];

      if (firstCard.id === secondCard.id) {
        // Match encontrado
        this.matched.push(...this.flipped);
        this.feedback = "Par encontrado! +10 pontos";
        this.addPoints(10, "memory");

        // Bônus por velocidade
        if (this.moves === 2) {
          this.feedback = "Incrível! Primeiro par! +15 pontos";
          this.addPoints(15, "memory");
        }

        // Verifica vitória
        if (this.matched.length === this.deck.length) {
          this.endGame(true);
        }
      } else {
        // Sem match
        setTimeout(() => {
          this.deck[firstIdx].isFlipped = false;
          this.deck[secondIdx].isFlipped = false;
        }, 1000);
      }

      setTimeout(() => {
        this.flipped = [];
        this.isLocked = false;
        this.feedback = "";
      }, 1000);
    },
    calculateScore() {
      const baseScore = this.matched.length * 5;
      const timeBonus = Math.max(0, this.timeLeft);
      const movesPenalty = Math.max(0, this.moves - this.deck.length);
      return baseScore + timeBonus - movesPenalty;
    },
    endGame(won) {
      this.stopTimer();
      this.endTime = Date.now();
      this.isGameOver = true;

      if (won) {
        const score = this.calculateScore();
        this.feedback = `Parabéns! Você venceu! +${score} pontos`;
        this.addPoints(score, "memory");
      } else {
        this.feedback = "Tempo esgotado! Tente novamente!";
      }
    },
    changeDifficulty(level) {
      this.difficulty = level;
      this.initializeGame();
    },
  },
  template: `
    <div class="memory-game-container text-center">
      <!-- Controles do jogo -->
      <div class="controls mb-4">
        <div class="difficulty-selector btn-group">
          <button class="btn"
                  v-for="level in ['easy', 'medium', 'hard']"
                  :key="level"
                  :class="{
                    'btn-primary': difficulty === level,
                    'btn-outline-primary': difficulty !== level
                  }"
                  @click="changeDifficulty(level)">
            {{ level.charAt(0).toUpperCase() + level.slice(1) }}
          </button>
        </div>
      </div>

      <!-- Status do jogo -->
      <div class="status-bar mb-4">
        <div class="row align-items-center">
          <div class="col">
            <span class="badge bg-primary">
              <i class="bi bi-clock"></i>
              {{ Math.floor(timeLeft / 60) }}:{{ (timeLeft % 60).toString().padStart(2, '0') }}
            </span>
          </div>
          <div class="col">
            <span class="badge bg-success">
              <i class="bi bi-arrow-repeat"></i>
              {{ moves }} Jogadas
            </span>
          </div>
          <div class="col">
            <span class="badge bg-info">
              <i class="bi bi-check2-circle"></i>
              {{ matched.length/2 }}/{{ deck.length/2 }} Pares
            </span>
          </div>
        </div>
      </div>

      <!-- Tabuleiro -->
      <div class="memory-board">
        <div v-for="(card, idx) in deck"
             :key="idx"
             class="memory-card"
             :class="{
               'flipped': card.isFlipped,
               'matched': matched.includes(idx)
             }"
             @click="flipCard(idx)">
          <div class="card-inner">
            <div class="card-front">
              <i class="bi bi-question-lg"></i>
            </div>
            <div class="card-back">
              <img :src="card.img" :alt="card.name">
            </div>
          </div>
        </div>
      </div>

      <!-- Feedback -->
      <div v-if="feedback"
           class="alert mt-4"
           :class="feedback.includes('Parabéns') ? 'alert-success' : 'alert-info'">
        {{ feedback }}
      </div>

      <!-- Modal de fim de jogo -->
      <div v-if="isGameOver" class="game-over-modal">
        <div class="card animate__animated animate__bounceIn">
          <div class="card-body">
            <h3 class="card-title mb-4">
              <i class="bi bi-trophy-fill text-warning me-2"></i>
              {{ matched.length === deck.length ? 'Parabéns!' : 'Fim de Jogo' }}
            </h3>
            <div class="stats">
              <p class="mb-2">Tempo: {{ gameStats.time }}</p>
              <p class="mb-2">Jogadas: {{ gameStats.moves }}</p>
              <p class="mb-4">Pontuação: {{ gameStats.score }}</p>
            </div>
            <button class="btn btn-primary btn-lg" @click="initializeGame">
              <i class="bi bi-arrow-repeat me-2"></i>
              Jogar Novamente
            </button>
          </div>
        </div>
      </div>
    </div>
  `,
};

// App principal
createApp({
  data() {
    return {
      points: 0,
      currentPage: "quiz",
      ranking: [],
      games: [
        { name: "Quiz", route: "quiz", icon: "bi bi-question-circle" },
        { name: "Arraste e Solte", route: "drag", icon: "bi bi-arrows-move" },
        { name: "Memória", route: "memory", icon: "bi bi-grid-3x3-gap" },
        { name: "Ranking", route: "ranking", icon: "bi bi-trophy-fill" },
      ],
      // Usuário
      userName: "",
      userClass: "",
      userIcon: "",
      userIcons: [
        "https://cdn-icons-png.flaticon.com/512/616/616408.png", // folha
        "https://cdn-icons-png.flaticon.com/512/427/427735.png", // árvore
        "https://cdn-icons-png.flaticon.com/512/1684/1684375.png", // gota
        "https://cdn-icons-png.flaticon.com/512/2921/2921822.png", // garrafa reciclável
        "https://cdn-icons-png.flaticon.com/512/1046/1046857.png", // pilha
        "https://cdn-icons-png.flaticon.com/512/483/483947.png", // lixeira azul
        "https://cdn-icons-png.flaticon.com/512/565/565547.png", // reciclagem
        "https://cdn-icons-png.flaticon.com/512/616/616430.png", // flor
        "https://cdn-icons-png.flaticon.com/512/616/616484.png", // sol
        "https://cdn-icons-png.flaticon.com/512/616/616490.png", // nuvem
        "https://cdn-icons-png.flaticon.com/512/616/616495.png", // chuva
        "https://cdn-icons-png.flaticon.com/512/616/616497.png", // arco-íris
        "https://cdn-icons-png.flaticon.com/512/616/616502.png", // montanha
        "https://cdn-icons-png.flaticon.com/512/616/616509.png", // cogumelo
        "https://cdn-icons-png.flaticon.com/512/616/616511.png", // cacto
        "https://cdn-icons-png.flaticon.com/512/616/616513.png", // pinheiro
        "https://cdn-icons-png.flaticon.com/512/616/616515.png", // galho
        "https://cdn-icons-png.flaticon.com/512/616/616517.png", // tronco
        "https://cdn-icons-png.flaticon.com/512/616/616519.png", // folha dupla
        "https://cdn-icons-png.flaticon.com/512/616/616521.png", // flor amarela
        "https://cdn-icons-png.flaticon.com/512/616/616523.png", // flor azul
        "https://cdn-icons-png.flaticon.com/512/616/616525.png", // flor rosa
        "https://cdn-icons-png.flaticon.com/512/616/616527.png", // flor branca
        "https://cdn-icons-png.flaticon.com/512/616/616529.png", // flor vermelha
        "https://cdn-icons-png.flaticon.com/512/616/616531.png", // flor laranja
        "https://cdn-icons-png.flaticon.com/512/616/616533.png", // flor roxa
        "https://cdn-icons-png.flaticon.com/512/616/616535.png", // flor verde
        "https://cdn-icons-png.flaticon.com/512/616/616537.png", // flor azul claro
        "https://cdn-icons-png.flaticon.com/512/616/616539.png", // flor azul escuro
        "https://cdn-icons-png.flaticon.com/512/616/616541.png", // flor com folha
        "https://cdn-icons-png.flaticon.com/512/616/616543.png", // flor com botão
        "https://cdn-icons-png.flaticon.com/512/616/616545.png", // flor com caule
        "https://cdn-icons-png.flaticon.com/512/616/616547.png", // flor com pétalas
        "https://cdn-icons-png.flaticon.com/512/616/616549.png", // flor com sementes
        "https://cdn-icons-png.flaticon.com/512/616/616551.png", // flor com raiz
        "https://cdn-icons-png.flaticon.com/512/616/616553.png", // flor com abelha
        "https://cdn-icons-png.flaticon.com/512/616/616555.png", // flor com borboleta
        "https://cdn-icons-png.flaticon.com/512/616/616557.png", // flor com joaninha
        "https://cdn-icons-png.flaticon.com/512/616/616559.png", // flor com formiga
        "https://cdn-icons-png.flaticon.com/512/616/616561.png", // flor com caracol
        "https://cdn-icons-png.flaticon.com/512/616/616563.png", // flor com pássaro
        "https://cdn-icons-png.flaticon.com/512/616/616565.png", // flor com sol
      ],
      streak: 0, // Para o sistema de pontos em sequência
      anosEscolares: [
        "1º Ano",
        "2º Ano",
        "3º Ano",
        "4º Ano",
        "5º Ano",
        "6º Ano",
        "7º Ano",
        "8º Ano",
        "9º Ano",
        "1º EM",
        "2º EM",
        "3º EM",
      ],
      userClassYear: "",
      userClassLetter: "",
      isOnline: true, // Status de conexão com a API
      connectionStatus: "checking", // checking, online, offline
    };
  },
  mounted() {
    // Exibe o modal ao carregar
    const modal = new bootstrap.Modal(document.getElementById("welcomeModal"));
    if (!this.userName || !this.userClass || !this.userIcon) {
      setTimeout(() => modal.show(), 200);
    }
    this.loadRanking();
    this.checkConnection();
  },
  computed: {
    currentComponent() {
      switch (this.currentPage) {
        case "quiz":
          return GameQuiz;
        case "drag":
          return GameDrag;
        case "memory":
          return GameMemory;
        default:
          return GameQuiz;
      }
    },
  },
  methods: {
    addPoints(pts, type = "jogo") {
      // Sistema de pontos mais complexo
      // type pode ser: 'quiz', 'click', 'drag', 'memory', 'bonus', etc
      let bonus = 0;
      if (type === "quiz") bonus = 2; // Quiz vale mais
      if (type === "click") bonus = 1;
      if (type === "drag") bonus = 3; // Arraste vale mais
      if (type === "memory") bonus = 2;
      if (type === "bonus") bonus = 5;
      // Pontuação baseada em acertos seguidos
      if (!this.streak) this.streak = 0;
      this.streak++;
      let streakBonus = Math.floor(this.streak / 3) * 2; // a cada 3 acertos, +2 pontos
      this.points += pts + bonus + streakBonus;
      this.saveRanking();
    },
    async saveRanking() {
      try {
        // URL da API (detecta automaticamente)
        const API_URL =
          window.location.port === "8080"
            ? "http://localhost:3001"
            : window.location.port === "3001"
            ? `${window.location.protocol}//${window.location.hostname}:3001`
            : "http://localhost:3001";

        // Verifica se o usuário já existe no ranking
        const response = await fetch(`${API_URL}/ranking`);
        const ranking = await response.json();

        const existingUser = ranking.find(
          (u) => u.name === this.userName && u.class === this.userClass
        );

        if (existingUser) {
          // Atualiza pontos apenas se for maior (mantém o melhor resultado)
          if (this.points > existingUser.points) {
            await fetch(`${API_URL}/ranking/${existingUser.id}`, {
              method: "PUT",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                ...existingUser,
                points: this.points,
                avatar: this.userIcon,
                lastUpdate: new Date().toISOString(),
              }),
            });
          }
        } else {
          // Adiciona novo usuário
          await fetch(`${API_URL}/ranking`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              name: this.userName,
              class: this.userClass,
              points: this.points,
              avatar: this.userIcon,
              createdAt: new Date().toISOString(),
              lastUpdate: new Date().toISOString(),
            }),
          });
        }

        // Recarrega o ranking após salvar
        await this.loadRanking();
      } catch (error) {
        console.warn(
          "Erro ao salvar ranking na API, usando localStorage como fallback:",
          error
        );
        // Fallback para localStorage se a API não estiver disponível
        this.saveRankingLocal();
      }
    },

    saveRankingLocal() {
      // Fallback para localStorage (método original)
      let ranking = JSON.parse(localStorage.getItem("ranking") || "[]");
      const idx = ranking.findIndex(
        (u) => u.name === this.userName && u.class === this.userClass
      );
      if (idx >= 0) {
        // Atualiza pontos apenas se for maior (mantém o melhor resultado)
        if (this.points > ranking[idx].points) {
          ranking[idx].points = this.points;
          ranking[idx].avatar = this.userIcon;
        }
      } else {
        ranking.push({
          name: this.userName,
          class: this.userClass,
          points: this.points,
          avatar: this.userIcon,
        });
      }
      ranking.sort((a, b) => b.points - a.points);
      localStorage.setItem("ranking", JSON.stringify(ranking));
      this.ranking = ranking;
    },
    async loadRanking() {
      try {
        // URL da API (detecta automaticamente)
        const API_URL =
          window.location.port === "8080"
            ? "http://localhost:3001"
            : window.location.port === "3001"
            ? `${window.location.protocol}//${window.location.hostname}:3001`
            : "http://localhost:3001";

        const response = await fetch(`${API_URL}/ranking`);
        const ranking = await response.json();

        // Ordena por pontuação (maior primeiro)
        this.ranking = ranking.sort((a, b) => b.points - a.points);

        // Salva como backup no localStorage
        localStorage.setItem("ranking_backup", JSON.stringify(this.ranking));
      } catch (error) {
        console.warn(
          "Erro ao carregar ranking da API, usando localStorage como fallback:",
          error
        );
        // Fallback para localStorage se a API não estiver disponível
        this.loadRankingLocal();
      }
    },

    loadRankingLocal() {
      // Fallback para localStorage (método original)
      const ranking = JSON.parse(
        localStorage.getItem("ranking") ||
          localStorage.getItem("ranking_backup") ||
          "[]"
      );
      this.ranking = ranking.sort((a, b) => b.points - a.points);
    },
    openRanking() {
      this.loadRanking();
      const modal = new bootstrap.Modal(
        document.getElementById("rankingModal")
      );
      modal.show();
    },
    navigate(route) {
      if (route !== this.currentPage) {
        if (route !== "ranking") this.streak = 0;
        this.currentPage = route;
      }
    },
    saveUserInfo() {
      if (
        this.userName &&
        this.userClassYear &&
        this.userClassLetter &&
        this.userIcon
      ) {
        this.userClass = this.userClassYear + " " + this.userClassLetter;
        const modal = bootstrap.Modal.getInstance(
          document.getElementById("welcomeModal")
        );
        modal.hide();
      }
    },

    formatDate(dateString) {
      if (!dateString) return "Local";
      const date = new Date(dateString);
      const now = new Date();
      const diffMinutes = Math.floor((now - date) / (1000 * 60));

      if (diffMinutes < 1) return "Agora";
      if (diffMinutes < 60) return `${diffMinutes}min atrás`;

      const diffHours = Math.floor(diffMinutes / 60);
      if (diffHours < 24) return `${diffHours}h atrás`;

      const diffDays = Math.floor(diffHours / 24);
      if (diffDays < 7) return `${diffDays}d atrás`;

      return date.toLocaleDateString("pt-BR");
    },

    async checkConnection() {
      try {
        const API_URL =
          window.location.port === "8080"
            ? "http://localhost:3001"
            : window.location.port === "3001"
            ? `${window.location.protocol}//${window.location.hostname}:3001`
            : "http://localhost:3001";

        this.connectionStatus = "checking";

        // Tenta fazer uma requisição simples
        const response = await fetch(`${API_URL}/ranking`, {
          method: "GET",
          timeout: 5000,
        });

        if (response.ok) {
          this.connectionStatus = "online";
          this.isOnline = true;
        } else {
          throw new Error("API não respondeu corretamente");
        }
      } catch (error) {
        console.warn("Servidor offline, usando modo local:", error);
        this.connectionStatus = "offline";
        this.isOnline = false;
      }
    },
  },
}).mount("#app");
