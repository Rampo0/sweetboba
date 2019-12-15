var skor = new GameUI().lastScore;
var skortinggi = new highscore(skor);
//document.write("highscore: " + text(skor))

document.getElementsByClassName("skor-tinggi");

$(".skor-tinggi").appendTo("Highscore: " + text(skortinggi.highscore));