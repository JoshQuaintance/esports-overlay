let scoreA = 0
let scoreB = 0
let isFlipped = false

// counter
//A buttons
const increaseA = document.getElementById("BTNmapscoreAup")
const decreaseA = document.getElementById("BTNmapscoreAdown")
const mapscoreA = document.getElementById("mapscoreA")

increaseA.onclick = function(){
    if (scoreA != 5){
        scoreA++;
        mapscoreA.textContent=scoreA;
    } 
}

decreaseA.onclick = function(){
    if (scoreA > 0){
        scoreA--;
        mapscoreA.textContent=scoreA;
    }
}

//B buttons
const increaseB = document.getElementById("BTNmapscoreBup")
const decreaseB = document.getElementById("BTNmapscoreBdown")
const mapscoreB = document.getElementById("mapscoreB")

increaseB.onclick = function(){
    if (scoreB != 5){
        scoreB++;
        mapscoreB.textContent=scoreB;
    } 
}

decreaseB.onclick = function(){
    if (scoreB > 0){
        scoreB--;
        mapscoreB.textContent=scoreB;
    }
}

//Reset button
const resetButton = document.getElementById("resetButton")

resetButton.onclick = function(){
    location.reload();
    mapscoreA.textContent=scoreA;
    mapscoreB.textContent=scoreB;
}

//Flipping BG Image
function changeBackground() {
    let bodyID = document.getElementById("scorebug");
    if (isFlipped) {
        bodyID.classList.remove("flipBG");
        bodyID.classList.add("mainBG");
    } else {
        bodyID.classList.remove("mainBG");
        bodyID.classList.add("flipBG");
    }
    isFlipped = !isFlipped; // Toggle the stat
}