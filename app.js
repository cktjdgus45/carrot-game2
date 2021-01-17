const playBtn = document.querySelector(".game-play");
const timeSpan = document.querySelector(".game-time");
const gameEndNotice = document.querySelector(".game-end");
const replayBtn = document.querySelector(".game-reset");
const noticeLetter = document.querySelector(".game-end-letter");
const gameField = document.querySelector(".game-field");
const gameScore = document.querySelector(".game-score");

let CARROT_COUNT = 10;
let BUG_COUNT = 7;
let GAME_TIME = 10;
let timer = null;
let playing = false;
const BG_SOUND = new Audio('./assets/sound/bg.mp3');

// 3. 벌레를 클릭하거나//당근을 시간내에 모두먹거나 게임엔드창이뜬다.


//game Function 
function gameStart() {
    BG_SOUND.play();
    placeItems();
    if (!playing) {
        playing = true;
        timer = setInterval(gameLoop, 1000);
        playBtn.innerHTML = `<i class="fas fa-stop"></i>`;
        showScore();
        showplay();
        unShowReplay();
    } else {
        playBtn.innerHTML = `<i class="fas fa-play"></i>`;
        noticeWhenStop();
        gameEnd();
    }

}
function gameLoop() {
    timeSpan.innerHTML = `0:${GAME_TIME}`;
    --GAME_TIME;
    if (GAME_TIME < 0) {
        gameEnd();
    }
}

function gameEnd() {
    clearInterval(timer);
    unShowplay();
    showReplay();
    gameReset();
    BG_SOUND.pause();
    BG_SOUND.currentTime = 0;
}

function gameReset() {
    CARROT_COUNT = 10;
    BUG_COUNT = 7;
    GAME_TIME = 10;
    playing = false;
    playBtn.innerHTML = `<i class="fas fa-play"></i>`;
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
function showReplay() {
    gameEndNotice.classList.remove("unshowing");
}

function unShowReplay() {
    gameEndNotice.classList.add("unshowing");
}

function showplay() {
    playBtn.classList.remove("unshowing");
}

function unShowplay() {
    playBtn.classList.add("unshowing");
}

//notice Letter
function noticeWhenStop() {
    noticeLetter.innerHTML = 'Replay❓';
}

function noticeWhenLose() {
    noticeLetter.innerHTML = 'You Lose !! 💣';
}

function noticeWhenWin() {
    let audio = new Audio('./assets/sound/game_win.mp3');
    audio.play();
    noticeLetter.innerHTML = 'You Win !! 🎈';
}

function onFieldClicked(event) {
    if (event.target.className == "bug") {
        let audio = new Audio('./assets/sound/bug_pull.mp3');
        audio.play();
        noticeWhenLose();
        gameEnd();
    } else if (event.target.className == "carrot") {
        let audio = new Audio('./assets/sound/carrot_pull.mp3');
        audio.play();
        gameField.removeChild(event.target);
        CARROT_COUNT--;
        showScore();
    }
    if (CARROT_COUNT == 0) {
        noticeWhenWin();
        gameEnd();
    }
}

function showScore() {
    gameScore.innerHTML = `${CARROT_COUNT}`;
}

function init() {
    playBtn.addEventListener("click", gameStart);
    replayBtn.addEventListener("click", gameStart);
    gameField.addEventListener("click", onFieldClicked);
}

init();