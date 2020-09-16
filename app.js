/**
 * Example store structure
 */

import questions from './questions.js';

const store = {
  // 5 or more questions are required
  questions,
  quizStarted: false,
  questionNumber: 0,
  score: 0
};

function createStartScreen() {
  return '<div> <button id="start-button">start button</button> <button id="try-again-button">results button</button> </div>';
}

function createQuestionScreen() {
  return `<div class="ui grid container">
  <h2 class="centered" id="question">${store.questions[store.questionNumber - 1].text}</h2>
  <form action="" class="ui twelve wide column segment form centered">
    <!-- <img src="https://semantic-ui.com/images/avatar2/large/kristy.png" alt="" class="ui card centered"> -->
    <input type="radio" id="answer">answer button</button>
  </form>
</div>`
}

function createHeader() {
// TODO: change the name of quiz
return `
<h1 class="ui header">NAME OF QUIZ</h1>
<h2 class="active item" id="question-number"> Question: ${store.questionNumber} of ${store.questions.length}</h2>
<h2 class="item">${store.score} / ${store.questions.length}</h2>
`
}

function createResultsScreen () {
console.log('result screen');
}



function handleStartClick () {
  const main = $('main');
  $('main').on('click', '#start-button', (e) => {
    store.questionNumber = 1;
    render();
  });
}

function handleAnswerClick () {
  $('main').on('click', '#answer', (e) => {
    // console.log(e);
    store.questionNumber++;
    render();
  })
}

function handleRetryClick() {
  store.questionNumber = 0;
  store.quizStarted = false;
  store.score = 0;
  render();
}

function render() {

  const main = $('main');
  const header = $('header');
  console.log(store.quizStarted == true);
  if (store.questionNumber === 0) {
    console.log('in store.score');
    if (!store.quizStarted) return main.html(createStartScreen());
      console.log('after quiz started');
     return main.html(createQuestionScreen());
  }

  if (store.questionNumber == store.questions.length) {
    console.log('questions ended');
    header.empty();
    return main.html(createResultsScreen());    
  }
  console.log(`Current question: ${store.questionNumber}`);
  header.html(createHeader());
  main.html(createQuestionScreen());
}

$( () => {
  handleRetryClick();
  handleAnswerClick();
  handleStartClick();
  render(); 
  }
);

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