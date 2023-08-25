import { Quiz } from "./quiz.js";
import Question from "./question.js";
// >======> HTML ELEMENTS <=======<
const categoryMenu = document.getElementById("categoryMenu");
const difficultyOptions = document.getElementById("difficultyOptions");
const questionsNumber = document.getElementById("questionsNumber");
const startQuiz = document.getElementById("startQuiz");
const quizOptions = document.getElementById("quizOptions");
export const questionsContainer = document.querySelector(
  ".questions-container"
);
// >======> EVENTS ELEMENTS <=======<
export let questions;
export let quiz;
startQuiz.addEventListener("click", async function () {
  const category = categoryMenu.value;
  const difficulty = difficultyOptions.value;
  const numbers = questionsNumber.value;
  quiz = new Quiz(category, difficulty, numbers);
  questions = await quiz.getQuestions();
  console.log(questions);
  const question = new Question(0);
  quizOptions.classList.replace("d-flex", "d-none");
  question.displayQuestion();
});
