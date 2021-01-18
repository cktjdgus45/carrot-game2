'use strict'

import Notice from './notice.js';
import * as sound from './sound.js';

const playBtn = document.querySelector(".game-play");
const timeSpan = document.querySelector(".game-time");
const gameField = document.querySelector(".game-field");
const gameScore = document.querySelector(".game-score");

let CARROT_COUNT = 10;
let BUG_COUNT = 7;
let GAME_TIME = 10;
let timer = null;
let playing = false;

const gameFinishNotice = new Notice();

//game Function 
function gameStart() {
    sound.playBg();
    placeItems();
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
    clearField();
}

// create delete game Items


function createItems(itemName, count) {
    const coords = gameField.getBoundingClientRect();
    const itemArr = [];
    for (let i = 0; i < count; i++) {
        const maxX = coords.right - coords.left;
        const minX = 75;
        const maxY = coords.bottom - coords.top;
        const minY = 75;
        const randomX = getRandomInt(minX, maxX);
        const randomY = getRandomInt(minY, maxY);
        const item = document.createElement("img");
        item.setAttribute("class", `${itemName}`);
        item.src = `./assets/img/${itemName}.png`;
        item.style.left = `${randomX - 70}px`;
        item.style.top = `${randomY - 70}px`;
        itemArr.push(item);
    }
    return itemArr;
}

function placeItems() {
    const carrots = createItems("carrot", CARROT_COUNT);
    const bugs = createItems("bug", BUG_COUNT);
    carrots.forEach((carrot) => {
        gameField.appendChild(carrot);
    })
    bugs.forEach((bug) => {
        gameField.appendChild(bug);
    })
}

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min; //최댓값은 제외, 최솟값은 포함
}

function clearField() {
    gameField.childNodes.forEach((item) => {
        if (item.nodeName == "IMG") {
            item.setAttribute("class", "unshowing");
        }
    })
}

// show? unshow?

function showplay() {
    playBtn.classList.remove("unshowing");
}

function unShowplay() {
    playBtn.classList.add("unshowing");
}

function onFieldClicked(event) {
    if (event.target.className == "bug") {
        sound.playBug();
        gameFinishNotice.noticeWhenLose();
        gameEnd();
    } else if (event.target.className == "carrot") {
        sound.playCarrot();
        gameField.removeChild(event.target);
        CARROT_COUNT--;
        showScore();
    }
    if (CARROT_COUNT == 0) {
        gameFinishNotice.noticeWhenWin();
        gameEnd();
    }
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
    gameField.addEventListener("click", onFieldClicked);
}

init();