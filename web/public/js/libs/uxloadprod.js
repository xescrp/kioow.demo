window.onload = uxfollowloadprod;
function uxfollowloadprod() {
    document.getElementById("multidaysbutton").onclick = function()
    {
        ga('send', 'event', 'steps', 'pressbtn', 'multidays', 0);
    }
    document.getElementById("step0button").onclick = function()
    {
        ga('send', 'event', 'steps', 'pressbtn', 'step0', 0);
    }
    document.getElementById("step1button").onclick = function()
    {
        ga('send', 'event', 'steps', 'pressbtn', 'step1', 1);
    }
    document.getElementById("step2button").onclick = function()
    {
        ga('send', 'event', 'steps', 'pressbtn', 'step2', 2);
    }
    document.getElementById("step3button").onclick = function()
    {
        ga('send', 'event', 'steps', 'pressbtn', 'step3', 3);
    }
    document.getElementById("step4button").onclick = function()
    {
        ga('send', 'event', 'steps', 'pressbtn', 'step4', 4);
    }
    document.getElementById("step5button").onclick = function()
    {
        ga('send', 'event', 'steps', 'pressbtn', 'step5', 5);
    }
    document.getElementById("step6button").onclick = function()
    {
        ga('send', 'event', 'steps', 'pressbtn', 'step6', 6);
    }
    document.getElementById("step7button").onclick = function()
    {
        ga('send', 'event', 'steps', 'pressbtn', 'step7', 7);
    }
    document.getElementById("step8publishbutton").onclick = function()
    {
        ga('send', 'event', 'steps', 'pressbtn', 'publish', 8);
    }
    document.getElementById("step8unpublishbutton").onclick = function()
    {
        ga('send', 'event', 'steps', 'pressbtn', 'unpublish', 9);
    }
    document.getElementById("step8draftbutton").onclick = function()
    {
        ga('send', 'event', 'steps', 'pressbtn', 'draft', 10);
    }
}

