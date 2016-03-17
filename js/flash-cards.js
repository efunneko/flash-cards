/*global jQuery */

(function(ctx, $ ){

    var maxWord = 1000;
    var state   = {currWord: "",
                   prevWords: [],
                   nextWords: []};

    function start() {
        var tr = $("#main").$table().$tr();

        var prev = tr.$td({'class':'prev-arrow'});
        var mid  = tr.$td({'class':'middle'});
        var next = tr.$td({'class':'next-arrow'});

        prev.$img({src: backwardArrow, 'class': 'arrow'});
        mid.$div({id: "word", 'class': "word"});
        next.$img({src: forwardArrow, 'class': 'arrow'});

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
        var windowWidth = $(window).width();
        $('#main').width(windowWidth);
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

    var backwardArrow = "data:image/png;base64,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";
    var forwardArrow = "data:image/png;base64,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";

})(this, jQuery);
