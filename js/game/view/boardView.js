var BoardView = function() {
    console.log("Carregant vista...");
    var self = this;
    
    this.onMouseDown = function(mouseEvent) {
        var x = mouseEvent.x;
        var y = mouseEvent.y;
    };
    
    //Constructor
    (function() {
		game.add.image(0, (window.game.height) - 200, 'GUI');
        window.game.input.onDown.add(self.onMouseDown);
    })();
    
    var test = game.add.image(game.world.centerX, game.world.centerY, 'GUI');
    test.anchor.setTo(0.1, 0.1);
}