/*global jQuery */

(function(ctx, $ ){

    ctx.maxWord = 500;

    ctx.start = function() {
        console.log("Have words:", ctx.words);

        $("#main").$div({id: "word", 'class': "word"}).bind("click", ctx.newWord);
        $(document).bind("click", ctx.newWord);
        ctx.newWord();

    };

    ctx.newWord = function() {
        var word = ctx.words[Math.floor(Math.random()*ctx.maxWord)];
        
        
        $("#word").html("");
        
        var pieces = word.split(/-/);
        
        var count = 0;
        $.each(pieces, function(i, piece) {
            var className = "word-piece-" + (count++ % 2);
            $("#word").$span(piece, {'class': className});
        });
        $("#word").fitText(0.5);
        console.log(word);
    };

    // Initialize 
    ctx.init = function (options) {
        $.createHtml("configure", {installParentFunctions: true});
        this.start();
    };
    
    $('document').ready(function() {
        ctx.init({
            id: "main"
        });
    });


})(this, jQuery);
