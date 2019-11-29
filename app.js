/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/
var scores, curScore, player_active, dice, dice2, dice_prev;
function reset() {
  document.querySelector("#name-0").textContent = "PLAYER 1";
  document.querySelector("#name-1").textContent = "PLAYER 2";
  scores = [0, 0];
  curScore = 0;
  player_active = 0; //0 first player 1 second player
  dice = 0;
  dice2 = 0;
  var limit = 100;
  dice_prev = 0;
  document.querySelector("#score-0").textContent = 0;
  document.querySelector("#score-1").textContent = 0;
  document.querySelector("#current-0").textContent = 0;
  document.querySelector("#current-1").textContent = 0;
  document
    .querySelector("#player-0")
    .setAttribute("class", "player-0-panel active");
  document.querySelector("#player-1").setAttribute("class", "player-0-panel");
  x = document.querySelectorAll(".dice");
  for (var i = 0; i < x.length; i++) x[i].style.display = "none";
}

reset();

//alert(document.querySelector("#player-0").setAttribute("class", "newplayer"));

function dotChanger() {
  active = "#player-" + player_active;
  newone = "player-" + player_active + "-panel";
  if (player_active == 0) {
    document.querySelector(active).setAttribute("class", newone);
    document
      .querySelector("#player-1")
      .setAttribute("class", "player-1-panel active");
    player_active = 1;
  } else if (player_active == 1) {
    document.querySelector(active).setAttribute("class", newone);
    document
      .querySelector("#player-0")
      .setAttribute("class", "player-0-panel active");
    player_active = 0;
  }
}

//document.querySelector("#current-" + player_active).innerHTML =
//  "<em>" + dice + "</em>";

//if (scores[0] == 0 && scores[1] == 0)
//  document.querySelector(".dice").style.display = "none";

function roll() {
  x = document.querySelectorAll(".dice");
  for (var i = 0; i < x.length; i++) x[i].style.display = "";
  dice_prev = dice;
  dice = Math.floor(Math.random() * 6) + 1;
  dice2 = Math.floor(Math.random() * 6) + 1;
  if (dice_prev == 6 && dice == 6)
    document.querySelector("#score-" + player_active).textContent = 0;
  if ((dice == 1 || dice2 == 1) && player_active == 1) {
    document.querySelector("#current-1").textContent = 0;
    dotChanger();
  } else if ((dice == 1 || dice2 == 1) && player_active == 0) {
    document.querySelector("#current-0").textContent = 0;
    dotChanger();
  }
  document
    .querySelector(".player-" + player_active + "-panel")
    .setAttribute("class", "player-" + player_active + "-panel active");
  document.querySelector("#current-" + player_active).textContent = dice;
  image_dice = "dice-" + dice + ".png";
  document.querySelector(".dice").setAttribute("src", image_dice);
  image_dice2 = "dice-" + dice2 + ".png";
  document.querySelector("#second-dice").setAttribute("src", image_dice2);
}

function add_score() {
  x = document.querySelectorAll(".dice");
  for (var i = 0; i < x.length; i++) x[i].style.display = "none";
  document.querySelector("#current-0").textContent = 0;
  document.querySelector("#current-1").textContent = 0;
  scores[player_active] += dice;
  document.querySelector("#score-" + player_active).textContent =
    scores[player_active];
  if (scores[player_active] > limit) {
    document.querySelector("#name-" + player_active).textContent = "WINNER!!";
  } else dotChanger();
}

function set_limit() {
  limit = document.querySelector(".input-text").value;
  alert(limit);
}

document.querySelector(".btn-roll").addEventListener("click", roll);

document.querySelector(".btn-hold").addEventListener("click", add_score);

document.querySelector(".btn-new").addEventListener("click", reset);
