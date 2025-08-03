module.exports = function() {
    // Requires Bootbox.js
    bootbox.addLocale("rock", {
        OK: 'Rock',
        CANCEL: 'Bugger Off',
        CONFIRM: 'Alrighty Then'
    });
    bootbox.setLocale("rock");

    // Private vars
    function displaySplash() {
        var about = '<p>This game is based heavily on an old DOS computer game called "Rock Star".</p>';
        about += '<p>I had so much fun playing with the game in the early 90s that I decided that I didn\'t want to be without it any more.</p>';
        about += '<p>Thanks to the folks in chizat for the encouragement and the crowdsourcing of artists and track titles.</p>';
        about += '<p>My name is <a href="http://tangentialcold.com">Kurt Schwind</a> and I approve this message.</p>';


        bootbox.alert({
            size: 'large',
            title: 'About',
            message: about
        });
    }

    function displayHowToPlay() {
        var msg = 'You are a budding Rock n Roll star!  Navigate your life choices and see if fame and fortune await!';

        bootbox.alert({
            size: 'large',
            title: 'How To Play',
            message: msg
        });
    }


    // Return public interface
    return {
        showSplash: function(fn) {
            displaySplash();
        },
        howToPlay: function() {
            displayHowToPlay();
        }
    }; // end return of public object

};
