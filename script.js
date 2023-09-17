const question = document.querySelector('#question');
const choices = Array.from(document.querySelectorAll('.choice-text'));
const progressText = document.querySelector('#progressText');
const scoreText = document.querySelector('#score');
const progressBarFull = document.querySelector('#progressBarFull');

let currentQuestion = {};
let acceptingAnswers = true;
let score = 0;
let questionCounter = 0;
let availableQuestions = [];

let questions = [
  {
    question: "How many swords are there in The Legend of Zelda (1986)?",
    choice1: '1',
    choice2: '2',
    choice3: '3',
    choice4: '4',
    answer: 3,
  },
  {
    question: "How many dungeons are there in Ocarina of Time (1998)?",
    choice1: '7',
    choice2: '11',
    choice3: '12',
    choice4: '14',
    answer: 3,
  },
  {
    question: "What was Majora's Mask used for in Majora's Mask (2000)?",
    choice1: "Hexing Rituals",
    choice2: "To Call Upon the Gods",
    choice3: "Fashion",
    choice4: "Witchcraft",
    answer: 1,
  },
  {
    question: "How many divine beasts are there in Breath of the Wild (2017)?",
    choice1: "3",
    choice2: "4",
    choice3: "5",
    choice4: "7",
    answer: 2,
  },
  {
    question: "When does Princess Zelda appear in Tears of the Kingdom (2023)?",
    choice1: "End of Game",
    choice2: "Middle of Game",
    choice3: "Start of Game",
    choice4: "Princess Who?",
    answer: 3,
  },
];

const SCORE_POINTS = 100;
const MAX_QUESTIONS = 5;
const WINNING_SCORE = 500; // Define the winning score

startGame = () => {
  questionCounter = 0;
  score = 0;
  availableQuestions = [...questions];
  getNewQuestion();
};

getNewQuestion = () => {
  if (availableQuestions.length === 0 || questionCounter >= MAX_QUESTIONS) {
    // Check for winning and losing conditions here
    if (score >= WINNING_SCORE) {
      return window.location.assign('/results/win.html'); // Redirect to win page
    } else {
      return window.location.assign('/results/lose.html'); // Redirect to lose page
    }
  }

  questionCounter++;

  currentQuestion = availableQuestions.shift(); // Get the next question in the array

  question.innerText = currentQuestion.question;

  choices.forEach((choice, index) => {
    choice.innerText = currentQuestion['choice' + (index + 1)];
  });

  acceptingAnswers = true;
};

choices.forEach(choice => {
  choice.addEventListener('click', e => {
    if (!acceptingAnswers) return;

    acceptingAnswers = false;
    const selectedChoice = e.target;
    const selectedAnswer = selectedChoice.dataset['number'];

    let classToApply = selectedAnswer == currentQuestion.answer ? 'correct' : 'incorrect';
    if (classToApply === 'correct') {
      incrementScore(SCORE_POINTS);
      progressBarFull.style.width = `${(score / WINNING_SCORE) * 100}%`; // Update the progress bar
    }

    selectedChoice.parentElement.classList.add(classToApply);

    setTimeout(() => {
      selectedChoice.parentElement.classList.remove(classToApply);
      getNewQuestion();
    }, 1000);
  });
});


incrementScore = num => {
  score += num;
  scoreText.innerText = score;
};

let mySound = new Audio('intro.mp3')
mySound.play()

startGame();
