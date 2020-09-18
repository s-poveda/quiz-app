import questions from "./questions.js";
const ANSWER_OPTION = 'answer';
const store = {
  questions,
  quizStarted: false,
  questionNumber: 0,
  score: 0,
  selectedAnswer: null,
  lastSelected: null
};

/********** TEMPLATE GENERATION FUNCTIONS **********/

//called when rendering start screen 
function createStartScreen() {
  return `
  <h2 class="ui huge header center aligned" id="welcome-message">Welcome to the SpongeBob Quiz!</h2>
  <div class="ui grid segment very padded" id="start-button-div"> 
  <button id="start-button" class="massive ui pink button eight wide column centered">start button</button>
  </div>
  `}

// called to render questions (based on question number)
function createQuestionScreen() {
  const questionContainer = store.questions[store.questionNumber - 1];
  return `
  <div class="ui grid container">
    <div class="ui segment ten wide column centered">
      <h2 class="ui fourteen row huge header" id="question">${questionContainer.text}</h2>
    </div>
  
    <form action="" class="ui twelve wide column segment form centered">
    <div class="ui" id="answer-list">
    ${questionContainer.answers
      .map((answer, index) => {
        return `
      <div class="ui selection" id="${ANSWER_OPTION + index}">
        <input class="ui input radio" type="radio" id="input${index}" name="answer" >
        <label for="answer" class="ui label header answer-text">${answer}</label>
      </div>
      `;
      })
      .join("")}
  </div>
  <button class="ui right labeled icon huge button disabled right floated" id="next">Next<i class="right arrow icon"></i></button>
  </form>
</div>
`;
}

// called to render in-game header or after game header
function createHeader() {
  if (store.questionNumber - 1 < store.questions.length) return `
<h2 class="ui item large header">SpongeBob Quiz</h2>
<h2 class="ui item" id="question-number"> Question: ${store.questionNumber}/${store.questions.length}</h2>
<h2 class="ui item">${store.score} / ${store.questions.length}</h2>
`

return `
<h2 class="ui item large header">SpongeBob Quiz</h2>
<h2 class="ui item" id="#the-end">The End</h2>
<h2 class="ui item">${store.score} / ${store.questions.length}</h2>
`;
}

// called to render end screen after last question
function createResultsScreen() {
  return `
  <div class="ui container">
	
	<div class="table">
		<div class="table-header">
			<div class="header__item"><h2 class="ui header medium">Correct</h2></div>
			<div class="header__item"><h2 class="ui header medium">Incorrect</h2></div>
			<div class="header__item"><h2 class="ui header medium">%</h2></div>
  </div>
    <div class="table-content">	
			</div>
			<div class="table-row">
				<div class="table-data">${store.score}</div><hr>
				<div class="table-data">${store.questions.length - store.score}</div><hr>
				<div class="table-data">${store.score / store.questions.length * 100}</div>
			</div>
		</div>	
	</div>
</div>
    
<div id="try-again-button-div" class="ui grid segment padded">
<button id="try-again" class="massive ui pink button centered seven wide column huge">
try again
</button>
</div>
    `;
}

/********** EVENT HANDLER FUNCTIONS **********/

// launches first question on start button click
function handleStartClick() {
  const main = $("main");
  $("main").on("click", "#start-button", (e) => {
    store.questionNumber = 1;
    store.quizStarted = true;
    render();
  });
}

//launches render to update question screen
function handleNextClick() {
  $("main").on("click", "#next", (e) => {
    e.preventDefault();
    

    if (store.selectedAnswer != store.questions[store.questionNumber - 1].correctIndex) { 
      $('#answer-list').find(`#${ANSWER_OPTION+store.selectedAnswer} label`).css('background', 'red')
    } else {
      store.score++
    }
    $(`#${ANSWER_OPTION+store.questions[store.questionNumber - 1].correctIndex} label`).css('background', 'rgb(0, 179, 0)');
    store.questionNumber++;
    setTimeout(render, 590);
    
  });
}

//allows for user to click on parent div of input to select input
//and allows user to select options multiple times
function handleAnswerClick() {
  $('main').on('click','.selection', (e) => {
    //removes 'checked' attribute from last selected input
    $(`div[id="${ANSWER_OPTION + store.lastSelected}"`).find('input').removeAttr('checked');
    //sets current selected index
    store.selectedAnswer = $(e.currentTarget).attr('id').substring(ANSWER_OPTION.length);
    //updates last selected index
    store.lastSelected = store.selectedAnswer;
    $(e.currentTarget).find('input').attr('checked', '');

    if ($(e.currentTarget).parent().find('input[checked]')) $('#next').removeClass('disabled');
    
  });
}


/********** RENDER FUNCTION **********/
//calls render on result screen to restart game from start screen
function handleRetryClick() {
  $('main').on('click','#try-again', (e) =>{
    store.questionNumber = 0;
    store.quizStarted = false;
    store.score = 0;
    render();
  });
}


function render() {
  const main = $("main");
  const header = $("header");
  if (store.questionNumber === 0) {
    if (!store.quizStarted) return main.html(createStartScreen());
    return main.html(createQuestionScreen());
  }

  if (store.questionNumber > store.questions.length) {
    header.html(createHeader());
    return main.html(createResultsScreen());
  }
  header.html(createHeader());
  main.html(createQuestionScreen());
}

$(() => {
  handleRetryClick();
  handleNextClick();
  handleAnswerClick();
  handleStartClick();
  handleRetryClick();
  render();
});
