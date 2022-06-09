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
      // question
      // user click on choice

      // if user click on the correct answer
      if(choice.isAnswer){
        // give feedback correct
       


      }else{
        // if user click on the wrong answer
        // deduct 10 sec away from timer
        timeRemaining = timeRemaining - 10;
        
        // show feedback -- wrong
        alert("Incorrect Answer!");
      }
      // if user click on the choice of the final question
      const nextQuestionIndex = questionIndex + 1;

      if(nextQuestionIndex >= questions.length){
        // end game
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
  // (show the end game screen)
  sectionEndGame.classList.remove('hide');
  // hide question section
  sectionQuestion.classList.add('hide');

  // hide timer
  sectionTimer.classList.add('hide');

  // stop the timer
  clearInterval(timerId);
  //console.log('timer stopped');
  document.querySelector('#result-span').textContent = timeRemaining;
  
}

function startTimer(){
  // timer
  // show the timer
  sectionTimer.classList.remove('hide');
  // once the timer starts
  timerId = setInterval(function(){
    // we will subtract 1 from the current timer count
    timeRemaining = timeRemaining - 1;
    // and update the dom for every passing sec
    timerEl.textContent = timeRemaining;

    // if timer expires while the game is not completed yet
    if (timeRemaining <= 0){

      // end game 
      endGame();
   
    }
  }, 1000);

}

// render the highscore in the dom

// user type in initials in the input box


// user hit enter key 
// get the user initials & highscore

// save

// if user didnt type in anything in the input box

// do not save, show an error message in the dom

// user click on the save button
// get the user initials & highscore
// save


// once we save
// go to the highscore page




// highscore page
// generate the highscore list

// if user clicked on the back to home button
// go back to the landing page

const initialInput = document.getElementById("input-initials");
const saveButton = document.getElementById("save");
const msgDiv = document.getElementById("msg");
const userInitialSpan = document.getElementById("user-initial");
renderinitial();

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

