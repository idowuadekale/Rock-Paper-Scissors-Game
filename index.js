var choiceList = ["rock","paper","scissors"];
var gameScore = 0;

$("#rpsgamebtn__help").click(function () {
  $(".game__rules").addClass("help");
})

$("#rpsgamebtn__close").click(function () {
  $(".game__rules").removeClass("help");
})

var playerSelection = function (key) {
  key.clone().appendTo("#player-side");
  let winAudio = new Audio("sound/success.wav");
  let loseAudio = new Audio("sound/lose.wav");
  var playerChoice = choiceList.indexOf(key.attr("id"));
  var computerChoice = computerSelection();
  if (playerChoice === computerChoice) {
    $("#game__status").text("DRAW");
  } else {
    if (computerChoice === (playerChoice + 1)%3) {
      $("#game__status").text("YOU LOSE");
      loseAudio.play();
      $("#computer-side div").addClass("winner-effect");
    } else {
      $("#game__status").text("YOU WIN");
      winAudio.play();
      $("#player-side div").addClass("winner-effect");
      $(".scorebox__number").text(`${++gameScore}`);
    }
  }
}
var playSound = function () {
  let audio = new Audio("sound/pressed.wav");
  audio.play();
};

var computerSelection = function () {
  var randomIndex = Math.floor((Math.random()*choiceList.length));
  var pickedChoice = choiceList[randomIndex];
  $(`#${pickedChoice}`).clone().appendTo("#computer-side");
  return randomIndex;
};

$(".choice__wrapper").click(function (event) {
  playSound();
  $(".game__container").addClass("toggle");
  var choice = $(event.currentTarget);
  playerSelection(choice);
  $("#game__startover").click(function () {
    $("#player-side div").remove();
    $("#computer-side div").remove();
    $(".game__container").removeClass("toggle");
  }
);
});
