//select each section by id and assigning value to a variable
//start game
const startGameButton = document.getElementById('start-game');

//timer
const sectionTimer = document.getElementById('section-timer');
const timerEl = document.getElementById('timer');

//questions
const sectionQuestion = document.getElementById('section-question');

//welcome
const sectionWelcome = document.getElementById('section-welcome');

//endgame
const sectionEndGame = document.getElementById('section-end-game');

//question title and choices
const questionTitleEl = document.getElementById('question-title');
const questionChoices = document.getElementById('question-choices');



let timeRemaining = 60;
var timerId;

function renderQuestion(questionIndex){

//get the question
const question = questions[questionIndex]

//set question title
questionTitleEl.textContent = question.title;

//set choices for questions
const choices = question.choices;
questionChoices.textContent = "";

for (let index = 0; index < choices.length; index++) {
    const choice = choices[index];
    const li = document.createElement('li');
    const button = document.createElement('button');
    button.setAttribute('class', 'question-choice');
    button.textContent = choice.title;
    button.addEventListener('click', function(event){
   
      if(choice.isAnswer){
      }else{
        timeRemaining = timeRemaining - 10;
        alert("Incorrect Answer!");
      }
      const nextQuestionIndex = questionIndex + 1;
      if(nextQuestionIndex >= questions.length){
        return endGame()
      }
     // move on to the next question
      renderQuestion(nextQuestionIndex);
    
    });
    li.appendChild(button);
    questionChoices.append(li);
  }

}

// when i click on the start button
startGameButton.addEventListener('click', function(event){
  // start the timer
  timerEl.textContent = timeRemaining;
  startTimer();
  // show the question
  sectionQuestion.classList.remove('hide');
  // hide the landing
  sectionWelcome.classList.add('hide');
  renderQuestion(0);
})

function endGame(){
  sectionEndGame.classList.remove('hide');
  sectionQuestion.classList.add('hide');
  sectionTimer.classList.add('hide');
  clearInterval(timerId);
  document.querySelector('#result-span').textContent = timeRemaining;
  
}

function startTimer(){
  sectionTimer.classList.remove('hide');
  timerId = setInterval(function(){
    timeRemaining = timeRemaining - 1;
    timerEl.textContent = timeRemaining;
    if (timeRemaining <= 0){
     // end game 
      endGame();
    }
  }, 1000);

}


//input-initials
const initialInput = document.getElementById("input-initials");
const saveButton = document.getElementById("save");
const msgDiv = document.getElementById("msg");
const userInitialSpan = document.getElementById("user-initial");
function displayMessage(type, message) {
    msgDiv.textContent = message;
    msgDiv.setAttribute("class", type);
  }
  
 function renderinitial() {
  const initial = JSON.parse(localStorage.getItem("initial"))
  console.log(initial);
  if (! initial) {
        return;
    }
   document.querySelector('.highScoresList').innerHTML = `<li class="highscore-items">${initial.initial} - ${initial.score}</li>`
}
 
//save initials
  saveButton.addEventListener("click", function (event) {
    event.preventDefault();
    const initial = document.querySelector("#input-initials").value;
    if (initial === "") {
        displayMessage("error", "Initial cannot be blank");
    } else {
        displayMessage("success", "All Done");
        document.querySelector('#section-highscore').classList.remove('hide')
        let scores = {
          score : timeRemaining,
          initial : initial
        }
        localStorage.setItem("initial", JSON.stringify(scores));
        renderinitial();
    }
});
