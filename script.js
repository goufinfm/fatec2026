const topics = [
  {
    title: "Matemática",
    detail: "Funções, porcentagem, razão, probabilidade, geometria e interpretação de gráficos.",
  },
  {
    title: "Português",
    detail: "Compreensão de texto, gramática aplicada, coesão e coerência.",
  },
  {
    title: "Redação",
    detail: "Dissertação argumentativa com repertório sociocultural.",
  },
  {
    title: "Física",
    detail: "Mecânica básica, elétrica, óptica e análise de unidades.",
  },
  {
    title: "Química",
    detail: "Reações, soluções, tabela periódica e estequiometria básica.",
  },
  {
    title: "Biologia",
    detail: "Citologia, genética, ecologia e fisiologia humana.",
  },
  {
    title: "História",
    detail: "Brasil República, Era Vargas, Ditadura e temas contemporâneos.",
  },
  {
    title: "Geografia",
    detail: "Urbanização, economia brasileira, clima e geopolítica.",
  },
  {
    title: "Inglês",
    detail: "Leitura e interpretação de textos curtos.",
  },
];

const schedule = [
  {
    month: "Fevereiro",
    focus: "Fundamentos e diagnóstico inicial",
    goals: [
      "Resolver 2 listas de Matemática básica",
      "Produzir 2 redações com correção",
      "Revisar interpretação de texto",
    ],
    exam: "Simulado FATEC: 28/02/2026",
  },
  {
    month: "Março",
    focus: "Funções, gramática aplicada e ciências da natureza",
    goals: [
      "Funções e gráficos (10 exercícios por dia)",
      "Química: reações e soluções",
      "Biologia: ecologia e genética",
    ],
    exam: "Simulado FATEC: 28/03/2026",
  },
  {
    month: "Abril",
    focus: "Humanas + consolidação de Matemática",
    goals: [
      "História do Brasil República",
      "Geografia econômica e urbana",
      "Matemática: probabilidade e porcentagem",
    ],
    exam: "Simulado FATEC: 25/04/2026",
  },
  {
    month: "Maio",
    focus: "Treino intensivo e redação avançada",
    goals: [
      "3 redações completas com tempo",
      "Física: mecânica e eletricidade",
      "Português: coesão e coerência",
    ],
    exam: "Simulado FATEC: 30/05/2026",
  },
  {
    month: "Junho",
    focus: "Revisão final e prova oficial",
    goals: [
      "Revisão por mapa de erros",
      "Simulados cronometrados",
      "Estratégia de prova e descanso",
    ],
    exam: "Simulado FATEC: 20/06/2026",
  },
  {
    month: "Julho",
    focus: "Pós-prova e reforço de pontos fracos",
    goals: [
      "Revisão leve e leitura",
      "Refazer questões erradas",
      "Atualizar plano para próximos passos",
    ],
    exam: "Simulado FATEC: 25/07/2026",
  },
];

const focusOptions = {
  Matemática: [
    "Resolver 15 questões de funções e gráficos",
    "Treinar porcentagem e razão com exercícios da FATEC",
    "Revisar geometria plana + interpretação de gráficos",
  ],
  Português: [
    "Ler 2 textos e identificar ideia central",
    "Revisar concordância e regência com exemplos",
    "Resolver 10 questões de gramática aplicada",
  ],
  Redação: [
    "Planejar uma dissertação com 3 argumentos",
    "Escrever introdução + 2 parágrafos de desenvolvimento",
    "Revisar coesão e repertório sociocultural",
  ],
  Física: [
    "Resolver 10 questões de mecânica (MRU/MRUV)",
    "Treinar circuitos simples e associação de resistores",
    "Revisar óptica geométrica com diagramas",
  ],
  Química: [
    "Exercícios de balanceamento e reações",
    "Revisar soluções e concentrações",
    "Treinar estequiometria básica",
  ],
  Biologia: [
    "Revisar ecologia e ciclos biogeoquímicos",
    "Exercícios de genética mendeliana",
    "Estudar fisiologia humana (sistemas)",
  ],
  História: [
    "Linha do tempo da República Velha",
    "Revisar Era Vargas e Ditadura",
    "Relacionar fatos históricos com temas atuais",
  ],
  Geografia: [
    "Urbanização e problemas sociais",
    "Geopolítica atual e blocos econômicos",
    "Climas do Brasil e impactos ambientais",
  ],
  Inglês: [
    "Ler 2 textos curtos e responder questões",
    "Identificar cognatos e falso cognatos",
    "Revisar vocabulário acadêmico básico",
  ],
};

