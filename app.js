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
console.log(store.questions);
function createStartScreen() {

}


function createResultsScreen () {

}

function handleStartClick () {

}

function handleAnswerClick () {

}

function render() {
console.log('hwasdgf')
}

$(
  render()

);

console.log();
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