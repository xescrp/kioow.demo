//http://dev.billysbilling.com/blog/The-retina-trifecta-CSS-sprites-IMG-tags-and-SVGs-oh-my
Retina = function() {
    return {
        init: function(){
            var pixelRatio = !!window.devicePixelRatio ? window.devicePixelRatio : 1;
            if (pixelRatio > 1) {
                var images = document.querySelectorAll("img");
                Array.prototype.forEach.call(images, function(el, idx) {
                        if (el.getAttribute("data-src2x")) {
                            el.setAttribute("data-src-orig", el.getAttribute("src"));
                            el.setAttribute("src", el.getAttribute("data-src2x"));
                        }
                });

            }
        }
    };
}();
//Init
Retina.init();