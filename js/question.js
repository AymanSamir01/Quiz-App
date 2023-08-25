import { questions, quiz, questionsContainer } from "./index.js";
export default class Question {
  constructor(index) {
    this.questions = questions[index].question;
    this.answer = questions[index].correct_answer;
    this.wrongAnswer = questions[index].incorrect_answers;
    this.category = questions[index].category;
    this.index = index;
    this.allAnswer = this.mergeChoicesAnswer();
    this.answered = false;
  }

  mergeChoicesAnswer() {
    return this.wrongAnswer.concat(this.answer).sort();
  }

  displayQuestion() {
    const containerHtml = `
    <div
    class="question shadow-lg col-lg-6 offset-lg-3  p-4 rounded-3 d-flex flex-column justify-content-center align-items-center gap-3 animate__animated animate__bounceIn">
    <div class="w-100 d-flex justify-content-between">
      <span class="btn btn-category">${this.category}</span>
      <span class="fs-6 btn btn-questions">${this.index + 1} of ${
      questions.length
    } Questions</span>
    </div>
    <h2 class="text-capitalize h4 text-center">${this.questions}</h2>  
    <ul class="choices w-100 list-unstyled m-0 d-flex flex-wrap text-center">
    ${this.allAnswer.map((choice) => `<li>${choice}</li>`).join("")}
    </ul>
    <h2 class="text-capitalize text-center score-color h3 fw-bold"><i class="bi bi-emoji-laughing"></i> Score: ${
      quiz.score
    } </h2>        
  </div>
    `;
    questionsContainer.innerHTML = containerHtml;
    const allChoices = document.querySelectorAll(".question ul li");
    for (let i = 0; i < allChoices.length; i++) {
      allChoices[i].addEventListener("click", (e) => {
        this.checkAnswer(e);
      });
    }
  }

  checkAnswer(e) {
    if (!this.answered) {
      this.answered = true;
      if (e.target.innerHTML.toLowerCase() == this.answer.toLowerCase()) {
        e.target.classList.add(
          "correct",
          "animate__animated",
          "animate__flipInY"
        );
        quiz.score += 1;
      } else {
        e.target.classList.add("wrong", "animate__animated", "animate__shakeX");
      }
      this.animateQuestion(e.target, 500);
    }
  }

  animateQuestion(element, duration) {
    setTimeout(() => {
      element
        .closest(".question")
        .classList.replace("animate__bounceIn", "animate__backOutLeft");
      setTimeout(() => {
        this.nextQuestion();
      }, duration);
    }, duration);
  }

  nextQuestion() {
    this.index += 1;
    if (this.index > questions.length - 1) {
      questionsContainer.innerHTML = quiz.endQuiz();
      const tryAgin = document.querySelector(".again");
      tryAgin.addEventListener("click", function () {
        location.reload();
      });
      return;
    }
    const newQuestion = new Question(this.index);
    newQuestion.displayQuestion();
  }
}
