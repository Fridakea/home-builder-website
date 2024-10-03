// Variablerne
let point;
let life;
let seconds;
let countDownIntervalId;

// Funktion til at updatere timeren
function updateTimer() {
  time.textContent = seconds;
}

window.addEventListener("load", onLoadPage);

// Hjælper funktion til at opdatere tiden
function updateTimer() {
  time.textContent = seconds;

  // Check if there are 5 seconds or less left, and change text color to red
  if (seconds <= 5) time.style.color = '#ff0000';
  else time.style.color = '#39B54A';
}

function onLoadPage() {
    console.log("onLoadPage");
  //Skjul andre skærme
  game_over.classList.add("hide");
  level_complete.classList.add("hide");
  //Vis start skærm
  start.classList.remove("hide");
  //Klik på start_knap
  start_button.addEventListener("click", startGame);
  start_button.classList.add("bounce");
}

// Start spillet
function startGame() {
    console.log("startGame");

    //Skjul andre skærme
    start.classList.add("hide");
    game_over.classList.add("hide");
    level_complete.classList.add("hide");

    point = 0;
    seconds = 15;
    life = 3;
    updateTimer();

    window_container.style.display = "block";
    window_broken_container.style.display = "block";
    life_board.classList.add("hearts_3");

    // timer-funktionen
    countDownIntervalId = setInterval(function () {
        if (seconds > 0) seconds--;
        if (seconds <= 0) {
           // Stop spillet straks når tiden bliver 0.
          clearInterval(countDownIntervalId);
          stopGame();
          return;
        }
        updateTimer();
    }, 1000);

    //Giv en position til container
    window_container.classList.add("pos2");
    window_container1.classList.add("pos3");
    window_container2.classList.add("pos6");

    window_broken_container.classList.add("pos4");
    window_broken_container1.classList.add("pos1");
    window_broken_container2.classList.add("pos5");

    // tilføj delay til nogle fra starten
    window_container1.classList.add("delay2");
    window_container2.classList.add("delay6");
    
    window_broken_container1.classList.add("delay1");
    window_broken_container2.classList.add("delay5");

    // Start falde-animationer
    window_container.classList.add("fall");
    window_container1.classList.add("fall");
    window_container2.classList.add("fall");
    window_broken_container.classList.add("fall");
    window_broken_container1.classList.add("fall");
    window_broken_container2.classList.add("fall");

    //Lyt efter flyv-animationer er færdig
    window_container.addEventListener("animationiteration", restartWindowAnimation);
    window_container1.addEventListener("animationiteration", restartWindowAnimation);
    window_container2.addEventListener("animationiteration", restartWindowAnimation);
    window_broken_container.addEventListener("animationiteration", restartBrokenWindowAnimation);
    window_broken_container1.addEventListener("animationiteration", restartBrokenWindowAnimation);
    window_broken_container2.addEventListener("animationiteration", restartBrokenWindowAnimation);

    //Lyt efter klik på alle elementer
    window_container.addEventListener("mousedown", clickWindow);
    window_container1.addEventListener("mousedown", clickWindow);
    window_container2.addEventListener("mousedown", clickWindow);
    window_broken_container.addEventListener("mousedown", clickBrokenWindow);
    window_broken_container1.addEventListener("mousedown", clickBrokenWindow);
    window_broken_container2.addEventListener("mousedown", clickBrokenWindow);
}

/** Funktionerne til hvert spil element */
function clickWindow() {
  point++;

  audio_hammer.pause();
  audio_hammer.load();
  audio_hammer.play();

  resetGameObject(this, clickWindow, "fade-out");

  // Skift af billede af huset for at se udvikling i spillet
  if (point >= 2) {
    house.style.backgroundImage = "url('svg/hus1.svg')";
  } if (point >= 4) {
    house.style.backgroundImage = "url('svg/hus2.svg')";
  } if (point >= 6) {
    house.style.backgroundImage = "url('svg/hus3.svg')";
  } if (point >= 8) {
    house.style.backgroundImage = "url('svg/hus4.svg')";
  } if (point >= 10) {
    house.style.backgroundImage = "url('svg/hus5.svg')";
  }  if (point >= 12) {
    house.style.backgroundImage = "url('svg/hus6.svg')";
  }

  // Tilføj "bounce" animation ved skift af billede
  house.classList.add("bounce-once");

  // Fjern "bounce" animation efter skift af billede
  house.addEventListener("animationend", function () {
    house.classList.remove("bounce-once");
  });
}

