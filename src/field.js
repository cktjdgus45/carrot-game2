'use strict'

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min; //최댓값은 제외, 최솟값은 포함
}

export default class Field {
    constructor(carrotCount, bugCount) {
        this.carrotCount = carrotCount;
        this.bugCount = bugCount;
        this.field = document.querySelector(".game-field");
        this.coords = this.field.getBoundingClientRect();
        this.onFieldClicked = this.onFieldClicked.bind(this);
        this.field.addEventListener("click", this.onFieldClicked);
    }

    setClickListner(onItemClicked) {
        this.onItemClicked = onItemClicked;
    }

    onFieldClicked(event) {
        const target = event.target;
        if (target.matches('.carrot')) {
            target.remove();
            this.onItemClicked && this.onItemClicked('carrot');
        } else if (target.matches('.bug')) {
            target.remove();
            this.onItemClicked && this.onItemClicked('bug');
        }
    }

    createItems(itemName, count) {
        const itemArr = [];
        for (let i = 0; i < count; i++) {
            const maxX = this.coords.right - this.coords.left;
            const minX = 75;
            const maxY = this.coords.bottom - this.coords.top;
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

    placeItems() {
        const carrots = this.createItems("carrot", this.carrotCount);
        const bugs = this.createItems("bug", this.bugCount);
        carrots.forEach((carrot) => {
            this.field.appendChild(carrot);
        })
        bugs.forEach((bug) => {
            this.field.appendChild(bug);
        })
    }

    clearField() {
        this.field.childNodes.forEach((item) => {
            if (item.nodeName == "IMG") {
                item.setAttribute("class", "unshowing");
            }
        })
    }
}