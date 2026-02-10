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

const topicsContainer = document.getElementById("topics");
const scheduleContainer = document.getElementById("schedule");

topics.forEach((topic) => {
  const card = document.createElement("div");
  card.className = "topic-card";
  card.innerHTML = `
    <strong>${topic.title}</strong>
    <span>${topic.detail}</span>
  `;
  topicsContainer.appendChild(card);
});

schedule.forEach((item, index) => {
  const card = document.createElement("article");
  card.className = "month-card";
  card.innerHTML = `
    <div class="month-card__header">
      <h3>${item.month}</h3>
      <span class="badge">${index + 1}º mês</span>
    </div>
    <p><strong>Foco:</strong> ${item.focus}</p>
    <ul>
      ${item.goals.map((goal) => `<li>${goal}</li>`).join("")}
    </ul>
    <div class="month-card__exam">${item.exam}</div>
  `;
  scheduleContainer.appendChild(card);
});
