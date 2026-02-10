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

const tempoOptions = {
  Tranquilo: "Hoje foque em revisão leve + 1 bloco de exercícios.",
  Equilibrado: "Meta do dia: 2 blocos de teoria + 1 simulado curto.",
  Intenso: "Dia forte: 3 blocos completos e correção detalhada.",
};

const notesPrompts = [
  "Dúvidas principais",
  "Resumo rápido",
  "Links ou referências",
];

const topicsContainer = document.getElementById("topics");
const scheduleContainer = document.getElementById("schedule");
const focusControls = document.getElementById("focus-controls");
const focusContent = document.getElementById("focus-content");
const progressFill = document.getElementById("progress-fill");
const progressText = document.getElementById("progress-text");
const resetButton = document.getElementById("reset-progress");
const progressDetails = document.getElementById("progress-details");
const notesGrid = document.getElementById("notes-grid");
const tempoControls = document.getElementById("tempo-controls");
const tempoTip = document.getElementById("tempo-tip");
const extraTaskForm = document.getElementById("extra-task-form");
const extraTaskInput = document.getElementById("extra-task-input");
const extraTaskList = document.getElementById("extra-task-list");

const STORAGE_KEY = "fatec-study-progress";
const NOTES_KEY = "fatec-study-notes";
const EXTRA_TASKS_KEY = "fatec-extra-tasks";

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
const notesState = JSON.parse(localStorage.getItem(NOTES_KEY) || "{}");
const extraTasksState = JSON.parse(localStorage.getItem(EXTRA_TASKS_KEY) || "[]");

const bindProgressInputs = () => {
  document.querySelectorAll("[data-progress-id]").forEach((input) => {
    if (input.dataset.bound) {
      return;
    }
    input.dataset.bound = "true";
    input.addEventListener("change", (event) => {
      saveProgress(event.target.dataset.progressId, event.target.checked);
      updateProgress();
    });
  });
};

const updateProgress = () => {
  const totalGoals = document.querySelectorAll("[data-progress-id]").length;
  const completedGoals = document.querySelectorAll("[data-progress-id]:checked").length;
  const percentage = totalGoals === 0 ? 0 : Math.round((completedGoals / totalGoals) * 100);

  progressFill.style.width = `${percentage}%`;
  progressText.textContent = `${percentage}% concluído (${completedGoals}/${totalGoals})`;
  progressDetails.textContent = percentage >= 80
    ? "Excelente! Você está quase pronto para a prova."
    : "Continue avançando um pouco a cada dia.";
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

const renderTempoControls = () => {
  Object.entries(tempoOptions).forEach(([label, tip], index) => {
    const button = document.createElement("button");
    button.type = "button";
    button.className = "tempo-button";
    button.textContent = label;
    button.addEventListener("click", () => {
      document.querySelectorAll(".tempo-button").forEach((btn) => btn.classList.remove("is-active"));
      button.classList.add("is-active");
      tempoTip.textContent = tip;
    });

    if (index === 1) {
      button.classList.add("is-active");
      tempoTip.textContent = tip;
    }

    tempoControls.appendChild(button);
  });
};

const renderNotes = () => {
  notesGrid.innerHTML = "";
  topics.forEach((topic) => {
    const card = document.createElement("article");
    card.className = "notes-card";
    card.innerHTML = `
      <header>
        <h3>${topic.title}</h3>
        <span>${topic.detail}</span>
      </header>
      ${notesPrompts
        .map((prompt, index) => {
          const fieldId = `${topic.title.toLowerCase()}-${index}`.replace(/\s+/g, "-");
          const saved = notesState[fieldId] || "";
          return `
            <label>
              <span>${prompt}</span>
              <textarea data-notes-id="${fieldId}" rows="3" placeholder="Escreva aqui...">${saved}</textarea>
            </label>
          `;
        })
        .join("")}
    `;
    notesGrid.appendChild(card);
  });
};

const renderExtraTasks = () => {
  extraTaskList.innerHTML = "";
  extraTasksState.forEach((task, index) => {
    const listItem = document.createElement("li");
    const isChecked = progressState[`extra-${index}`] === true;
    listItem.innerHTML = `
      <label class="goal-item">
        <input type="checkbox" data-progress-id="extra-${index}" ${isChecked ? "checked" : ""} />
        <span>${task}</span>
      </label>
      <button type="button" class="ghost-button ghost-button--small" data-remove-index="${index}">
        Remover
      </button>
    `;
    extraTaskList.appendChild(listItem);
  });
};

renderFocusControls();
renderTempoControls();
renderNotes();
renderExtraTasks();

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

bindProgressInputs();

extraTaskForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const value = extraTaskInput.value.trim();
  if (!value) {
    return;
  }
  extraTasksState.push(value);
  localStorage.setItem(EXTRA_TASKS_KEY, JSON.stringify(extraTasksState));
  extraTaskInput.value = "";
  renderExtraTasks();
  bindProgressInputs();
  updateProgress();
});

extraTaskList.addEventListener("click", (event) => {
  const removeIndex = event.target.dataset.removeIndex;
  if (removeIndex === undefined) {
    return;
  }
  extraTasksState.splice(Number(removeIndex), 1);
  localStorage.setItem(EXTRA_TASKS_KEY, JSON.stringify(extraTasksState));
  renderExtraTasks();
  bindProgressInputs();
  updateProgress();
});

document.querySelectorAll("[data-notes-id]").forEach((textarea) => {
  textarea.addEventListener("input", (event) => {
    notesState[event.target.dataset.notesId] = event.target.value;
    localStorage.setItem(NOTES_KEY, JSON.stringify(notesState));
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
