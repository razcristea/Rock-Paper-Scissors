'use strict'; /* solved to work properly with strict enabled */
const chooseFrom = ['rock','paper','scissors']; // list to choose from 

const chosenItem = ()=> chooseFrom[Math.floor(Math.random() * chooseFrom.length)]; // random selection of a number [0,1,2]

const aiChoice = ()=> {
    let selectionTextAndImage = chosenItem();
    document.getElementById('aiweapon').style.content=('url(' + selectionTextAndImage + '.png');  // selection swapping for AI
    return selectionTextAndImage;
}
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
    let result = document.getElementById('result')
    if(aiOption === playerOption) {
        console.log('It\'s a tie! Both players chose ' + playerOption)
        result.innerText = `It's a tie! Both players chose ${playerOption}.`
        result.style.color = 'goldenrod';
    } else if (playerOption === 'rock' && aiOption === 'scissors') {
        console.log('You win! Rock breaks scissors.')
        result.innerText = 'You win! Rock breaks scissors.'
        result.style.color = 'green';
        playerScore++
    } else if (playerOption === 'scissors' && aiOption === 'paper') {
        console.log('You win! Scissors cut paper.')
        result.innerText = 'You win! Scissors cuts paper.'
        result.style.color = 'green';
        playerScore++
    } else if (playerOption === 'paper' && aiOption === 'rock') {
        console.log('You win! Paper covers rock.')
        result.innerText = 'You win! Paper covers rock.'
        result.style.color = 'green';
        playerScore++
    } else {
        console.log('You lose!');
        result.style.color = 'red';
        aiScore++;
        if (aiOption === 'rock') {
            result.innerText = `You lose! ${aiOption[0].toUpperCase()+aiOption.slice(1)} breaks ${playerOption}.`;
        } else if (aiOption === 'paper') {
            result.innerText = `You lose! ${aiOption[0].toUpperCase()+aiOption.slice(1)} covers ${playerOption}.`;
        } else if (aiOption === 'scissors') {
            result.innerText = `You lose! ${aiOption[0].toUpperCase()+aiOption.slice(1)} cuts ${playerOption}.`;
        }
    }
}

const options = document.getElementsByName('option'); // get all radio buttons

const resetOptions = ()=> {
    for(let i=0 ; i < options.length; i++) {
        options[i].checked = false // we uncheck radio button
        document.getElementById('result').innerText = '' // and remove result text from screen
    };
    console.log('this is where the resets are happening');
    document.getElementById('body').style.pointerEvents="all"; // re-enable click
    doThinking(true);
}




/*  -----------   Gameplay   -----------  */

const gameOn = ()=> {
    setScore(aiScore,playerScore); // set initial score 0-0 in HTML
    doThinking(true); //start AI thinking
    let computerCounter = 0; // for debugging purposes 
    let playerCounter = 0;  // for debugging purposes 
    for(let i=0 ; i < options.length; i++) {
        // console.log(options[i])
        options[i].onclick = async function() { // add event listener on click and calls an anonymous async function
            console.log('here the AI halts'); // for debugging purposes
            doThinking(false); // when player makes a selection, AI stops thinking
            let aiChoiceNow = aiChoice(); // but makes a new selection, just to be shure.
            document.getElementById('body').style.pointerEvents="none"; // disables click
            computerCounter++; // debugging code
            playerCounter++; // debugging code
            console.log(`[${computerCounter}] Computer choice is ${aiChoiceNow}`); // debugging code
            console.log(`[${playerCounter}] Your choice is ${this.value}`); // debugging code
            checkWinner(aiChoiceNow, this.value); // call checkWinner func to eval winner and prints message to HTML
            setScore(aiScore,playerScore); // and we update score in HTML
    
            await new Promise((resolve, reject) => {
                setTimeout(resetOptions, 3000) // call reset function with a delay of 3s
              });
        }
    }
}



gameOn();




















