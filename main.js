const chooseFrom = ['rock','paper','scissors']; // list to choose from 

const chosenItem = ()=> chooseFrom[Math.floor(Math.random() * chooseFrom.length)]; // random selection of a number [0,1,2]

const aiChoice = ()=> document.getElementById('aiweapon').innerText = chosenItem(); // selection swapping for AI

let aiThinking; // variable that will hold our interval for AI selection swapping

const doThinking = (param) => {
    if(param === true) {
        aiThinking = setInterval(aiChoice, 30); // start AI thinking
    } else {
        clearInterval(aiThinking); // stop AI thinking
    }
}

let aiScore = 0; // Computer initial score
let playerScore = 0; // Player initial score

const setScore = (aiScore,playerScore) => {
    document.getElementById('ai-score').innerText = aiScore;
    document.getElementById('player-score').innerText = playerScore;
} // sets score and puts it in HTML

const checkWinner = (aiOption, playerOption)=> {
    if(aiOption === playerOption) {
        console.log('It\'s a tie! Both players chose ' + playerOption)
        document.getElementById('result').innerText = `It's a tie! Both players chose ${playerOption}.`
    } else if (playerOption === 'rock' && aiOption === 'scissors') {
        console.log('You win! Rock breaks scissors.')
        document.getElementById('result').innerText = 'You win! Rock breaks scissors.'
        playerScore++
    } else if (playerOption === 'scissors' && aiOption === 'paper') {
        console.log('You win! Scissors cut paper.')
        document.getElementById('result').innerText = 'You win! Scissors cut paper.'
        playerScore++
    } else if (playerOption === 'paper' && aiOption === 'rock') {
        console.log('You win! Paper covers rock.')
        document.getElementById('result').innerText = 'You win! Paper covers rock.'
        playerScore++
    } else {
        console.log('You lose!')
        document.getElementById('result').innerText = 'You lose!'
        aiScore++
    }
}


/*  -----------   Gameplay   -----------  */

setScore(aiScore,playerScore) // set initial score 0-0 in HTML

doThinking(true) //start AI thinking


let computerCounter = 0 // for debugging purposes 
let playerCounter = 0  // for debugging purposes 


const options = document.getElementsByName('option'); // get all radio buttons

for(option in options) {
    options[option].onclick = function() { // add event listener on click
        doThinking(false); // when player makes a selection, AI stops thinking
        let aiChoiceNow = aiChoice(); // but makes a new selection, just to be shure.
        computerCounter++; // debugging code
        playerCounter++; // debugging code
        console.log(`[${computerCounter}] Computer choice is ${aiChoiceNow}`); // debugging code
        console.log(`[${playerCounter}] Your choice is ${this.value}`); // debugging code
        checkWinner(aiChoiceNow, this.value); // call checkWinner func to eval winner and prints message to HRML
        setScore(aiScore,playerScore); // and we update score in HTML
    }
}


const resetOptions = ()=> {
    for(option in options) {
        options[option].checked = false // we uncheck radio button
        document.getElementById('result').innerText = '' // and remove result text from screen
    };
}

setInterval(resetOptions, 3000); //...with a delay of 3 seconds

// now AI should start thinking again...

