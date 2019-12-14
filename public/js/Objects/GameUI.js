function GameUI(){

    this.health =  $(".health-bar");
    this.health.text("Health : " + 20);

    this.score = $('.score');
    this.score.text("Score : " + 200);
    
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