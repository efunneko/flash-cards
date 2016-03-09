/*global jQuery */

(function(ctx, $ ){

    var maxWord = 500;
    var state   = {currWord: "",
                   prevWords: [],
                   nextWords: []};

    function start() {
        var tr = $("#main").$table().$tr();

        var prev = tr.$td({'class':'prev-arrow'});
        var mid  = tr.$td({'class':'middle'});
        var next = tr.$td({'class':'next-arrow'});

        prev.$img({src: 'img/backward.png', 'class': 'arrow'});
        mid.$div({id: "word", 'class': "word"});
        next.$img({src: 'img/forward.png', 'class': 'arrow'});

        prev.bind("click", prevWord);
        next.bind("click", nextWord);

        nextWord();

    };

    function prevWord() {
        if (state.prevWords.length > 0) {
            state.nextWords.push(state.currWord);
            state.currWord = state.prevWords.pop();
            displayWord();
        }
    }

    function nextWord() {
        if (state.currWord != "") {
            state.prevWords.push(state.currWord);
        }
        if (state.nextWords.length == 0) {
            state.currWord = ctx.words[Math.floor(Math.random()*maxWord)];
        }
        else {
            state.currWord = state.nextWords.pop();
        }
        displayWord();
    }

    function displayWord() {
        
        var word = state.currWord;

        $("#word").html("");
        
        var card = $("#word").$div({'class': 'card'});

        var pieces = word.split(/-/);
        
        var count = 0;
        $.each(pieces, function(i, piece) {
            var className = "word-piece-" + (count++ % 2);
            card.$span(piece, {'class': className});
        });

        resize();
    };

    // Initialize 
    function init(options) {

        // Figure out the font size for the 

        $.createHtml("configure", {installParentFunctions: true});
        start();
        $(window).resize(resize);
    };

    // Determine the appropriate sizing for the display
    function resize() {
        var test = $('body').$span("international");
        test.css('font-size', '30px');
        var size = $(window).width()/test.width() * 0.75 * 30;
        $("#word").css('font-size', size + "px");
        test.remove();

        // Resize the arrow icons
        size = $(".prev-arrow").width() * 0.5;
        $('.arrow').width(size);
        $('.arrow').height(size);

    };
   

    $('document').ready(function() {
        init({
            id: "main"
        });
    });


})(this, jQuery);
