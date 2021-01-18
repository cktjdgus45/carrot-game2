const carrotSound = new Audio('./assets/sound/carrot_pull.mp3');
const bugSound = new Audio('./assets/sound/bug_pull.mp3');
const bgSound = new Audio('./assets/sound/bg.mp3');
const winSound = new Audio('./assets/sound/game_win.mp3');
const alertSound = new Audio('./assets/sound/alert.wav');

export function playCarrot() {
    playSound(carrotSound);
}
export function playBug() {
    playSound(bugSound);
}
export function playBg() {
    playSound(bgSound);
}
export function playWin() {
    playSound(winSound);
}
export function playAlert() {
    playSound(alertSound);
}


export function stopBg() {
    stopSound(bgSound);
}


function playSound(sound) {
    sound.currentTime = 0;
    sound.play();
}

function stopSound(sound) {
    sound.pause();
}
