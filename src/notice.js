'use strict'

import { playWin, playAlert } from "./sound.js";

export default class Notice {
    constructor() {
        this.notice = document.querySelector(".game-end");
        this.noticeReplay = document.querySelector(".game-reset");
        this.noticeLetter = document.querySelector(".game-end-letter");
        this.noticeReplay.addEventListener('click', () => {
            this.onClick && this.onClick();
            this.hide();
        })
    }

    setClickListener(onClick) {
        this.onClick = onClick;
    }

    hide() {
        this.notice.classList.add("unshowing");
    }
    show() {
        this.notice.classList.remove("unshowing");
    }
    noticeWhenStop() {
        playAlert();
        this.noticeLetter.innerHTML = 'Replay❓';
    }
    noticeWhenLose() {
        playAlert();
        this.noticeLetter.innerHTML = 'You Lose !! 💣';
    }
    noticeWhenWin() {
        playWin();
        this.noticeLetter.innerHTML = 'You Win !! 🎈';
    }
}