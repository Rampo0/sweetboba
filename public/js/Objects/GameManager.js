function GameManager(){
    this.score = 0;
}

function highscore(score){
    highscore = 0;
    if(highscore<score){
        this.highscore = score;
    }
}