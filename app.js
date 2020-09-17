/**
 * Example store structure
 */

import questions from "./questions.js";
const ANSWER_OPTION = 'answer';
const store = {
  // 5 or more questions are required
  questions,
  quizStarted: false,
  questionNumber: 0,
  score: 0,
  selectedAnswer: null,
  lastSelected: null
};

function createStartScreen() {
  return '<div class="ui centered"> <button id="start-button" class="ui button">start button</button> <button id="try-again-button" class="ui button right aligned">results button</button> </div>';
}

function createQuestionScreen() {
  const questionContainer = store.questions[store.questionNumber - 1];
  return `
  <div class="ui grid container">
  <h2 class="ui centered fourteen row" id="question">${questionContainer.text}</h2>
  <form action="" class="ui twelve wide column segment form centered">
    <div class="ui" id="answer-list">
    ${questionContainer.answers
      .map((answer, index) => {
        return `
      <div class="ui selection" id="${ANSWER_OPTION + index}">
          <input class="ui input" type="radio" id="input${index}" name="answer" >
          <label for="answer" class="answer-text">${answer}</label>
      </div>
      
      `;
      })
      .join("")}
  </div>
  <button class="ui button disabled right floated" id="next">Next</button>
  </form>
</div>
`;
}


function createHeader() {
  // TODO: change the name of quiz
  return `
<h2 class="ui item large header">SpongeBob Quiz</h2>
<h2 class="ui item" id="question-number"> Question: ${store.questionNumber}/${store.questions.length}</h2>
<h2 class="ui item">${store.score} / ${store.questions.length}</h2>
`;
}

function createResultsScreen() {
  console.log("result screen");
}

function handleStartClick() {
  const main = $("main");
  $("main").on("click", "#start-button", (e) => {
    store.questionNumber = 1;
    store.quizStarted = true;
    render();
  });
}

//TODO: FINISH HANDLE NEXT BUTTON
function handleNextClick() {
  $("main").on("click", "#next", (e) => {
    e.preventDefault();
    

    if (store.selectedAnswer != store.questions[store.questionNumber - 1].correctIndex) { 
      $('#answer-list').find(`#${ANSWER_OPTION+store.selectedAnswer} label`).css('background-color', 'red')
    } else {
      store.score++
    }
    $(`#${ANSWER_OPTION+store.questions[store.questionNumber - 1].correctIndex} label`).css('background-color', 'green');
    store.questionNumber++;
    setTimeout(render, 590);
    
  });
}

function handleAnswerClick() {
  $('main').on('click','.selection', (e) => {
    const lastSelectedEl = $(`div[id="${ANSWER_OPTION + store.lastSelected}"`).find('input');

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

function handleRetryClick() {
  store.questionNumber = 0;
  store.quizStarted = false;
  store.score = 0;
  render();
}

function render() {
  const main = $("main");
  const header = $("header");
  if (store.questionNumber === 0) {
    console.log("in store.score");
    if (!store.quizStarted) return main.html(createStartScreen());
    console.log("after quiz started");
    return main.html(createQuestionScreen());
  }

  if (store.questionNumber > store.questions.length) {
    console.log("questions ended");
    header.empty();
    return main.html(createResultsScreen());
  }
  console.log(`Current question: ${store.questionNumber}`);
  header.html(createHeader());
  main.html(createQuestionScreen());
}

$(() => {
  handleRetryClick();
  handleNextClick();
  handleAnswerClick();
  handleStartClick();
  render();
});

/**
 *
 * Technical requirements:
 *
 * Your app should include a render() function, that regenerates the view each time the store is updated.
 * See your course material and access support for more details.
 *
 * NO additional HTML elements should be added to the index.html file.
 *
 * You may add attributes (classes, ids, etc) to the existing HTML elements, or link stylesheets or additional scripts if necessary
 *
 * SEE BELOW FOR THE CATEGORIES OF THE TYPES OF FUNCTIONS YOU WILL BE CREATING 👇
 *
 *
 */

/********** TEMPLATE GENERATION FUNCTIONS **********/

// These functions return HTML templates

/********** RENDER FUNCTION(S) **********/

// This function conditionally replaces the contents of the <main> tag based on the state of the store

/********** EVENT HANDLER FUNCTIONS **********/

// These functions handle events (submit, click, etc)
