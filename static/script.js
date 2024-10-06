const BACKBOXES = {};
const wsu = JSON.parse(localStorage.getItem('wsu'));
const opp = JSON.parse(localStorage.getItem('opp'));
const socket = io();

/**
 * The first item in the sides array will always be Wright State
 * and the other item will be the opponent
 */
let sides = [localStorage.getItem('wsuSide'), localStorage.getItem('oppSide')];

let leftBox = document.querySelector('#left-box');
leftBox.addEventListener('load', function () {
    let doc = this.getSVGDocument();
    BACKBOXES.left = doc;
    setGradient(doc, sides[0] == 'left' ? 'wsu' : 'opp');
});

let rightBox = document.querySelector('#right-box');
rightBox.addEventListener('load', function () {
    let doc = this.getSVGDocument();
    BACKBOXES.right = doc;

    setGradient(doc, sides[0] == 'right' ? 'wsu' : 'opp');
});

function setGradient(svg, who) {
    let defs = svg.querySelectorAll('defs linearGradient stop');

    let gradientStart = defs[0];
    let gradientEnd = defs[1];

    let colors = JSON.parse(localStorage.getItem(`${who}`)).colors;

    gradientStart.setAttribute('stop-color', colors.main);
    gradientEnd.setAttribute('stop-color', colors.secondary);
}

function updateScores() {
    let scores = [wsu, opp];

    for (let _ = 0; _ <= 1; _++) {
        let scoreEls = document.querySelectorAll(`#${sides[_]}-scorebox .score`);
        let score = scores[_].score;

        for (let i = 0; i < scoreEls.length; i++) {
            let box = scoreEls.item(i);
            box.style.backgroundColor = i < score ? 'black' : 'transparent';
        }
    }
    // for (let i = 1; i <= scores[_].score; i++) {
    //     let scorebox = document.querySelector(`#${sides[_]}-scorebox .score:nth-child(${i})`);
    //     scorebox.style.backgroundColor = 'black';
    // }
}

function switchSides() {
    sides = sides.map((val) => (val == 'right' ? 'left' : 'right'));

    localStorage.setItem('wsuSide', sides[0]);
    localStorage.setItem('oppSide', sides[1]);

    for (const key of Object.keys(BACKBOXES)) {
        setGradient(BACKBOXES[key], sides[0] == key ? 'wsu' : 'opp');
    }

    updateScores();
}

document.addEventListener(
    'DOMContentLoaded',
    function () {
        console.log('READY');

        setTimeout(() => {
            switchSides();
        }, 3000);
    },
    false
);

socket.on('switchSides', () => {
    switchSides();
});
