$(".play-btn").click(function(){
   

    $( "#result" ).load( "index_game.html" );

    // $.get( "index_game.html", function( data ) {
    //     $( ".result" ).html( data );
    //     alert( "Load was performed." );
    // });

    // $.get( "index_game.html" );

    // $.ajax({
    //     type : 'GET',
    //     url : 'index_game.html',
    //     success : function (response) {
    //         alert("get");
    //     }
    // });
})