const topicsContainer = document.getElementById("topics");
const scheduleContainer = document.getElementById("schedule");
const focusControls = document.getElementById("focus-controls");
const focusContent = document.getElementById("focus-content");
const progressFill = document.getElementById("progress-fill");
const progressText = document.getElementById("progress-text");
const resetButton = document.getElementById("reset-progress");

const STORAGE_KEY = "fatec-study-progress";

topics.forEach((topic) => {
  const card = document.createElement("div");
  card.className = "topic-card";
  card.innerHTML = `
    <strong>${topic.title}</strong>
    <span>${topic.detail}</span>
  `;
  topicsContainer.appendChild(card);
});

const progressState = JSON.parse(localStorage.getItem(STORAGE_KEY) || "{}");

const updateProgress = () => {
  const totalGoals = document.querySelectorAll("[data-progress-id]").length;
  const completedGoals = document.querySelectorAll("[data-progress-id]:checked").length;
  const percentage = totalGoals === 0 ? 0 : Math.round((completedGoals / totalGoals) * 100);

  progressFill.style.width = `${percentage}%`;
  progressText.textContent = `${percentage}% concluído (${completedGoals}/${totalGoals})`;
};

const saveProgress = (id, value) => {
  progressState[id] = value;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(progressState));
};

const renderFocusControls = () => {
  Object.keys(focusOptions).forEach((subject, index) => {
    const button = document.createElement("button");
    button.type = "button";
    button.className = "focus-button";
    button.textContent = subject;
    button.addEventListener("click", () => {
      document.querySelectorAll(".focus-button").forEach((btn) => btn.classList.remove("is-active"));
      button.classList.add("is-active");
      focusContent.innerHTML = `
        <h3>Foco em ${subject}</h3>
        <ul>
          ${focusOptions[subject].map((item) => `<li>${item}</li>`).join("")}
        </ul>
        <p class="focus-tip">Dica: combine esse foco com exercícios antigos da FATEC.</p>
      `;
    });

    if (index === 0) {
      button.classList.add("is-active");
      focusContent.innerHTML = `
        <h3>Foco em ${subject}</h3>
        <ul>
          ${focusOptions[subject].map((item) => `<li>${item}</li>`).join("")}
        </ul>
        <p class="focus-tip">Dica: combine esse foco com exercícios antigos da FATEC.</p>
      `;
    }

    focusControls.appendChild(button);
  });
};

renderFocusControls();

schedule.forEach((item, index) => {
  const card = document.createElement("article");
  card.className = "month-card";
  const monthGoals = [...item.goals, item.exam];

  const goalsMarkup = monthGoals
    .map((goal, goalIndex) => {
      const goalId = `${item.month.toLowerCase()}-${goalIndex}`.replace(/\s+/g, "-");
      const saved = progressState[goalId] === true;
      return `
        <li>
          <label class="goal-item">
            <input type="checkbox" data-progress-id="${goalId}" ${saved ? "checked" : ""} />
            <span>${goal}</span>
          </label>
        </li>
      `;
    })
    .join("");

  card.innerHTML = `
    <div class="month-card__header">
      <h3>${item.month}</h3>
      <span class="badge">${index + 1}º mês</span>
    </div>
    <p><strong>Foco:</strong> ${item.focus}</p>
    <ul>
      ${goalsMarkup}
    </ul>
    <div class="month-card__exam">Simulado do mês: ${item.exam}</div>
  `;
  scheduleContainer.appendChild(card);
});

document.querySelectorAll("[data-progress-id]").forEach((input) => {
  input.addEventListener("change", (event) => {
    saveProgress(event.target.dataset.progressId, event.target.checked);
    updateProgress();
  });
});

resetButton.addEventListener("click", () => {
  document.querySelectorAll("[data-progress-id]").forEach((input) => {
    input.checked = false;
  });
  localStorage.removeItem(STORAGE_KEY);
  updateProgress();
});

updateProgress();
