const questions = [
  {
    question: "Who is Apoorva's favourite person in the family?",
    options: [
      { option: "Amu", correct: false },
      { option: "Papa", correct: false },
      { option: "Mummy", correct: false },
      { option: "PAM", correct: true },
    ],
  },
  {
    question: "What does Apoorva need on a daily basis?",
    options: [
      { option: "Coffee", correct: true },
      { option: "Deep Conversations with Amu", correct: false },
      { option: "Sleep", correct: false },
      { option: "Me Time!", correct: false },
    ],
  },
  {
    question:
      "If she could eat one food for the rest of her life, what will it be?",
    options: [
      { option: "Daal Chawal", correct: true },
      { option: "Rajma Chawal", correct: false },
      { option: "Curd Rice & Pickle", correct: false },
      { option: "Brinjal & Rice", correct: false },
    ],
  },
  {
    question: "What is she grateful for?",
    options: [
      { option: "Papa", correct: false },
      { option: "Mummy", correct: false },
      { option: "Amu", correct: false },
      { option: "Mummy & Papa", correct: true },
    ],
  },
];

const questionElement = document.getElementById("question");
let answerButtons = document.querySelector(".answer-buttons");
const nextButton = document.getElementById("next-btn");

let currentQuestionIndex = 0;
let score = 0;

function startQuiz() {
  currentQuestionIndex = 0;
  score = 0;
  nextButton.textContent = "Next";
  showQuestion();
}

function showQuestion() {
  resetState();
  let currentQuestion = questions[currentQuestionIndex];
  let questionNo = currentQuestionIndex + 1;
  questionElement.textContent = questionNo + ") " + currentQuestion.question;
  answerButtons.textContent = "";

  currentQuestion.options.forEach((op) => {
    const btn = document.createElement("button");
    btn.textContent = op.option;
    btn.classList.add("btn");
    answerButtons.appendChild(btn);
    if (op.correct) {
      btn.dataset.correct = op.correct;
    }
    btn.addEventListener("click", selectedAnswer);
  });
}
function selectedAnswer(e) {
  const selectedBtn = e.target;
  const isCorrect = selectedBtn.dataset.correct === "true";
  if (isCorrect) {
    selectedBtn.classList.add("correct");
    score++;
  } else {
    selectedBtn.classList.add("incorrect");
  }
  console.log(isCorrect);
  Array.from(answerButtons.children).forEach((btn) => {
    if (btn.dataset.correct === "true") {
      console.log("Lalaa" + "Here");
      btn.classList.add("correct");
    }
    btn.disabled = true;
  });
  nextButton.style.display = "block";
}

function resetState() {
  nextButton.style.display = "none";
  while (answerButtons.firstChild) {
    answerButtons.removeChild(answerButtons.firstChild);
  }
}

function showScore() {
  resetState();
  questionElement.innerHTML = `You scored ${score} out of ${questions.length}!`;
  nextButton.textContent = "Play Again";
  nextButton.style.display = "block";
}
function handleNextButton() {
  currentQuestionIndex++;
  if (currentQuestionIndex < questions.length) {
    showQuestion();
  } else {
    showScore();
  }
}
startQuiz();
nextButton.addEventListener("click", () => {
  if (currentQuestionIndex < questions.length) {
    handleNextButton();
  } else {
    startQuiz();
  }
});
