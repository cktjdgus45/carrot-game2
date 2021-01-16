const playBtn = document.querySelector(".game-play");
const timeSpan = document.querySelector(".game-time");
const gameEndNotice = document.querySelector(".game-end");
const replayBtn = document.querySelector(".game-reset");
const noticeLetter = document.querySelector(".game-end-letter");
const gameField = document.querySelector(".game-field");

const CARROT_COUNT = 10;
const BUG_COUNT = 7;
let GAME_TIME = 10;
let timer = null;
let playing = false;

// 2.게임이 시작되면 /++/ 랜덤적으로 벌레 7개, 당근이 10개씩 배치되고
//   당근의 개수가 10개로 세팅된다.
// 3. 벌레를 클릭하거나//당근을 시간내에 모두먹거나 게임엔드창이뜬다.


//game Function 
function gameStart() {
    if (!playing) {
        showplay();
        timer = setInterval(gameLoop, 1000);
        playing = true;
        unShowReplay();
        playBtn.innerHTML = `<i class="fas fa-stop"></i>`;
    } else {
        playBtn.innerHTML = `<i class="fas fa-play"></i>`;
        clearInterval(timer);
        gameReset();
        showReplay();
        unShowplay();
        noticeWhenStop();
    }
}

function gameLoop() {
    timeSpan.innerHTML = `0:${GAME_TIME}`;
    GAME_TIME--;
    if (GAME_TIME < 0) {
        clearInterval(timer);
        gameReset();
        showReplay();
        unShowplay();
        noticeWhenLose();
    }
}

function gameReset() {
    GAME_TIME = 10;
    playing = false;
    playBtn.innerHTML = `<i class="fas fa-play"></i>`;
}

// create game Items


function createItems(itemName, count) {
    const coords = gameField.getBoundingClientRect();
    console.log(gameField);
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
    noticeLetter.innerHTML = 'You Win !! 🎈';
}

function init() {
    playBtn.addEventListener("click", gameStart);
    replayBtn.addEventListener("click", gameStart);
}

placeItems();
init();