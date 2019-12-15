function GameUI(){

    this.health =  $(".health-bar");
    this.health.text("20");

    this.score = $('.score');
    this.score.text("200");

    this.lastScore = $('.last-score');
    this.lastScore.text("");

//    const highScore = new highscore(lastScore)
 //   scoretinggi.highscore.text(highScore)
    
    $('.back').click(function(){

        // change scene
        stop = true;

        // load html with get request
        $( ".route-view" ).load( "menu.html" );
        
    })

    $('#menu-btn').click(function(){
        // change scene
        stop = true;
        
        if(stop == true){
            $( ".route-view" ).load( "menu.html" );
        }
    })

    $('#restart-btn').click(function(){
        // change scene
        stop = true;
        
        // load html with get request
        if(stop == true){
            $( ".route-view" ).load( "game.html" );
        }

    })

}