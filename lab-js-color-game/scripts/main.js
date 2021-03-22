var numCards = 6;
var gameOver = false;
var colors = [];
var pickedColor;
var body = document.querySelector("body");
var cards = document.querySelectorAll(".card");
var colorDisplay = document.getElementById("color-picked");
var messageDisplay = document.querySelector("#message");
var h1 = document.querySelector("h1");
var navigatorEl = document.getElementsByClassName("mode-select");
var resetButton = document.querySelector("#reset");
var resetDisplay = document.querySelector("#reset span");
var cardContainerEl = document.getElementById("card-container");
var currentMode = "hard";
var modeIndex = {
    "easy" : 0,
    "hard" : 1,
    "nightmare" : 2
};
window.onload = function() {
    console.log("window loaded");
    
    init();
};

function init() {
    currentMode = "hard";
    initNavigators();
    initCards();
    reset();
}
var timer;
var counter_id;
var blink_id;
var blinktimer;
var counterString;
function blinkDown(){
    blinktimer++;
    if(blinktimer % 10 === 0)
        body.style.backgroundColor = "#57575A";
    else
        body.style.backgroundColor = "#232323";
}

function countDown( ){
    timer--;
    messageDisplay.textContent = (counterString + timer);
    // body.style.backgroundColor = "#27272A";
    // body.style.backgroundColor = "#232323";
    if(timer === 0 || gameOver === true){
        stopCount();
        messageDisplay.textContent = ("TIMEOUT!");
        resetButton.style.display = "block";
        body.style.backgroundColor = pickedColor;
        gameOver = true;
        for(var index = 0; index < cards.length; index++){
            changeColors("#FFF");
        }
    }
}
function startCount(){
    timer = 5;
    blinktimer = 0;
    blink_id = setInterval(blinkDown, 100);
    counter_id = setInterval(countDown, 1000);
}
function stopCount(){
    // resetButton.style.visibility = "visible";
    clearInterval(counter_id);
    clearInterval(blink_id);
}
function initNavigators(){
    // console.log(modeIndex["hard"]);
    // for(var i = 0; i < 3; i++){
    //     navigatorEl[i].style.display = "inline";
    // }
    for(var index = 0; index < 2; index++){
        console.log("index: " + index);
        if(index === modeIndex["hard"]){
            navigatorEl[index].classList.add("currentModeClass");
        }
        navigatorEl[index].addEventListener("click", function(){
            if(currentMode === "nightmare"){
                stopCount();
            }
            currentMode = this.getAttribute("id");
            var origin = document.getElementsByClassName("currentModeClass")
            origin[0].classList.toggle("currentModeClass");
            this.classList.toggle("currentModeClass");
            console.log(currentMode);
            initCards();
            reset();
            resetButton.style.display = "block";
        });
    
    }
    navigatorEl[2].addEventListener("click", function(){
        // alert("gogogogo");
        resetButton.style.display = "none";
        currentMode = this.getAttribute("id");
        document.getElementsByClassName("currentModeClass")[0].classList.toggle("currentModeClass");
        this.classList.toggle("currentModeClass");
        initCards();
        reset();
        init_NightMare();
    });
}
function init_NightMare(){
    counterString = "WHAT'S THE COLOR ?  ";
    resetButton.style.display = "none";
    stopCount();
    startCount();
    messageDisplay.textContent = (counterString + timer);
}
function initCards() {
    if(currentMode === "easy"){
        numCards = 3;
    }else{
        numCards = 6;
    }
    cardContainerEl.innerHTML = "";
    for(var i = 0; i < numCards; i++){
        cardContainerEl.innerHTML += "<div class=\"card\"></div>";
    }
    cards = document.querySelectorAll(".card");
    console.log("cards.length = " + cards.length);
    if(currentMode !== "nightmare"){
        for (var i = 0; i < cards.length; i++) {
            //add click listeners to cards
            cards[i].addEventListener("click", function() {
                if (gameOver)
                    return;
                //grab color of clicked card
                var clickedColor = this.style.backgroundColor;
                // alert(this.style.backgroundColor);
                //compare color to pickedColor
                if (clickedColor === pickedColor) {
                    messageDisplay.textContent = "Correct!";
                    resetDisplay.textContent = "Play Again";
                    changeColors("#FFF");
                    body.style.backgroundColor = clickedColor;
                    gameOver = true;
                    stopCount();
                } else {
                    this.style.opacity = 0;
                    messageDisplay.textContent = "Try Again"
                    // counterString = "TRY AGAIN! ";
                }
            });
            // cards[i].addEventListener()
        }
    }else{
        for (var i = 0; i < cards.length; i++) {
            //add click listeners to cards
            cards[i].addEventListener("click", function() {
                if (gameOver)
                    return;
                //grab color of clicked card
                var clickedColor = this.style.backgroundColor;
                // alert(this.style.backgroundColor);
                //compare color to pickedColor
                if (clickedColor === pickedColor) {
                    messageDisplay.textContent = "Correct!";
                    resetDisplay.textContent = "Play Again"
                    resetButton.style.display = "block"; 
                   
                    changeColors("#FFF");
                    body.style.backgroundColor = clickedColor;
                    gameOver = true;
                    stopCount();
                } else {
                    this.style.opacity = 0;
                    messageDisplay.textContent = ("Try Again  " + timer);
                    counterString = "TRY AGAIN ";
                }
            });
        }
    }
}

function reset() {

    console.log("reseting");
    gameOver = false;
    colors = generateRandomColors(numCards);
    //pick a new random color from array
    pickedColor = pickColor();
    //change colorDisplay to match picked Color
    colorDisplay.textContent = pickedColor;
    resetDisplay.textContent = "New Color"
    messageDisplay.textContent = "What's the Color?";
    //change colors of cards
    for (var i = 0; i < cards.length; i++) {
        cards[i].style.opacity = 1;
        if (colors[i]) {
            cards[i].style.display = "block"
            cards[i].style.backgroundColor = colors[i];
        } else {
            cards[i].style.display = "none";
        }
    }
    body.style.backgroundColor = "#232323";
}

resetButton.addEventListener("click", function() {
    reset();
    if(currentMode === "nightmare"){
        init_NightMare();
        // this.style.display = none;
    }
})

function changeColors(color) {
    //loop through all cards
    for (var i = 0; i < cards.length; i++) {
        //change each color to match given color
        cards[i].style.opacity = 1;
        cards[i].style.backgroundColor = color;
    }
}

function pickColor() {
    var random = Math.floor(Math.random() * colors.length);
    return colors[random];
}

function generateRandomColors(num) {
    //make an array
    var arr = []
    //repeat num times
    for (var i = 0; i < num; i++) {
        //get random color and push into arr
        arr.push(randomColor())
    }
    //return that array
    return arr;
}

function randomColor() {
    //pick a "red" from 0 - 255
    var r = Math.floor(Math.random() * 256);
    //pick a "green" from  0 -255
    var g = Math.floor(Math.random() * 256);
    //pick a "blue" from  0 -255
    var b = Math.floor(Math.random() * 256);
    return "rgb(" + r + ", " + g + ", " + b + ")";
}
