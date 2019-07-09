const START_MAX_NUMBER = 8;
const ROUND_STEP_MAX_NUMBER = 4;
const MAX_ATTEMPT = 3;
const TWO = 2;
const BET = 100;
let round = 1;
let attempt = 1;
let prize = 0;
let isPlay = true;

let isPlayGame = confirm('Do you want to play a game?');
if (!isPlayGame) {
    alert('You did not become a billionaire, but can.');
}
while (isPlayGame) {
    while (isPlay) {
        let currentMaxNumber = START_MAX_NUMBER + ROUND_STEP_MAX_NUMBER * (round - 1);
        let secretNumber = Math.floor(Math.random() * currentMaxNumber + 1);
        let userNumber = null;
        let bet = 0;
        while (attempt < MAX_ATTEMPT + 1) {
            if (attempt === 1) {
                bet = BET * ((TWO ^ round - 1) - 1);
            }
            if (attempt === TWO) {
                bet = BET * ((TWO ^ round - 1) - 1) / TWO;
            }
            if (attempt === MAX_ATTEMPT) {
                bet = BET * ((TWO ^ round - 1) - 1) / (TWO * TWO);
            }

            const template = `Choose a roulete pocket number from 0 to ${currentMaxNumber}
Attempts left: ${MAX_ATTEMPT - attempt + 1}
Total prize: ${prize}$
Possible prize on current attempt: ${bet}$
            `;
            userNumber = +prompt(template);
            attempt = secretNumber === userNumber
                ? MAX_ATTEMPT + 1
                : attempt + 1;
        }
        if (secretNumber === userNumber) {
            prize = prize + bet;
            alert(`Congratulation, you won! Your prize is: ${prize} $.`);
            round = round + 1;
        } else {
            prize = 0;
            round = 1;
            alert(`Thank you for your participation.  Your prize is: ${prize} $.?`);
        }
        isPlay = confirm('Do you want to continue?');
        attempt = 1;
    }
    isPlayGame = false;
    if (prize) {
        alert(`Thank you for your participation.  Your prize is: ${prize} $.?`);
        round = 1;
        attempt = 1;
        prize = 0;
        isPlayGame = confirm('Do you want to continue?');
    }
}
