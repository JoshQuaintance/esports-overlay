const BACKBOXES = {};
const wsu = JSON.parse(localStorage.getItem('wsu'));
const opp = JSON.parse(localStorage.getItem('opp'));
const images = {
    wsu: './img/WSU.png',
    opp: './img/opp.webp',
};
const socket = io();

/**
 * The first item in the sides array will always be Wright State
 * and the other item will be the opponent
 */
let sides = [localStorage.getItem('wsuSide'), localStorage.getItem('oppSide')];

/**
 * Initializes the left box
 */
let leftBox = document.querySelector('#left-box');
leftBox.addEventListener('load', function () {
    let doc = this.getSVGDocument();
    BACKBOXES.left = doc; // saves the backboxes so that we can change the colors later
    setGradient(doc, sides[0] == 'left' ? 'wsu' : 'opp');
});

let rightBox = document.querySelector('#right-box');
rightBox.addEventListener('load', function () {
    let doc = this.getSVGDocument();
    BACKBOXES.right = doc; // saves the backboxes for later

    setGradient(doc, sides[0] == 'right' ? 'wsu' : 'opp');
});

function initStorage() {
    let _wsu = 'left';
    let _opp = _wsu == 'right' ? 'left' : 'right';
    localStorage.setItem('oppSide', _opp);
    localStorage.setItem('wsuSide', _wsu);
    localStorage.setItem(
        'opp',
        JSON.stringify({
            score: 1,
            colors: {
                main: '#00274C',
                secondary: '#FFCB05',
            },
            name: 'Michigan Pink',
        })
    );
    localStorage.setItem(
        'wsu',
        JSON.stringify({
            score: 2,
            colors: {
                main: '#046A38',
                secondary: '#CBA052',
            },
            name: 'WSU Raiders',
        })
    );
}

/**
 * Changes the gradient color of the backboxes depending on which team on which side
 * @param {SVGElement} svg The svg element
 * @param {string} who Who's colors to change the gradient
 */
function setGradient(svg, who) {
    // get the defs for color gradient stops
    let defs = svg.querySelectorAll('defs linearGradient stop');

    let gradientStart = defs[0];
    let gradientEnd = defs[1];

    // decide which team we're changing it to
    let colors = JSON.parse(localStorage.getItem(`${who}`)).colors;

    gradientEnd.setAttribute('stop-color', colors.main);
    gradientStart.setAttribute('stop-color', colors.secondary);
}

/**
 * Updates the score to the last saved state (does not change anything)
 */
function updateScores() {
    let scores = [wsu, opp];

    for (let _ = 0; _ <= 1; _++) {
        let scoreEls = document.querySelectorAll(`#${sides[_]}-scorebox .score`);
        let score = scores[_].score;

        for (let i = 0; i < scoreEls.length; i++) {
            let box = scoreEls.item(i);
            box.style.backgroundColor = i < score ? 'red' : 'transparent';
        }
    }
}

/**
 * Updates the state of the logos
 */
function updateLogos() {
    const logos = document.querySelectorAll('.logo-holder');

    // figure out which school we're doing
    // since the first one is always wsu, check if it's on
    // the left side, because the left side is the first one
    // to be changed
    let who = sides[0] == 'left' ? 'wsu' : 'opp';

    // go through both sides logo holder
    for (const logo of logos) {
        // get the actual img element
        let img = logo.querySelector('img');

        // if it's wsu also give it the wsu-logo id (so that it can be a little bigger)
        if (who == 'wsu') img.id = 'wsu-logo';
        else img.id = '';

        // then change the image
        img.src = images[who];

        // and make sure the next one is the opposite team
        who = who == 'wsu' ? 'opp' : 'wsu';
    }
}

/**
 * Switches the sides of the overlays and saves the state to localstorage
 */
function switchSides() {
    // Switch the sides (wsu is at index 0)
    sides = sides.map((val) => (val == 'right' ? 'left' : 'right'));

    // save the side state
    localStorage.setItem('wsuSide', sides[0]);
    localStorage.setItem('oppSide', sides[1]);

    // then go through all the backboxes (2 of them)
    // then we just use the setGradient to change the colors
    for (const key of Object.keys(BACKBOXES)) {
        let who = sides[0] == key ? 'wsu' : 'opp';
        setGradient(BACKBOXES[key], who);
    }

    // since both the updateLogos and updateScores
    // relies on the localstorage, and we just changed
    // the sides on there, we can simply run them both here
    // and they will automatically know which teams belong to
    // which side
    updateLogos();
    updateScores();
}

function addScore(who) {
    let data = who == 'wsu' ? wsu : opp;

    if (data.score < 2) data.score++;
    localStorage.setItem(who, JSON.stringify(data));
    updateScores();
}

function subtractScore(who) {
    let data = who == 'wsu' ? wsu : opp;

    if (data.score > 0) data.score--;
    localStorage.setItem(who, JSON.stringify(data));
    updateScores();
}

document.addEventListener(
    'DOMContentLoaded',
    function () {
        console.log('READY');
        updateLogos();
        updateScores();
    },
    false
);

// Socket to listen on the controls being clicked
socket.on('switchSides', (msg) => {
    console.log('switching side', `'msg: ${msg}`);

    switchSides();
});

socket.on('addScore', (msg) => {
    addScore(msg);
});

socket.on('subtractScore', (msg) => {
    subtractScore(msg);
});