function restartWindowAnimation() {
  restartAnimation(this, clickWindow, "fade-out");
}

function clickBrokenWindow() {
  life--;

  audio_glass_break1.play();

  resetGameObject(this, clickBrokenWindow, "break-window");

  life_board.classList = [];

  if (life === 2) life_board.classList.add('hearts_2');
  if (life === 1) life_board.classList.add('hearts_1'); 
  if (life <= 0) stopGame();
}

function restartBrokenWindowAnimation() {
  restartAnimation(this, clickBrokenWindow, "break-window", "shake");
}
/***************************************/


/** Under det her er genbrugelige funtioner */
function resetGameObject(myContainer, myListener, clickedAnimationClass1, clickedAnimationClass2) {
  console.log("clickGameObject", clickedAnimationClass1);

  document.querySelector("#score").textContent = point;

  //ryd op, så man ikke kan kilkke på den samme flere gange
  myContainer.removeEventListener("mousedown", myListener);

  //frys (pause) og fade-out
  myContainer.classList.add("freeze");
  myContainer.firstElementChild.classList.add(clickedAnimationClass1);
  myContainer.firstElementChild.classList.add(clickedAnimationClass2);

  //Lyt efter flyv-animationer er færdig
  myContainer.addEventListener("animationend", () => restartAnimation(myContainer, myListener, clickedAnimationClass1, clickedAnimationClass2));
}

// Genstart for det gode vindu
function restartAnimation(myContainer, myListener, clickedAnimationClass1, clickedAnimationClass2) {
  //ryd op, fjern alt er på container og sprite
  myContainer.classList.remove("freeze");
  myContainer.classList.remove("fall");
  myContainer.firstElementChild.classList.remove(clickedAnimationClass1);
  myContainer.firstElementChild.classList.remove(clickedAnimationClass2);

  //For at kunne genstarte flyv animationen, da vi fjener og tilføjer den i samme function
  myContainer.offsetLeft;

  // Nulstil class listen
  myContainer.classList = []

  // Giv tilfældig position
  let myRandom = Math.floor(Math.random()*7) + 1;
  myContainer.classList.add("pos" + myRandom);
  myContainer.classList.add("delay" + myRandom);
  myContainer.classList.add("speed" + myRandom);

  //Start falde-animationer på element
  myContainer.classList.add("fall");

  //Lyt efter klik på element
  myContainer.addEventListener("mousedown", myListener);
} 

function stopGame() {
  console.log("stopGame")
  clearInterval(countDownIntervalId);

  window_container.classList=[]
  window_container1.classList=[]
  window_container2.classList=[]

  window_broken_container.classList=[]
  window_broken_container1.classList=[]
  window_broken_container2.classList=[]

  if (point >= 10) {
    levelComplete();
  } else {
    gameOver();
  }
}

function levelComplete() {
  console.log("levelComplete");

  audio_win.play();

  // Vis level complete skærm
  level_complete.classList.remove("hide");
  document.querySelector("#level-complete-point").textContent = "Tillykke! Du nåede at samle  " + point + " gode byggematerialer til dit hus!";
  //Klik på spil igen
  document.querySelector("#play-again-button").addEventListener("click", startGame);
}

function gameOver() {
  console.log("gameOver");

  audio_loose.play();

  // Vis gameover skærm
  game_over.classList.remove("hide");
  document.querySelector("#game-over-point").textContent = "Øv! Du nåede kun samle  " + point + " gode byggematerialer til dit hus...";
  //Klik på prøv igen
  document.querySelector("#try-again-button").addEventListener("click", startGame);
}