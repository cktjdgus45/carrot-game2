'use strict'

import Notice from './notice.js';
import Field from './field.js';
import * as sound from './sound.js';

const playBtn = document.querySelector(".game-play");
const timeSpan = document.querySelector(".game-time");
const gameScore = document.querySelector(".game-score");

let CARROT_COUNT = 10;
let BUG_COUNT = 7;
let GAME_TIME = 10;
let timer = null;
let playing = false;

const gameFinishNotice = new Notice();
const gameField = new Field(CARROT_COUNT, BUG_COUNT);
gameField.onItemClicked = onitemClicked;

function onitemClicked(item) {
    if (item === "bug") {
        sound.playBug();
        gameFinishNotice.noticeWhenLose();
        gameEnd();
    } else if (item === "carrot") {
        sound.playCarrot();
        CARROT_COUNT--;
        showScore();
    }
    if (CARROT_COUNT == 0) {
        gameFinishNotice.noticeWhenWin();
        gameEnd();
    }
}

//game Function 
function gameStart() {
    sound.playBg();
    gameField.placeItems();
    if (!playing) {
        playing = true;
        timer = setInterval(gameLoop, 1000);
        playBtn.innerHTML = `<i class="fas fa-stop"></i>`;
        showScore();
        showplay();
        gameFinishNotice.hide();
    } else {
        playBtn.innerHTML = `<i class="fas fa-play"></i>`;
        gameFinishNotice.noticeWhenStop();
        gameEnd();
    }

}
function gameLoop() {
    timeSpan.innerHTML = `0:${GAME_TIME}`;
    --GAME_TIME;
    if (GAME_TIME < 0) {
        gameFinishNotice.noticeWhenLose();
        gameEnd();
    }
}

function gameEnd() {
    clearInterval(timer);
    unShowplay();
    gameFinishNotice.show();
    gameReset();
    sound.stopBg();
}

function gameReset() {
    CARROT_COUNT = 10;
    BUG_COUNT = 7;
    GAME_TIME = 10;
    playing = false;
    gameField.clearField();
}

function showplay() {
    playBtn.classList.remove("unshowing");
}

function unShowplay() {
    playBtn.classList.add("unshowing");
}

function showScore() {
    gameScore.innerHTML = `${CARROT_COUNT}`;
}

function init() {
    gameFinishNotice.hide();
    playBtn.addEventListener("click", gameStart);
    gameFinishNotice.setClickListener(() => {
        gameStart();
    })
}

init();