module.exports = function() {
    var first = true;
    var impaired = 0; //  Using a counter instead of a strict boolean.
    var eventOpen = false;
    var Band = require('./Band.js')();
    var WGO = require('./WGO.js')();
    var Grapevine = require('./Grapevine.js')();
    var DrugPrompt = require('./DrugPrompt.js')();
    var BandPrompt = require('./BandPrompt.js')();
    var About = require('./About.js')();

    var impairl = function(b) {
        WGO.impair(!!b);
        WGO.refresh();
        Grapevine.impair(!!b);
        Grapevine.refresh();
        Band.impair(!!b);
        Band.refresh();
        return impaired;
    };

    // Impair for up to x ticks
    var impairAdd = function(x) {
        var z = Math.floor(Math.random() * x);
        if (z > 0) {
            impaired += z;
            WGO.addItem("Drugs can alter your sense of perception.")
            WGO.refresh();
        }
        return impaired;
    };

    var restart = function() {
        Band.clear();
        WGO.clear();
        Grapevine.clear();
        DrugPrompt.clear();

        /* Only bind these events on first pass */
        if (first) {
            first = false;
            $("#title").click(function() {
                Band.incDate();
            });
            $("#about").click(function() {
                About.showSplash();
            });
            $("#new_game").click(function() {
                restart();
                BandPrompt.name(Band.setName);
            });
            $("#tours").click(function() {
                Grapevine.otherSong();
                Grapevine.refresh();
            });
            $("#charts").click(function() {
                Grapevine.addItem("You are on the charts");
                Grapevine.refresh();
            });
            $("#how_to_play").click(function() {
                About.howToPlay();
            });
            $("#releases").click(function() {
                WGO.addItem("Releases selected");
                WGO.refresh();
            });
            $("#drugs").click(function() {
                BandPrompt.drugPreferences(Band.getDrugs());
            });
        }

        return true;
    };

    function showPopularity() {
        WGO.addItem(Band.getPop("local"));
        WGO.addItem(Band.getPop("national"));
        WGO.addItem(Band.getPop("global"));
        WGO.refresh();
    }

    function setEvent(b) {
        eventOpen = !!b;
    }

    // Return public interface
    return {
        incDate: function() {
            if (!eventOpen) {
                if (impaired > 0) {
                    impaired -= 1;
                    impairl(true);
                } else {
                    impaired = 0;
                    impairl(false);
                }
                var x = Band.incDate();
                if ((x % 30) == 0) {
                    showPopularity();
                }
                if ((x % 11) == 0) {
                    setEvent(true);
                    WGO.addItem("You have been offered drugs.")
                    WGO.refresh();
                    DrugPrompt.offer(DrugPrompt.drugName(x), impaired, Band.drugoffer, impairAdd, setEvent);
                }
                if ((x % 3) == 0) {
                    Grapevine.otherSong();
                    Grapevine.refresh();
                }
            } // if !eventOpen
        },
        whatever: function() {
            return true;
        },
        init: function() {
            return restart();
        },
        impair: function(b) {
            return impairl(b);
        }
    }; // end return of public object

};
