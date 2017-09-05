$(function () {
    var typed = new Typed(".cur-point", {

        strings: ['FRONT-END ^500DEVELOPER '],
        stringsElement: null,
        typeSpeed: 150,
        startDelay: 2000,
        fadeOut: true,
        fadeOutClass: 'typed-fade-out',
        fadeOutDelay: 500,
        loop: false,
        loopCount: Infinity,
        showCursor: true,
        cursorChar: '|',
        autoInsertCss: true,
        contentType: 'html',
        onComplete: function(self){
            "use strict";
            $('.typed-cursor').css({
                "transition":"opacity 1s linear",
                "opacity" : "0"
            });
        }

    });
});