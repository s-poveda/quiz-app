/**
 * Example store structure
 */

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

function createStartScreen() {
  return `
  <h2 class="ui huge header center aligned" id="welcome-message">Welcome to the SpongeBob Quiz!</h2>
  <div class="ui grid segment very padded" id="start-button-div"> 
  <button id="start-button" class="ui big pink button eight wide column centered">start button</button>
  </div>
  `}

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

function createResultsScreen() {
  return `
  <div class="ui ui-container grid center aligned">
  <table class="ui brown celled padded table centered aligned">
      <thead>
        <tr>
          <th class="single line">Correct</th>
          <th>Incorrect</th>
          <th>%</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>
            <h2 class="ui center aligned header" id="number-correct">${store.score}</h2>
          </td>
          <td class="single line">
          <h2 class="ui center aligned header" id="number-incorrect">${store.questions.length -  store.score}</h2>
          </td>
          <td>
            <div class="ui star rating" data-rating="3" data-max-rating="3">
              <h2 class="ui center aligned header" id="percent-correct">${store.score/store.questions.length * 100}
              </h2>
            </div>
          </td>
        </tr>
      </tbody>
    </table>
    </div>
    <div class="ui centered aligned">
      <button id="try-again" class="button">try again</button>
    </div>
    `;
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
  $('main').on('click','#try-again', (e) =>{
    console.log(e.target);
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
    console.log("in store.score");
    if (!store.quizStarted) return main.html(createStartScreen());
    console.log("after quiz started");
    return main.html(createQuestionScreen());
  }

  if (store.questionNumber > store.questions.length) {
    console.log("questions ended");
    header.html(createHeader());
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
  handleRetryClick();
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
