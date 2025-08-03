(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
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

},{}],2:[function(require,module,exports){
module.exports = function() {

    // Private vars
    var bandname = "Abjurer Nowhere";
    var masterid = 0; // Just a unique key
    var impaired = false;
    var rot13 = require('./rot13.js');

    // personal
    var health = 0;
    var creativity = 0;
    var happiness = 0;
    var alertness = 0;

    // time
    var daycount = 1;
    var dow = [
        "Sunday",
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday"
    ];

    // popularity
    var localp = 0;
    var nationalp = 0;
    var globalp = 0;

    // All values are in the affirmative.
    // That is, these are added when drug is taken.
    var drugs = {
        "lsd": {
            "addiction": 0,
            "factors": {
                "addiction": 1,
                "health": -2,
                "creativity": 10,
                "happiness": 3,
                "alertness": -5
            }
        },
        "alcohol": {
            "addiction": 0,
            "factors": {
                "addiction": 5,
                "health": -3,
                "creativity": 2,
                "happiness": 5,
                "alertness": -10
            }
        },
        "marijuanna": {
            "addiction": 0,
            "factors": {
                "addiction": 3,
                "health": -2,
                "creativity": 3,
                "happiness": 7,
                "alertness": -11
            }
        },
        "herion": {
            "addiction": 0,
            "factors": {
                "addiction": 10,
                "health": -9,
                "creativity": 10,
                "happiness": 0,
                "alertness": -12
            }
        }
    };


    var singles = []; // Line items in 
    var tours = [];

    // ---------------------- Some private methods ----------------------------------
    // This function returns 'true' if the case was not solvable 
    function addSingle(name) {
        var retval = {
            'id': masterid++,
            'name': name,
            'lpop': 0,
            'npop': 0,
            'gpop': 0
        };
        singles.push(retval);
        return retval;
    }

    function init() {
        localp = nationalp = globalp = 0;
        happiness = alertness = creativity = 50;
        health = 80;
        daycount = 1;
        score = 0;
        refreshPersonal();
        refreshPopularity();
        drugs.lsd.addiction = 0;
        drugs.alcohol.addiction = 0;
        drugs.marijuanna.addiction = 0;
        drugs.herion.addiction = 0;
    }

    function refreshPersonal() {
        $("#player_health").html(health);
        $("#player_creativity").html(creativity);
        $("#player_happiness").html(happiness);
        $("#player_alertness").html(alertness);
    }

    function refreshPopularity() {
        $("#local_pop").html(localp);
        $("#national_pop").html(nationalp);
        $("#global_pop").html(globalp);
    }

    function refreshName() {
        if (impaired) {
            $("#bandname").html(rot13(bandname));
        } else {
            $("#bandname").html(bandname);
        }
    }

    function flavorPop(pop, loc) {
        var retval = "";
        if (pop > 85) {
            retval = "worshipped as the rock diety that you are!";
        }
        if (pop < 86) {
            retval = "known to even casual fans";
        }
        if (pop < 65) {
            retval = "getting your music pirated by scores of youth";
        }
        if (pop < 45) {
            retval = "getting some air-play on radio stations.";
        }
        if (pop < 25) {
            retval = "known to a few die-hard fans.";
        }
        if (pop < 16) {
            retval = "virtually unknown.";
        }
        retval = "<em>At the " + loc + " level you are " + retval + "</em>";
        return retval;

    }


    // Return public interface
    return {
        setName: function(str) {
            if ((str == null) || (str.trim() !== "")) {
                bandname = str;
            }
            $("#bandname").html(bandname);
        },
        impair: function(b) {
            impaired = !!b;
        },
        refresh: function() {
            refreshPersonal();
            refreshPopularity();
            refreshName();
        },
        drugoffer: function(drugname, taken) {
            switch (drugname) {
                case "lsd":
                    if (taken) {
                        happiness += drugs.lsd.factors.happiness;
                        alertness += drugs.lsd.factors.alertness;
                        creativity += drugs.lsd.factors.creativity;
                        health += drugs.lsd.factors.health;
                        drugs.lsd.addiction += drugs.lsd.factors.addiction;
                    } else {
                        happiness -= drugs.lsd.factors.happiness;
                        alertness -= drugs.lsd.factors.alertness;
                        creativity -= drugs.lsd.factors.creativity;
                        health -= drugs.lsd.factors.health;
                        drugs.lsd.addiction -= (drugs.lsd.factors.addiction / 2);
                    }
                    refreshPersonal();
                    break;
                case "alcohol":
                    if (taken) {
                        happiness += drugs.alcohol.factors.happiness;
                        alertness += drugs.alcohol.factors.alertness;
                        creativity += drugs.alcohol.factors.creativity;
                        health += drugs.alcohol.factors.health;
                        drugs.alcohol.addiction += drugs.alcohol.factors.addiction;
                    } else {
                        happiness -= drugs.alcohol.factors.happiness;
                        alertness -= drugs.alcohol.factors.alertness;
                        creativity -= drugs.alcohol.factors.creativity;
                        health -= drugs.alcohol.factors.health;
                        drugs.alcohol.addiction -= (drugs.alcohol.factors.addiction / 2);
                    }
                    refreshPersonal();
                    break;
                case "marijuanna":
                    if (taken) {
                        happiness += drugs.marijuanna.factors.happiness;
                        alertness += drugs.marijuanna.factors.alertness;
                        creativity += drugs.marijuanna.factors.creativity;
                        health += drugs.marijuanna.factors.health;
                        drugs.marijuanna.addiction += drugs.marijuanna.factors.addiction;
                    } else {
                        happiness -= drugs.marijuanna.factors.happiness;
                        alertness -= drugs.marijuanna.factors.alertness;
                        creativity -= drugs.marijuanna.factors.creativity;
                        health -= drugs.marijuanna.factors.health;
                        drugs.marijuanna.addiction -= (drugs.marijuanna.factors.addiction / 2);
                    }
                    refreshPersonal();
                    break;
                case "herion":
                    if (taken) {
                        happiness += drugs.herion.factors.happiness;
                        alertness += drugs.herion.factors.alertness;
                        creativity += drugs.herion.factors.creativity;
                        health += drugs.herion.factors.health;
                        drugs.herion.addiction += drugs.herion.factors.addiction;
                    } else {
                        happiness -= drugs.herion.factors.happiness;
                        alertness -= drugs.herion.factors.alertness;
                        creativity -= drugs.herion.factors.creativity;
                        health -= drugs.herion.factors.health;
                        drugs.herion.addiction -= (drugs.herion.factors.addiction / 2);
                    }
                    refreshPersonal();
                    break;
                default:
                    console.log("Unknown drug,taken : " + drugname + " , " + taken);
            }

        },
        restart: function() {
            return init();
        },
        getDrugs: function() {
            return drugs;
        },
        getPop: function(popType) {
            var retval = 'No one cares about you.';
            if (popType === "local") {
                retval = flavorPop(localp, popType);
            }
            if (popType === "national") {
                retval = flavorPop(nationalp, popType);
            }
            if (popType === "global") {
                retval = flavorPop(globalp, popType);
            }
            return retval;
        },
        incDate: function() {
            daycount++;
            var wk = Math.floor((daycount / 7) + 1) % 52;
            var yr = Math.floor((daycount / 365) + 1);
            $("#time_dow").html(dow[daycount % 7]);
            $("#time_year").html(yr);
            $("#time_week").html(wk);
            return daycount;
        },
        clear: function() {
            return init();
        }
    }; // end return of public object

};

},{"./rot13.js":9}],3:[function(require,module,exports){
module.exports = function() {
    // Requires Bootbox.js
    bootbox.addLocale("rock", {
        OK: 'Rock',
        CANCEL: 'Bugger Off',
        CONFIRM: 'Alrighty Then'
    });
    bootbox.setLocale("rock");

    // Private vars

    function getName(nameFn) {
        var msg = "Name your band : ";


        bootbox.prompt({
            message: msg,
            title: "Rock n Roll Fame Await!",
            closeButton: false,
            size: 'medium',
            callback: nameFn
        });
    }

    function drugRange(n) {
        var retStr = '';
        if (n > 85) {
            retStr = '<p class="text-danger">You will gladly shiv your own mother for some ';
        }
        if (n < 85) {
            retStr = '<p class="text-warning">You are at one with ';
        }
        if (n < 75) {
            retStr = '<p class="text-info">Friends assume you\'ll gladly take more ';
        }
        if (n < 55) {
            retStr = '<p class="text-info">You have a reputation on indulging on ';
        }
        if (n < 35) {
            retStr = '<p class="text-success">You are very keen on ';
        }
        if (n < 25) {
            retStr = '<p class="text-success">You kind of like ';
        }
        if (n < 15) {
            retStr = '<p class="text-muted">You do not have much of an opinion on ';
        }
        return retStr;
    }

    function displayDrugPreferences(d) {
        var msg = '';
        msg += drugRange(d.alcohol.addiction) + "<u><b>alcohol</b></u>.</p>";
        msg += drugRange(d.marijuanna.addiction) + "<u><b>marijuanna</b></u>.</p>";
        msg += drugRange(d.lsd.addiction) + "<u><b>lsd</b></u>.</p>";
        msg += drugRange(d.herion.addiction) + "<u><b>herion</b></u>.</p>";

        bootbox.alert({
            size: 'large',
            message: msg
        });
    }


    // Return public interface
    return {
        name: function(fn) {
            getName(fn);
        },
        tour: function() {},
        drugPreferences: function(d) {
            displayDrugPreferences(d);
        },
        clear: function() {
            return true;
        }
    }; // end return of public object

};

},{}],4:[function(require,module,exports){
module.exports = function() {
    // Requires Bootbox.js
    var rot13 = require('./rot13.js');

    // Private vars
    var impaired = false;
    var drugid = 0;
    var drugs = [
        'lsd',
        'lsd',
        'alcohol',
        'alcohol',
        'alcohol',
        'alcohol',
        'marijuanna',
        'marijuanna',
        'marijuanna',
        'herion'
    ];
    var pushers = [
        'bassist',
        'drummer',
        'guitarist',
        'flat mate',
        'mother',
        'landlord',
        'hair dresser',
        'pizza delivery driver',
        'bartender',
        'friend the aspiring \"actor\"'
    ];
    var locations = [
        'the supermarket',
        'the rave',
        'the romance section at the local library',
        'the alley behind that taco bell you tell everyone you\'d never eat at',
        'the bowling alley you go to ironically',
        'the train station',
        'the rest area where they caught that one dude doing that one thing',
        'the bar',
        'the party',
        'the Bar Mitzvah for that one kid of your cousin\'s that you only see once every few years',
        'the wedding of your Ex'
    ];



    function makeOffer(drug, impInd, drugFn, impairFn, mutexFn) {
        var msg = "Your " + pushers[drugid++ % pushers.length] + " offers you some " + drug + " at " + locations[drugid % locations.length] + ".";
        if (impInd) {
            msg = rot13(msg);
        }

        function impairmentTicks(drug) {
            var retval = 0;
            if (drug == "lsd") {
                retval = 6;
            }
            if (drug == "alcohol") {
                retval = 0;
            }
            if (drug == "marijuanna") {
                retval = 0;
            }
            if (drug == "herion") {
                retval = 16;
            }
            return retval;
        };


        var takeit = {
            label: "Yes Please",
            className: "btn-success",
            callback: function() {
                drugFn(drug, true);
                mutexFn(false);
                impairFn(impairmentTicks(drug))
            }
        };
        var denyit = {
            label: "Get Bent",
            className: "btn-danger",
            callback: function() {
                drugFn(drug, impInd); // If impaired, this is true too.   oops! :)
                mutexFn(false);
            }
        };

        bootbox.dialog({
            message: msg,
            title: "Drugs!",
            closeButton: false,
            size: 'small',
            buttons: {
                positive: takeit,
                negative: denyit
            } // buttons
        });
    }


    // Return public interface
    return {
        drugName: function(i) {
            return drugs[(i % drugs.length)];
        },
        impair: function(b) {
            impaired = !!b;
        },
        offer: function(drug, imp, drugFn, impairFn, mutexFn) {
            makeOffer(drug, imp, drugFn, impairFn, mutexFn);
        },
        clear: function() {
            pushers.shuffle();
            locations.shuffle();
            drugs.shuffle();
            return true;
        }
    }; // end return of public object

};

},{"./rot13.js":9}],5:[function(require,module,exports){
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

},{"./About.js":1,"./Band.js":2,"./BandPrompt.js":3,"./DrugPrompt.js":4,"./Grapevine.js":6,"./WGO.js":7}],6:[function(require,module,exports){
module.exports = function() {

    // Private vars
    var impaired = false;
    var maxitems = 12;
    var mastercount = 0;
    var items = []; // Line items in 
    var random = require('./random.js');
    var rot13 = require('./rot13.js');

    var classtypes = [
        "text-muted",
        "text-primary",
        "text-warning",
        "text-primary",
        "text-info",
        "text-warning",
        "text-danger",
        "text-success",
        "text-warning",
        "text-primary",
        "text-warning",
        "text-info",
        "text-danger",
        "text-success",
        "text-info"
    ];


    var artists = [
        "The Bing Bangs",
        "Modern Shoe",
        "Team Gordon",
        "Cory Doctorow",
        "Kurt (not that one the other one)",
        "My Underwear",
        "Internal Issues",
        "Cat Video Club",
        "Navi is my Spirit Guide",
        "Blue Chicken Nugget",
        "Yarn Pornography",
        "6 cylinder Makeup",
        "The Burlap Peanut",
        "Tequila Mockingbird",
        "Anarkey in the Library",
        "Brother Tshober",
        "Frumpy Breast And The Shack",
        "Chief President",
        "Twin Stranger",
        "Doubt Of Paradise",
        "Massive Logistic",
        "Republican Furry",
        "Galaxy Of The Intimate Walk",
        "Delectable Ignite",
        "Vertigo Of The Object",
        "Caution Armada",
        "Styro Absence",
        "After Bush",
        "Yukon Success",
        "Butt-ugly Paper",
        "Entitled Odds Of The Sling Lick",
        "Pink Mist",
        "Butt Seriously",
        "The Disra Misty Band",
        "Dixie & the Ninjas",
        "Yet Another Mass Extinction Event",
        "The Power Chord Hotshots",
        "Donner Dinner Party",
        "Teen Angst",
        "Aggressive Pacifism",
        "My Chemical Bromance",
        "The Nickleback Tribute Band",
        "Hamburger Evangelism"
    ];

    var songtitles = [
        "This is a Tune",
        "Yodels make me happy",
        "It's a will roll dammit",
        "I like popcorn",
        "My Electrician Made me Sad",
        "RNG in Hearthstone FTW",
        "My third belly button",
        "Watching YouTube at Work",
        "The Triforce is pointy",
        "They grow from spells",
        "I played a mage and I liked it",
        "I still play old games",
        "Java aint javascript",
        "50 reasons why Java is a fad",
        "The best part of me is left handed",
        "It takes a few years to listen to my playlist",
        "Tangential Cold",
        "Throwing a quarter and wishing you well",
        "My google calendar is ridiculous",
        "Remember when people lined up to buy Windows 95?  Crazy!",
        "Richard Stallman was my babysitter",
        "Looking to Train?",
        "You do not have the proper stone",
        "I am not ready",
        "Buggy video games.  What's up with that?",
        "Is Call of Duty still a thing?",
        "I have a million balls and I am the size of a peanut",
        "Because you know the baby",
        "Courtship Is Everything",
        "Can't Stop The Firecracker",
        "Holy Democracy",
        "Friends With Synchronisation",
        "Raw Stash",
        "Supernatural Time",
        "Don't Stop The Devil",
        "Helluva Shopping",
        "The All American Girl",
        "Classic Guitar",
        "Outrageous Axe",
        "Uncontrollable Criminal",
        "Hotshot Rainbow",
        "Vladimir Putin is a God",
        "Crying Japanese Politician"
    ];

    // ---------------------- Some private methods ----------------------------------
    // This function returns 'true' if the case was not solvable 
    function formatLine(obj) {
        var retval;
        if (impaired) {
            switch (random(4)) {
                case 0:
                    retval = "<p class=\"" + obj.classtype + " lead\">" + rot13(obj.str) + "</p>";
                    break;
                case 1:
                    retval = "<p class=\"" + obj.classtype + "\"><mark>" + rot13(obj.str) + "</mark></p>";
                    break;
                case 2:
                    retval = "<p class=\"" + obj.classtype + "\"><del>" + rot13(obj.str) + "</del></p>";
                    break;
                case 3:
                    retval = "<p class=\"" + obj.classtype + "\"><s>" + rot13(obj.str) + "</s></p>";
                    break;
                default:
                    retval = "<p class=\"" + obj.classtype + "\">" + rot13(obj.str) + "</p>";
                    break;

            }
        } else {
            retval = "<p class=\"" + obj.classtype + "\">" + obj.str + "</p>";
        }
        return retval;
    }

    function createItem(str) {
        mastercount++;
        var ct = classtypes[mastercount % classtypes.length];
        var retval = {
            'classtype': ct,
            'str': str
        };
        return retval;
    }


    // Return public interface
    return {
        impair: function(b) {
            impaired = !!b;
        },
        otherSong: function() {
            var artist_index = mastercount % artists.length;
            var song_index = mastercount % songtitles.length;
            var release_notice = "New single released by '" + artists[artist_index] + "' called '" + songtitles[song_index] + "'";
            return this.addItem(release_notice);
        },
        addItem: function(str) {
            items.push(createItem(str));
            if (items.length > maxitems) {
                items.shift();
            }
            return true;
        },
        refresh: function() {
            var htmlstr = "";
            var i = 0;
            for (; i < items.length; i++) {
                htmlstr = htmlstr.concat(formatLine(items[i]));
            }
            $("#ssglobal").html(htmlstr);
            return true;
        },
        clear: function() {
            items = [];
            artists.shuffle();
            songtitles.shuffle();
            this.refresh();
            return true;
        }
    }; // end return of public object

};

},{"./random.js":8,"./rot13.js":9}],7:[function(require,module,exports){
module.exports = function() {

    // Private vars
    var impaired = false;
    var maxitems = 12;
    var mastercount = 0;
    var items = []; // Line items in 
    var random = require('./random.js');
    var rot13 = require('./rot13.js');

    var classtypes = [
        "text-muted",
        "text-primary",
        "text-warning",
        "text-primary",
        "text-info",
        "text-warning",
        "text-danger",
        "text-success",
        "text-warning",
        "text-primary",
        "text-warning",
        "text-info",
        "text-danger",
        "text-success",
        "text-info"
    ];
    // ---------------------- Some private methods ----------------------------------
    // This function returns 'true' if the case was not solvable 
    function formatLine(obj) {
        var retval;
        if (impaired) {
            switch (random(4)) {
                case 0:
                    retval = "<p class=\"" + obj.classtype + " lead\">" + rot13(obj.str) + "</p>";
                    break;
                case 1:
                    retval = "<p class=\"" + obj.classtype + "\"><mark>" + rot13(obj.str) + "</mark></p>";
                    break;
                case 2:
                    retval = "<p class=\"" + obj.classtype + "\"><del>" + rot13(obj.str) + "</del></p>";
                    break;
                case 3:
                    retval = "<p class=\"" + obj.classtype + "\"><s>" + rot13(obj.str) + "</s></p>";
                    break;
                default:
                    retval = "<p class=\"" + obj.classtype + "\">" + rot13(obj.str) + "</p>";
                    break;

            }
        } else {
            retval = "<p class=\"" + obj.classtype + "\">" + obj.str + "</p>";
        }
        return retval;
    }

    function createItem(str) {
        mastercount++;
        var ct = classtypes[mastercount % classtypes.length];
        var retval = {
            'classtype': ct,
            'str': str
        };
        return retval;
    }

    // Return public interface
    return {
        impair: function(b) {
            impaired = !!b;
        },
        addItem: function(str) {
            items.push(createItem(str));
            if (items.length > maxitems) {
                items.shift();
            }
            return true;
        },
        refresh: function() {
            var htmlstr = "";
            var i = 0;
            for (; i < items.length; i++) {
                htmlstr = htmlstr.concat(formatLine(items[i]));
            }
            $("#sslocal").html(htmlstr);
            return htmlstr;
        },
        clear: function() {
            items = [];
            this.refresh();
            return true;
        }
    }; // end return of public object
};

},{"./random.js":8,"./rot13.js":9}],8:[function(require,module,exports){
module.exports = function(target) {
    return Math.floor(Math.random() * target);
};

},{}],9:[function(require,module,exports){
module.exports = function(s) {
    return s.replace(/[A-Za-z]/g, function(c) {
        return "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz".charAt(
            "NOPQRSTUVWXYZABCDEFGHIJKLMnopqrstuvwxyzabcdefghijklm".indexOf(c)
        );
    });
};

},{}],10:[function(require,module,exports){
// stonesun.js
var GameManager = require('./GameManager.js')();

var passtime = function() {
    GameManager.incDate();
    setTimeout(passtime, 3000);
}

// Add shuffle function to all array objects
Array.prototype.shuffle = function() {
    for (var rnd, tmp, i = this.length; i; rnd = parseInt(Math.random() * i), tmp = this[--i], this[i] = this[rnd], this[rnd] = tmp);
};


/* Define a 'console' object for IE */
if (typeof console !== 'object') {
    console = {
        log: function() {},
        debug: function() {},
        info: function() {},
        warn: function() {},
        error: function() {},
        assert: function() {},
        clear: function() {},
        dir: function() {},
        dirxml: function() {},
        trace: function() {},
        group: function() {},
        groupCollapsed: function() {},
        groupEnd: function() {},
        time: function() {},
        timeEnd: function() {},
        profile: function() {},
        profileEnd: function() {},
        count: function() {},
        exception: function() {},
        table: function() {}
    };
}

$(window).load(GameManager.init);
setTimeout(passtime, 3000);

},{"./GameManager.js":5}]},{},[10])
//# sourceMappingURL=data:application/json;charset:utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL2hvbWUvbjYyMDkxMS9vcHQvbGliL25vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJhcHAvQWJvdXQuanMiLCJhcHAvQmFuZC5qcyIsImFwcC9CYW5kUHJvbXB0LmpzIiwiYXBwL0RydWdQcm9tcHQuanMiLCJhcHAvR2FtZU1hbmFnZXIuanMiLCJhcHAvR3JhcGV2aW5lLmpzIiwiYXBwL1dHTy5qcyIsImFwcC9yYW5kb20uanMiLCJhcHAvcm90MTMuanMiLCJhcHAvc3RvbmVzdW4uanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUNBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzlDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNwUkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUMvRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzFIQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzVIQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUN0TUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUM5RkE7QUFDQTtBQUNBO0FBQ0E7O0FDSEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNQQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIGUodCxuLHIpe2Z1bmN0aW9uIHMobyx1KXtpZighbltvXSl7aWYoIXRbb10pe3ZhciBhPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7aWYoIXUmJmEpcmV0dXJuIGEobywhMCk7aWYoaSlyZXR1cm4gaShvLCEwKTt2YXIgZj1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK28rXCInXCIpO3Rocm93IGYuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixmfXZhciBsPW5bb109e2V4cG9ydHM6e319O3Rbb11bMF0uY2FsbChsLmV4cG9ydHMsZnVuY3Rpb24oZSl7dmFyIG49dFtvXVsxXVtlXTtyZXR1cm4gcyhuP246ZSl9LGwsbC5leHBvcnRzLGUsdCxuLHIpfXJldHVybiBuW29dLmV4cG9ydHN9dmFyIGk9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtmb3IodmFyIG89MDtvPHIubGVuZ3RoO28rKylzKHJbb10pO3JldHVybiBzfSkiLCJtb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKCkge1xuICAgIC8vIFJlcXVpcmVzIEJvb3Rib3guanNcbiAgICBib290Ym94LmFkZExvY2FsZShcInJvY2tcIiwge1xuICAgICAgICBPSzogJ1JvY2snLFxuICAgICAgICBDQU5DRUw6ICdCdWdnZXIgT2ZmJyxcbiAgICAgICAgQ09ORklSTTogJ0FscmlnaHR5IFRoZW4nXG4gICAgfSk7XG4gICAgYm9vdGJveC5zZXRMb2NhbGUoXCJyb2NrXCIpO1xuXG4gICAgLy8gUHJpdmF0ZSB2YXJzXG4gICAgZnVuY3Rpb24gZGlzcGxheVNwbGFzaCgpIHtcbiAgICAgICAgdmFyIGFib3V0ID0gJzxwPlRoaXMgZ2FtZSBpcyBiYXNlZCBoZWF2aWx5IG9uIGFuIG9sZCBET1MgY29tcHV0ZXIgZ2FtZSBjYWxsZWQgXCJSb2NrIFN0YXJcIi48L3A+JztcbiAgICAgICAgYWJvdXQgKz0gJzxwPkkgaGFkIHNvIG11Y2ggZnVuIHBsYXlpbmcgd2l0aCB0aGUgZ2FtZSBpbiB0aGUgZWFybHkgOTBzIHRoYXQgSSBkZWNpZGVkIHRoYXQgSSBkaWRuXFwndCB3YW50IHRvIGJlIHdpdGhvdXQgaXQgYW55IG1vcmUuPC9wPic7XG4gICAgICAgIGFib3V0ICs9ICc8cD5UaGFua3MgdG8gdGhlIGZvbGtzIGluIGNoaXphdCBmb3IgdGhlIGVuY291cmFnZW1lbnQgYW5kIHRoZSBjcm93ZHNvdXJjaW5nIG9mIGFydGlzdHMgYW5kIHRyYWNrIHRpdGxlcy48L3A+JztcbiAgICAgICAgYWJvdXQgKz0gJzxwPk15IG5hbWUgaXMgPGEgaHJlZj1cImh0dHA6Ly90YW5nZW50aWFsY29sZC5jb21cIj5LdXJ0IFNjaHdpbmQ8L2E+IGFuZCBJIGFwcHJvdmUgdGhpcyBtZXNzYWdlLjwvcD4nO1xuXG5cbiAgICAgICAgYm9vdGJveC5hbGVydCh7XG4gICAgICAgICAgICBzaXplOiAnbGFyZ2UnLFxuICAgICAgICAgICAgdGl0bGU6ICdBYm91dCcsXG4gICAgICAgICAgICBtZXNzYWdlOiBhYm91dFxuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBkaXNwbGF5SG93VG9QbGF5KCkge1xuICAgICAgICB2YXIgbXNnID0gJ1lvdSBhcmUgYSBidWRkaW5nIFJvY2sgbiBSb2xsIHN0YXIhICBOYXZpZ2F0ZSB5b3VyIGxpZmUgY2hvaWNlcyBhbmQgc2VlIGlmIGZhbWUgYW5kIGZvcnR1bmUgYXdhaXQhJztcblxuICAgICAgICBib290Ym94LmFsZXJ0KHtcbiAgICAgICAgICAgIHNpemU6ICdsYXJnZScsXG4gICAgICAgICAgICB0aXRsZTogJ0hvdyBUbyBQbGF5JyxcbiAgICAgICAgICAgIG1lc3NhZ2U6IG1zZ1xuICAgICAgICB9KTtcbiAgICB9XG5cblxuICAgIC8vIFJldHVybiBwdWJsaWMgaW50ZXJmYWNlXG4gICAgcmV0dXJuIHtcbiAgICAgICAgc2hvd1NwbGFzaDogZnVuY3Rpb24oZm4pIHtcbiAgICAgICAgICAgIGRpc3BsYXlTcGxhc2goKTtcbiAgICAgICAgfSxcbiAgICAgICAgaG93VG9QbGF5OiBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIGRpc3BsYXlIb3dUb1BsYXkoKTtcbiAgICAgICAgfVxuICAgIH07IC8vIGVuZCByZXR1cm4gb2YgcHVibGljIG9iamVjdFxuXG59O1xuIiwibW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbigpIHtcblxuICAgIC8vIFByaXZhdGUgdmFyc1xuICAgIHZhciBiYW5kbmFtZSA9IFwiQWJqdXJlciBOb3doZXJlXCI7XG4gICAgdmFyIG1hc3RlcmlkID0gMDsgLy8gSnVzdCBhIHVuaXF1ZSBrZXlcbiAgICB2YXIgaW1wYWlyZWQgPSBmYWxzZTtcbiAgICB2YXIgcm90MTMgPSByZXF1aXJlKCcuL3JvdDEzLmpzJyk7XG5cbiAgICAvLyBwZXJzb25hbFxuICAgIHZhciBoZWFsdGggPSAwO1xuICAgIHZhciBjcmVhdGl2aXR5ID0gMDtcbiAgICB2YXIgaGFwcGluZXNzID0gMDtcbiAgICB2YXIgYWxlcnRuZXNzID0gMDtcblxuICAgIC8vIHRpbWVcbiAgICB2YXIgZGF5Y291bnQgPSAxO1xuICAgIHZhciBkb3cgPSBbXG4gICAgICAgIFwiU3VuZGF5XCIsXG4gICAgICAgIFwiTW9uZGF5XCIsXG4gICAgICAgIFwiVHVlc2RheVwiLFxuICAgICAgICBcIldlZG5lc2RheVwiLFxuICAgICAgICBcIlRodXJzZGF5XCIsXG4gICAgICAgIFwiRnJpZGF5XCIsXG4gICAgICAgIFwiU2F0dXJkYXlcIlxuICAgIF07XG5cbiAgICAvLyBwb3B1bGFyaXR5XG4gICAgdmFyIGxvY2FscCA9IDA7XG4gICAgdmFyIG5hdGlvbmFscCA9IDA7XG4gICAgdmFyIGdsb2JhbHAgPSAwO1xuXG4gICAgLy8gQWxsIHZhbHVlcyBhcmUgaW4gdGhlIGFmZmlybWF0aXZlLlxuICAgIC8vIFRoYXQgaXMsIHRoZXNlIGFyZSBhZGRlZCB3aGVuIGRydWcgaXMgdGFrZW4uXG4gICAgdmFyIGRydWdzID0ge1xuICAgICAgICBcImxzZFwiOiB7XG4gICAgICAgICAgICBcImFkZGljdGlvblwiOiAwLFxuICAgICAgICAgICAgXCJmYWN0b3JzXCI6IHtcbiAgICAgICAgICAgICAgICBcImFkZGljdGlvblwiOiAxLFxuICAgICAgICAgICAgICAgIFwiaGVhbHRoXCI6IC0yLFxuICAgICAgICAgICAgICAgIFwiY3JlYXRpdml0eVwiOiAxMCxcbiAgICAgICAgICAgICAgICBcImhhcHBpbmVzc1wiOiAzLFxuICAgICAgICAgICAgICAgIFwiYWxlcnRuZXNzXCI6IC01XG4gICAgICAgICAgICB9XG4gICAgICAgIH0sXG4gICAgICAgIFwiYWxjb2hvbFwiOiB7XG4gICAgICAgICAgICBcImFkZGljdGlvblwiOiAwLFxuICAgICAgICAgICAgXCJmYWN0b3JzXCI6IHtcbiAgICAgICAgICAgICAgICBcImFkZGljdGlvblwiOiA1LFxuICAgICAgICAgICAgICAgIFwiaGVhbHRoXCI6IC0zLFxuICAgICAgICAgICAgICAgIFwiY3JlYXRpdml0eVwiOiAyLFxuICAgICAgICAgICAgICAgIFwiaGFwcGluZXNzXCI6IDUsXG4gICAgICAgICAgICAgICAgXCJhbGVydG5lc3NcIjogLTEwXG4gICAgICAgICAgICB9XG4gICAgICAgIH0sXG4gICAgICAgIFwibWFyaWp1YW5uYVwiOiB7XG4gICAgICAgICAgICBcImFkZGljdGlvblwiOiAwLFxuICAgICAgICAgICAgXCJmYWN0b3JzXCI6IHtcbiAgICAgICAgICAgICAgICBcImFkZGljdGlvblwiOiAzLFxuICAgICAgICAgICAgICAgIFwiaGVhbHRoXCI6IC0yLFxuICAgICAgICAgICAgICAgIFwiY3JlYXRpdml0eVwiOiAzLFxuICAgICAgICAgICAgICAgIFwiaGFwcGluZXNzXCI6IDcsXG4gICAgICAgICAgICAgICAgXCJhbGVydG5lc3NcIjogLTExXG4gICAgICAgICAgICB9XG4gICAgICAgIH0sXG4gICAgICAgIFwiaGVyaW9uXCI6IHtcbiAgICAgICAgICAgIFwiYWRkaWN0aW9uXCI6IDAsXG4gICAgICAgICAgICBcImZhY3RvcnNcIjoge1xuICAgICAgICAgICAgICAgIFwiYWRkaWN0aW9uXCI6IDEwLFxuICAgICAgICAgICAgICAgIFwiaGVhbHRoXCI6IC05LFxuICAgICAgICAgICAgICAgIFwiY3JlYXRpdml0eVwiOiAxMCxcbiAgICAgICAgICAgICAgICBcImhhcHBpbmVzc1wiOiAwLFxuICAgICAgICAgICAgICAgIFwiYWxlcnRuZXNzXCI6IC0xMlxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfTtcblxuXG4gICAgdmFyIHNpbmdsZXMgPSBbXTsgLy8gTGluZSBpdGVtcyBpbiBcbiAgICB2YXIgdG91cnMgPSBbXTtcblxuICAgIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0gU29tZSBwcml2YXRlIG1ldGhvZHMgLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICAgIC8vIFRoaXMgZnVuY3Rpb24gcmV0dXJucyAndHJ1ZScgaWYgdGhlIGNhc2Ugd2FzIG5vdCBzb2x2YWJsZSBcbiAgICBmdW5jdGlvbiBhZGRTaW5nbGUobmFtZSkge1xuICAgICAgICB2YXIgcmV0dmFsID0ge1xuICAgICAgICAgICAgJ2lkJzogbWFzdGVyaWQrKyxcbiAgICAgICAgICAgICduYW1lJzogbmFtZSxcbiAgICAgICAgICAgICdscG9wJzogMCxcbiAgICAgICAgICAgICducG9wJzogMCxcbiAgICAgICAgICAgICdncG9wJzogMFxuICAgICAgICB9O1xuICAgICAgICBzaW5nbGVzLnB1c2gocmV0dmFsKTtcbiAgICAgICAgcmV0dXJuIHJldHZhbDtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBpbml0KCkge1xuICAgICAgICBsb2NhbHAgPSBuYXRpb25hbHAgPSBnbG9iYWxwID0gMDtcbiAgICAgICAgaGFwcGluZXNzID0gYWxlcnRuZXNzID0gY3JlYXRpdml0eSA9IDUwO1xuICAgICAgICBoZWFsdGggPSA4MDtcbiAgICAgICAgZGF5Y291bnQgPSAxO1xuICAgICAgICBzY29yZSA9IDA7XG4gICAgICAgIHJlZnJlc2hQZXJzb25hbCgpO1xuICAgICAgICByZWZyZXNoUG9wdWxhcml0eSgpO1xuICAgICAgICBkcnVncy5sc2QuYWRkaWN0aW9uID0gMDtcbiAgICAgICAgZHJ1Z3MuYWxjb2hvbC5hZGRpY3Rpb24gPSAwO1xuICAgICAgICBkcnVncy5tYXJpanVhbm5hLmFkZGljdGlvbiA9IDA7XG4gICAgICAgIGRydWdzLmhlcmlvbi5hZGRpY3Rpb24gPSAwO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIHJlZnJlc2hQZXJzb25hbCgpIHtcbiAgICAgICAgJChcIiNwbGF5ZXJfaGVhbHRoXCIpLmh0bWwoaGVhbHRoKTtcbiAgICAgICAgJChcIiNwbGF5ZXJfY3JlYXRpdml0eVwiKS5odG1sKGNyZWF0aXZpdHkpO1xuICAgICAgICAkKFwiI3BsYXllcl9oYXBwaW5lc3NcIikuaHRtbChoYXBwaW5lc3MpO1xuICAgICAgICAkKFwiI3BsYXllcl9hbGVydG5lc3NcIikuaHRtbChhbGVydG5lc3MpO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIHJlZnJlc2hQb3B1bGFyaXR5KCkge1xuICAgICAgICAkKFwiI2xvY2FsX3BvcFwiKS5odG1sKGxvY2FscCk7XG4gICAgICAgICQoXCIjbmF0aW9uYWxfcG9wXCIpLmh0bWwobmF0aW9uYWxwKTtcbiAgICAgICAgJChcIiNnbG9iYWxfcG9wXCIpLmh0bWwoZ2xvYmFscCk7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gcmVmcmVzaE5hbWUoKSB7XG4gICAgICAgIGlmIChpbXBhaXJlZCkge1xuICAgICAgICAgICAgJChcIiNiYW5kbmFtZVwiKS5odG1sKHJvdDEzKGJhbmRuYW1lKSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAkKFwiI2JhbmRuYW1lXCIpLmh0bWwoYmFuZG5hbWUpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gZmxhdm9yUG9wKHBvcCwgbG9jKSB7XG4gICAgICAgIHZhciByZXR2YWwgPSBcIlwiO1xuICAgICAgICBpZiAocG9wID4gODUpIHtcbiAgICAgICAgICAgIHJldHZhbCA9IFwid29yc2hpcHBlZCBhcyB0aGUgcm9jayBkaWV0eSB0aGF0IHlvdSBhcmUhXCI7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHBvcCA8IDg2KSB7XG4gICAgICAgICAgICByZXR2YWwgPSBcImtub3duIHRvIGV2ZW4gY2FzdWFsIGZhbnNcIjtcbiAgICAgICAgfVxuICAgICAgICBpZiAocG9wIDwgNjUpIHtcbiAgICAgICAgICAgIHJldHZhbCA9IFwiZ2V0dGluZyB5b3VyIG11c2ljIHBpcmF0ZWQgYnkgc2NvcmVzIG9mIHlvdXRoXCI7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHBvcCA8IDQ1KSB7XG4gICAgICAgICAgICByZXR2YWwgPSBcImdldHRpbmcgc29tZSBhaXItcGxheSBvbiByYWRpbyBzdGF0aW9ucy5cIjtcbiAgICAgICAgfVxuICAgICAgICBpZiAocG9wIDwgMjUpIHtcbiAgICAgICAgICAgIHJldHZhbCA9IFwia25vd24gdG8gYSBmZXcgZGllLWhhcmQgZmFucy5cIjtcbiAgICAgICAgfVxuICAgICAgICBpZiAocG9wIDwgMTYpIHtcbiAgICAgICAgICAgIHJldHZhbCA9IFwidmlydHVhbGx5IHVua25vd24uXCI7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dmFsID0gXCI8ZW0+QXQgdGhlIFwiICsgbG9jICsgXCIgbGV2ZWwgeW91IGFyZSBcIiArIHJldHZhbCArIFwiPC9lbT5cIjtcbiAgICAgICAgcmV0dXJuIHJldHZhbDtcblxuICAgIH1cblxuXG4gICAgLy8gUmV0dXJuIHB1YmxpYyBpbnRlcmZhY2VcbiAgICByZXR1cm4ge1xuICAgICAgICBzZXROYW1lOiBmdW5jdGlvbihzdHIpIHtcbiAgICAgICAgICAgIGlmICgoc3RyID09IG51bGwpIHx8IChzdHIudHJpbSgpICE9PSBcIlwiKSkge1xuICAgICAgICAgICAgICAgIGJhbmRuYW1lID0gc3RyO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgJChcIiNiYW5kbmFtZVwiKS5odG1sKGJhbmRuYW1lKTtcbiAgICAgICAgfSxcbiAgICAgICAgaW1wYWlyOiBmdW5jdGlvbihiKSB7XG4gICAgICAgICAgICBpbXBhaXJlZCA9ICEhYjtcbiAgICAgICAgfSxcbiAgICAgICAgcmVmcmVzaDogZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICByZWZyZXNoUGVyc29uYWwoKTtcbiAgICAgICAgICAgIHJlZnJlc2hQb3B1bGFyaXR5KCk7XG4gICAgICAgICAgICByZWZyZXNoTmFtZSgpO1xuICAgICAgICB9LFxuICAgICAgICBkcnVnb2ZmZXI6IGZ1bmN0aW9uKGRydWduYW1lLCB0YWtlbikge1xuICAgICAgICAgICAgc3dpdGNoIChkcnVnbmFtZSkge1xuICAgICAgICAgICAgICAgIGNhc2UgXCJsc2RcIjpcbiAgICAgICAgICAgICAgICAgICAgaWYgKHRha2VuKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBoYXBwaW5lc3MgKz0gZHJ1Z3MubHNkLmZhY3RvcnMuaGFwcGluZXNzO1xuICAgICAgICAgICAgICAgICAgICAgICAgYWxlcnRuZXNzICs9IGRydWdzLmxzZC5mYWN0b3JzLmFsZXJ0bmVzcztcbiAgICAgICAgICAgICAgICAgICAgICAgIGNyZWF0aXZpdHkgKz0gZHJ1Z3MubHNkLmZhY3RvcnMuY3JlYXRpdml0eTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGhlYWx0aCArPSBkcnVncy5sc2QuZmFjdG9ycy5oZWFsdGg7XG4gICAgICAgICAgICAgICAgICAgICAgICBkcnVncy5sc2QuYWRkaWN0aW9uICs9IGRydWdzLmxzZC5mYWN0b3JzLmFkZGljdGlvbjtcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGhhcHBpbmVzcyAtPSBkcnVncy5sc2QuZmFjdG9ycy5oYXBwaW5lc3M7XG4gICAgICAgICAgICAgICAgICAgICAgICBhbGVydG5lc3MgLT0gZHJ1Z3MubHNkLmZhY3RvcnMuYWxlcnRuZXNzO1xuICAgICAgICAgICAgICAgICAgICAgICAgY3JlYXRpdml0eSAtPSBkcnVncy5sc2QuZmFjdG9ycy5jcmVhdGl2aXR5O1xuICAgICAgICAgICAgICAgICAgICAgICAgaGVhbHRoIC09IGRydWdzLmxzZC5mYWN0b3JzLmhlYWx0aDtcbiAgICAgICAgICAgICAgICAgICAgICAgIGRydWdzLmxzZC5hZGRpY3Rpb24gLT0gKGRydWdzLmxzZC5mYWN0b3JzLmFkZGljdGlvbiAvIDIpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIHJlZnJlc2hQZXJzb25hbCgpO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICBjYXNlIFwiYWxjb2hvbFwiOlxuICAgICAgICAgICAgICAgICAgICBpZiAodGFrZW4pIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGhhcHBpbmVzcyArPSBkcnVncy5hbGNvaG9sLmZhY3RvcnMuaGFwcGluZXNzO1xuICAgICAgICAgICAgICAgICAgICAgICAgYWxlcnRuZXNzICs9IGRydWdzLmFsY29ob2wuZmFjdG9ycy5hbGVydG5lc3M7XG4gICAgICAgICAgICAgICAgICAgICAgICBjcmVhdGl2aXR5ICs9IGRydWdzLmFsY29ob2wuZmFjdG9ycy5jcmVhdGl2aXR5O1xuICAgICAgICAgICAgICAgICAgICAgICAgaGVhbHRoICs9IGRydWdzLmFsY29ob2wuZmFjdG9ycy5oZWFsdGg7XG4gICAgICAgICAgICAgICAgICAgICAgICBkcnVncy5hbGNvaG9sLmFkZGljdGlvbiArPSBkcnVncy5hbGNvaG9sLmZhY3RvcnMuYWRkaWN0aW9uO1xuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgaGFwcGluZXNzIC09IGRydWdzLmFsY29ob2wuZmFjdG9ycy5oYXBwaW5lc3M7XG4gICAgICAgICAgICAgICAgICAgICAgICBhbGVydG5lc3MgLT0gZHJ1Z3MuYWxjb2hvbC5mYWN0b3JzLmFsZXJ0bmVzcztcbiAgICAgICAgICAgICAgICAgICAgICAgIGNyZWF0aXZpdHkgLT0gZHJ1Z3MuYWxjb2hvbC5mYWN0b3JzLmNyZWF0aXZpdHk7XG4gICAgICAgICAgICAgICAgICAgICAgICBoZWFsdGggLT0gZHJ1Z3MuYWxjb2hvbC5mYWN0b3JzLmhlYWx0aDtcbiAgICAgICAgICAgICAgICAgICAgICAgIGRydWdzLmFsY29ob2wuYWRkaWN0aW9uIC09IChkcnVncy5hbGNvaG9sLmZhY3RvcnMuYWRkaWN0aW9uIC8gMik7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgcmVmcmVzaFBlcnNvbmFsKCk7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIGNhc2UgXCJtYXJpanVhbm5hXCI6XG4gICAgICAgICAgICAgICAgICAgIGlmICh0YWtlbikge1xuICAgICAgICAgICAgICAgICAgICAgICAgaGFwcGluZXNzICs9IGRydWdzLm1hcmlqdWFubmEuZmFjdG9ycy5oYXBwaW5lc3M7XG4gICAgICAgICAgICAgICAgICAgICAgICBhbGVydG5lc3MgKz0gZHJ1Z3MubWFyaWp1YW5uYS5mYWN0b3JzLmFsZXJ0bmVzcztcbiAgICAgICAgICAgICAgICAgICAgICAgIGNyZWF0aXZpdHkgKz0gZHJ1Z3MubWFyaWp1YW5uYS5mYWN0b3JzLmNyZWF0aXZpdHk7XG4gICAgICAgICAgICAgICAgICAgICAgICBoZWFsdGggKz0gZHJ1Z3MubWFyaWp1YW5uYS5mYWN0b3JzLmhlYWx0aDtcbiAgICAgICAgICAgICAgICAgICAgICAgIGRydWdzLm1hcmlqdWFubmEuYWRkaWN0aW9uICs9IGRydWdzLm1hcmlqdWFubmEuZmFjdG9ycy5hZGRpY3Rpb247XG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBoYXBwaW5lc3MgLT0gZHJ1Z3MubWFyaWp1YW5uYS5mYWN0b3JzLmhhcHBpbmVzcztcbiAgICAgICAgICAgICAgICAgICAgICAgIGFsZXJ0bmVzcyAtPSBkcnVncy5tYXJpanVhbm5hLmZhY3RvcnMuYWxlcnRuZXNzO1xuICAgICAgICAgICAgICAgICAgICAgICAgY3JlYXRpdml0eSAtPSBkcnVncy5tYXJpanVhbm5hLmZhY3RvcnMuY3JlYXRpdml0eTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGhlYWx0aCAtPSBkcnVncy5tYXJpanVhbm5hLmZhY3RvcnMuaGVhbHRoO1xuICAgICAgICAgICAgICAgICAgICAgICAgZHJ1Z3MubWFyaWp1YW5uYS5hZGRpY3Rpb24gLT0gKGRydWdzLm1hcmlqdWFubmEuZmFjdG9ycy5hZGRpY3Rpb24gLyAyKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICByZWZyZXNoUGVyc29uYWwoKTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgY2FzZSBcImhlcmlvblwiOlxuICAgICAgICAgICAgICAgICAgICBpZiAodGFrZW4pIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGhhcHBpbmVzcyArPSBkcnVncy5oZXJpb24uZmFjdG9ycy5oYXBwaW5lc3M7XG4gICAgICAgICAgICAgICAgICAgICAgICBhbGVydG5lc3MgKz0gZHJ1Z3MuaGVyaW9uLmZhY3RvcnMuYWxlcnRuZXNzO1xuICAgICAgICAgICAgICAgICAgICAgICAgY3JlYXRpdml0eSArPSBkcnVncy5oZXJpb24uZmFjdG9ycy5jcmVhdGl2aXR5O1xuICAgICAgICAgICAgICAgICAgICAgICAgaGVhbHRoICs9IGRydWdzLmhlcmlvbi5mYWN0b3JzLmhlYWx0aDtcbiAgICAgICAgICAgICAgICAgICAgICAgIGRydWdzLmhlcmlvbi5hZGRpY3Rpb24gKz0gZHJ1Z3MuaGVyaW9uLmZhY3RvcnMuYWRkaWN0aW9uO1xuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgaGFwcGluZXNzIC09IGRydWdzLmhlcmlvbi5mYWN0b3JzLmhhcHBpbmVzcztcbiAgICAgICAgICAgICAgICAgICAgICAgIGFsZXJ0bmVzcyAtPSBkcnVncy5oZXJpb24uZmFjdG9ycy5hbGVydG5lc3M7XG4gICAgICAgICAgICAgICAgICAgICAgICBjcmVhdGl2aXR5IC09IGRydWdzLmhlcmlvbi5mYWN0b3JzLmNyZWF0aXZpdHk7XG4gICAgICAgICAgICAgICAgICAgICAgICBoZWFsdGggLT0gZHJ1Z3MuaGVyaW9uLmZhY3RvcnMuaGVhbHRoO1xuICAgICAgICAgICAgICAgICAgICAgICAgZHJ1Z3MuaGVyaW9uLmFkZGljdGlvbiAtPSAoZHJ1Z3MuaGVyaW9uLmZhY3RvcnMuYWRkaWN0aW9uIC8gMik7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgcmVmcmVzaFBlcnNvbmFsKCk7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiVW5rbm93biBkcnVnLHRha2VuIDogXCIgKyBkcnVnbmFtZSArIFwiICwgXCIgKyB0YWtlbik7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgfSxcbiAgICAgICAgcmVzdGFydDogZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICByZXR1cm4gaW5pdCgpO1xuICAgICAgICB9LFxuICAgICAgICBnZXREcnVnczogZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICByZXR1cm4gZHJ1Z3M7XG4gICAgICAgIH0sXG4gICAgICAgIGdldFBvcDogZnVuY3Rpb24ocG9wVHlwZSkge1xuICAgICAgICAgICAgdmFyIHJldHZhbCA9ICdObyBvbmUgY2FyZXMgYWJvdXQgeW91Lic7XG4gICAgICAgICAgICBpZiAocG9wVHlwZSA9PT0gXCJsb2NhbFwiKSB7XG4gICAgICAgICAgICAgICAgcmV0dmFsID0gZmxhdm9yUG9wKGxvY2FscCwgcG9wVHlwZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAocG9wVHlwZSA9PT0gXCJuYXRpb25hbFwiKSB7XG4gICAgICAgICAgICAgICAgcmV0dmFsID0gZmxhdm9yUG9wKG5hdGlvbmFscCwgcG9wVHlwZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAocG9wVHlwZSA9PT0gXCJnbG9iYWxcIikge1xuICAgICAgICAgICAgICAgIHJldHZhbCA9IGZsYXZvclBvcChnbG9iYWxwLCBwb3BUeXBlKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiByZXR2YWw7XG4gICAgICAgIH0sXG4gICAgICAgIGluY0RhdGU6IGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgZGF5Y291bnQrKztcbiAgICAgICAgICAgIHZhciB3ayA9IE1hdGguZmxvb3IoKGRheWNvdW50IC8gNykgKyAxKSAlIDUyO1xuICAgICAgICAgICAgdmFyIHlyID0gTWF0aC5mbG9vcigoZGF5Y291bnQgLyAzNjUpICsgMSk7XG4gICAgICAgICAgICAkKFwiI3RpbWVfZG93XCIpLmh0bWwoZG93W2RheWNvdW50ICUgN10pO1xuICAgICAgICAgICAgJChcIiN0aW1lX3llYXJcIikuaHRtbCh5cik7XG4gICAgICAgICAgICAkKFwiI3RpbWVfd2Vla1wiKS5odG1sKHdrKTtcbiAgICAgICAgICAgIHJldHVybiBkYXljb3VudDtcbiAgICAgICAgfSxcbiAgICAgICAgY2xlYXI6IGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgcmV0dXJuIGluaXQoKTtcbiAgICAgICAgfVxuICAgIH07IC8vIGVuZCByZXR1cm4gb2YgcHVibGljIG9iamVjdFxuXG59O1xuIiwibW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbigpIHtcbiAgICAvLyBSZXF1aXJlcyBCb290Ym94LmpzXG4gICAgYm9vdGJveC5hZGRMb2NhbGUoXCJyb2NrXCIsIHtcbiAgICAgICAgT0s6ICdSb2NrJyxcbiAgICAgICAgQ0FOQ0VMOiAnQnVnZ2VyIE9mZicsXG4gICAgICAgIENPTkZJUk06ICdBbHJpZ2h0eSBUaGVuJ1xuICAgIH0pO1xuICAgIGJvb3Rib3guc2V0TG9jYWxlKFwicm9ja1wiKTtcblxuICAgIC8vIFByaXZhdGUgdmFyc1xuXG4gICAgZnVuY3Rpb24gZ2V0TmFtZShuYW1lRm4pIHtcbiAgICAgICAgdmFyIG1zZyA9IFwiTmFtZSB5b3VyIGJhbmQgOiBcIjtcblxuXG4gICAgICAgIGJvb3Rib3gucHJvbXB0KHtcbiAgICAgICAgICAgIG1lc3NhZ2U6IG1zZyxcbiAgICAgICAgICAgIHRpdGxlOiBcIlJvY2sgbiBSb2xsIEZhbWUgQXdhaXQhXCIsXG4gICAgICAgICAgICBjbG9zZUJ1dHRvbjogZmFsc2UsXG4gICAgICAgICAgICBzaXplOiAnbWVkaXVtJyxcbiAgICAgICAgICAgIGNhbGxiYWNrOiBuYW1lRm5cbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gZHJ1Z1JhbmdlKG4pIHtcbiAgICAgICAgdmFyIHJldFN0ciA9ICcnO1xuICAgICAgICBpZiAobiA+IDg1KSB7XG4gICAgICAgICAgICByZXRTdHIgPSAnPHAgY2xhc3M9XCJ0ZXh0LWRhbmdlclwiPllvdSB3aWxsIGdsYWRseSBzaGl2IHlvdXIgb3duIG1vdGhlciBmb3Igc29tZSAnO1xuICAgICAgICB9XG4gICAgICAgIGlmIChuIDwgODUpIHtcbiAgICAgICAgICAgIHJldFN0ciA9ICc8cCBjbGFzcz1cInRleHQtd2FybmluZ1wiPllvdSBhcmUgYXQgb25lIHdpdGggJztcbiAgICAgICAgfVxuICAgICAgICBpZiAobiA8IDc1KSB7XG4gICAgICAgICAgICByZXRTdHIgPSAnPHAgY2xhc3M9XCJ0ZXh0LWluZm9cIj5GcmllbmRzIGFzc3VtZSB5b3VcXCdsbCBnbGFkbHkgdGFrZSBtb3JlICc7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKG4gPCA1NSkge1xuICAgICAgICAgICAgcmV0U3RyID0gJzxwIGNsYXNzPVwidGV4dC1pbmZvXCI+WW91IGhhdmUgYSByZXB1dGF0aW9uIG9uIGluZHVsZ2luZyBvbiAnO1xuICAgICAgICB9XG4gICAgICAgIGlmIChuIDwgMzUpIHtcbiAgICAgICAgICAgIHJldFN0ciA9ICc8cCBjbGFzcz1cInRleHQtc3VjY2Vzc1wiPllvdSBhcmUgdmVyeSBrZWVuIG9uICc7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKG4gPCAyNSkge1xuICAgICAgICAgICAgcmV0U3RyID0gJzxwIGNsYXNzPVwidGV4dC1zdWNjZXNzXCI+WW91IGtpbmQgb2YgbGlrZSAnO1xuICAgICAgICB9XG4gICAgICAgIGlmIChuIDwgMTUpIHtcbiAgICAgICAgICAgIHJldFN0ciA9ICc8cCBjbGFzcz1cInRleHQtbXV0ZWRcIj5Zb3UgZG8gbm90IGhhdmUgbXVjaCBvZiBhbiBvcGluaW9uIG9uICc7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHJldFN0cjtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBkaXNwbGF5RHJ1Z1ByZWZlcmVuY2VzKGQpIHtcbiAgICAgICAgdmFyIG1zZyA9ICcnO1xuICAgICAgICBtc2cgKz0gZHJ1Z1JhbmdlKGQuYWxjb2hvbC5hZGRpY3Rpb24pICsgXCI8dT48Yj5hbGNvaG9sPC9iPjwvdT4uPC9wPlwiO1xuICAgICAgICBtc2cgKz0gZHJ1Z1JhbmdlKGQubWFyaWp1YW5uYS5hZGRpY3Rpb24pICsgXCI8dT48Yj5tYXJpanVhbm5hPC9iPjwvdT4uPC9wPlwiO1xuICAgICAgICBtc2cgKz0gZHJ1Z1JhbmdlKGQubHNkLmFkZGljdGlvbikgKyBcIjx1PjxiPmxzZDwvYj48L3U+LjwvcD5cIjtcbiAgICAgICAgbXNnICs9IGRydWdSYW5nZShkLmhlcmlvbi5hZGRpY3Rpb24pICsgXCI8dT48Yj5oZXJpb248L2I+PC91Pi48L3A+XCI7XG5cbiAgICAgICAgYm9vdGJveC5hbGVydCh7XG4gICAgICAgICAgICBzaXplOiAnbGFyZ2UnLFxuICAgICAgICAgICAgbWVzc2FnZTogbXNnXG4gICAgICAgIH0pO1xuICAgIH1cblxuXG4gICAgLy8gUmV0dXJuIHB1YmxpYyBpbnRlcmZhY2VcbiAgICByZXR1cm4ge1xuICAgICAgICBuYW1lOiBmdW5jdGlvbihmbikge1xuICAgICAgICAgICAgZ2V0TmFtZShmbik7XG4gICAgICAgIH0sXG4gICAgICAgIHRvdXI6IGZ1bmN0aW9uKCkge30sXG4gICAgICAgIGRydWdQcmVmZXJlbmNlczogZnVuY3Rpb24oZCkge1xuICAgICAgICAgICAgZGlzcGxheURydWdQcmVmZXJlbmNlcyhkKTtcbiAgICAgICAgfSxcbiAgICAgICAgY2xlYXI6IGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgIH1cbiAgICB9OyAvLyBlbmQgcmV0dXJuIG9mIHB1YmxpYyBvYmplY3RcblxufTtcbiIsIm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24oKSB7XG4gICAgLy8gUmVxdWlyZXMgQm9vdGJveC5qc1xuICAgIHZhciByb3QxMyA9IHJlcXVpcmUoJy4vcm90MTMuanMnKTtcblxuICAgIC8vIFByaXZhdGUgdmFyc1xuICAgIHZhciBpbXBhaXJlZCA9IGZhbHNlO1xuICAgIHZhciBkcnVnaWQgPSAwO1xuICAgIHZhciBkcnVncyA9IFtcbiAgICAgICAgJ2xzZCcsXG4gICAgICAgICdsc2QnLFxuICAgICAgICAnYWxjb2hvbCcsXG4gICAgICAgICdhbGNvaG9sJyxcbiAgICAgICAgJ2FsY29ob2wnLFxuICAgICAgICAnYWxjb2hvbCcsXG4gICAgICAgICdtYXJpanVhbm5hJyxcbiAgICAgICAgJ21hcmlqdWFubmEnLFxuICAgICAgICAnbWFyaWp1YW5uYScsXG4gICAgICAgICdoZXJpb24nXG4gICAgXTtcbiAgICB2YXIgcHVzaGVycyA9IFtcbiAgICAgICAgJ2Jhc3Npc3QnLFxuICAgICAgICAnZHJ1bW1lcicsXG4gICAgICAgICdndWl0YXJpc3QnLFxuICAgICAgICAnZmxhdCBtYXRlJyxcbiAgICAgICAgJ21vdGhlcicsXG4gICAgICAgICdsYW5kbG9yZCcsXG4gICAgICAgICdoYWlyIGRyZXNzZXInLFxuICAgICAgICAncGl6emEgZGVsaXZlcnkgZHJpdmVyJyxcbiAgICAgICAgJ2JhcnRlbmRlcicsXG4gICAgICAgICdmcmllbmQgdGhlIGFzcGlyaW5nIFxcXCJhY3RvclxcXCInXG4gICAgXTtcbiAgICB2YXIgbG9jYXRpb25zID0gW1xuICAgICAgICAndGhlIHN1cGVybWFya2V0JyxcbiAgICAgICAgJ3RoZSByYXZlJyxcbiAgICAgICAgJ3RoZSByb21hbmNlIHNlY3Rpb24gYXQgdGhlIGxvY2FsIGxpYnJhcnknLFxuICAgICAgICAndGhlIGFsbGV5IGJlaGluZCB0aGF0IHRhY28gYmVsbCB5b3UgdGVsbCBldmVyeW9uZSB5b3VcXCdkIG5ldmVyIGVhdCBhdCcsXG4gICAgICAgICd0aGUgYm93bGluZyBhbGxleSB5b3UgZ28gdG8gaXJvbmljYWxseScsXG4gICAgICAgICd0aGUgdHJhaW4gc3RhdGlvbicsXG4gICAgICAgICd0aGUgcmVzdCBhcmVhIHdoZXJlIHRoZXkgY2F1Z2h0IHRoYXQgb25lIGR1ZGUgZG9pbmcgdGhhdCBvbmUgdGhpbmcnLFxuICAgICAgICAndGhlIGJhcicsXG4gICAgICAgICd0aGUgcGFydHknLFxuICAgICAgICAndGhlIEJhciBNaXR6dmFoIGZvciB0aGF0IG9uZSBraWQgb2YgeW91ciBjb3VzaW5cXCdzIHRoYXQgeW91IG9ubHkgc2VlIG9uY2UgZXZlcnkgZmV3IHllYXJzJyxcbiAgICAgICAgJ3RoZSB3ZWRkaW5nIG9mIHlvdXIgRXgnXG4gICAgXTtcblxuXG5cbiAgICBmdW5jdGlvbiBtYWtlT2ZmZXIoZHJ1ZywgaW1wSW5kLCBkcnVnRm4sIGltcGFpckZuLCBtdXRleEZuKSB7XG4gICAgICAgIHZhciBtc2cgPSBcIllvdXIgXCIgKyBwdXNoZXJzW2RydWdpZCsrICUgcHVzaGVycy5sZW5ndGhdICsgXCIgb2ZmZXJzIHlvdSBzb21lIFwiICsgZHJ1ZyArIFwiIGF0IFwiICsgbG9jYXRpb25zW2RydWdpZCAlIGxvY2F0aW9ucy5sZW5ndGhdICsgXCIuXCI7XG4gICAgICAgIGlmIChpbXBJbmQpIHtcbiAgICAgICAgICAgIG1zZyA9IHJvdDEzKG1zZyk7XG4gICAgICAgIH1cblxuICAgICAgICBmdW5jdGlvbiBpbXBhaXJtZW50VGlja3MoZHJ1Zykge1xuICAgICAgICAgICAgdmFyIHJldHZhbCA9IDA7XG4gICAgICAgICAgICBpZiAoZHJ1ZyA9PSBcImxzZFwiKSB7XG4gICAgICAgICAgICAgICAgcmV0dmFsID0gNjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmIChkcnVnID09IFwiYWxjb2hvbFwiKSB7XG4gICAgICAgICAgICAgICAgcmV0dmFsID0gMDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmIChkcnVnID09IFwibWFyaWp1YW5uYVwiKSB7XG4gICAgICAgICAgICAgICAgcmV0dmFsID0gMDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmIChkcnVnID09IFwiaGVyaW9uXCIpIHtcbiAgICAgICAgICAgICAgICByZXR2YWwgPSAxNjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiByZXR2YWw7XG4gICAgICAgIH07XG5cblxuICAgICAgICB2YXIgdGFrZWl0ID0ge1xuICAgICAgICAgICAgbGFiZWw6IFwiWWVzIFBsZWFzZVwiLFxuICAgICAgICAgICAgY2xhc3NOYW1lOiBcImJ0bi1zdWNjZXNzXCIsXG4gICAgICAgICAgICBjYWxsYmFjazogZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgZHJ1Z0ZuKGRydWcsIHRydWUpO1xuICAgICAgICAgICAgICAgIG11dGV4Rm4oZmFsc2UpO1xuICAgICAgICAgICAgICAgIGltcGFpckZuKGltcGFpcm1lbnRUaWNrcyhkcnVnKSlcbiAgICAgICAgICAgIH1cbiAgICAgICAgfTtcbiAgICAgICAgdmFyIGRlbnlpdCA9IHtcbiAgICAgICAgICAgIGxhYmVsOiBcIkdldCBCZW50XCIsXG4gICAgICAgICAgICBjbGFzc05hbWU6IFwiYnRuLWRhbmdlclwiLFxuICAgICAgICAgICAgY2FsbGJhY2s6IGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgIGRydWdGbihkcnVnLCBpbXBJbmQpOyAvLyBJZiBpbXBhaXJlZCwgdGhpcyBpcyB0cnVlIHRvby4gICBvb3BzISA6KVxuICAgICAgICAgICAgICAgIG11dGV4Rm4oZmFsc2UpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9O1xuXG4gICAgICAgIGJvb3Rib3guZGlhbG9nKHtcbiAgICAgICAgICAgIG1lc3NhZ2U6IG1zZyxcbiAgICAgICAgICAgIHRpdGxlOiBcIkRydWdzIVwiLFxuICAgICAgICAgICAgY2xvc2VCdXR0b246IGZhbHNlLFxuICAgICAgICAgICAgc2l6ZTogJ3NtYWxsJyxcbiAgICAgICAgICAgIGJ1dHRvbnM6IHtcbiAgICAgICAgICAgICAgICBwb3NpdGl2ZTogdGFrZWl0LFxuICAgICAgICAgICAgICAgIG5lZ2F0aXZlOiBkZW55aXRcbiAgICAgICAgICAgIH0gLy8gYnV0dG9uc1xuICAgICAgICB9KTtcbiAgICB9XG5cblxuICAgIC8vIFJldHVybiBwdWJsaWMgaW50ZXJmYWNlXG4gICAgcmV0dXJuIHtcbiAgICAgICAgZHJ1Z05hbWU6IGZ1bmN0aW9uKGkpIHtcbiAgICAgICAgICAgIHJldHVybiBkcnVnc1soaSAlIGRydWdzLmxlbmd0aCldO1xuICAgICAgICB9LFxuICAgICAgICBpbXBhaXI6IGZ1bmN0aW9uKGIpIHtcbiAgICAgICAgICAgIGltcGFpcmVkID0gISFiO1xuICAgICAgICB9LFxuICAgICAgICBvZmZlcjogZnVuY3Rpb24oZHJ1ZywgaW1wLCBkcnVnRm4sIGltcGFpckZuLCBtdXRleEZuKSB7XG4gICAgICAgICAgICBtYWtlT2ZmZXIoZHJ1ZywgaW1wLCBkcnVnRm4sIGltcGFpckZuLCBtdXRleEZuKTtcbiAgICAgICAgfSxcbiAgICAgICAgY2xlYXI6IGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgcHVzaGVycy5zaHVmZmxlKCk7XG4gICAgICAgICAgICBsb2NhdGlvbnMuc2h1ZmZsZSgpO1xuICAgICAgICAgICAgZHJ1Z3Muc2h1ZmZsZSgpO1xuICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgIH1cbiAgICB9OyAvLyBlbmQgcmV0dXJuIG9mIHB1YmxpYyBvYmplY3RcblxufTtcbiIsIm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24oKSB7XG4gICAgdmFyIGZpcnN0ID0gdHJ1ZTtcbiAgICB2YXIgaW1wYWlyZWQgPSAwOyAvLyAgVXNpbmcgYSBjb3VudGVyIGluc3RlYWQgb2YgYSBzdHJpY3QgYm9vbGVhbi5cbiAgICB2YXIgZXZlbnRPcGVuID0gZmFsc2U7XG4gICAgdmFyIEJhbmQgPSByZXF1aXJlKCcuL0JhbmQuanMnKSgpO1xuICAgIHZhciBXR08gPSByZXF1aXJlKCcuL1dHTy5qcycpKCk7XG4gICAgdmFyIEdyYXBldmluZSA9IHJlcXVpcmUoJy4vR3JhcGV2aW5lLmpzJykoKTtcbiAgICB2YXIgRHJ1Z1Byb21wdCA9IHJlcXVpcmUoJy4vRHJ1Z1Byb21wdC5qcycpKCk7XG4gICAgdmFyIEJhbmRQcm9tcHQgPSByZXF1aXJlKCcuL0JhbmRQcm9tcHQuanMnKSgpO1xuICAgIHZhciBBYm91dCA9IHJlcXVpcmUoJy4vQWJvdXQuanMnKSgpO1xuXG4gICAgdmFyIGltcGFpcmwgPSBmdW5jdGlvbihiKSB7XG4gICAgICAgIFdHTy5pbXBhaXIoISFiKTtcbiAgICAgICAgV0dPLnJlZnJlc2goKTtcbiAgICAgICAgR3JhcGV2aW5lLmltcGFpcighIWIpO1xuICAgICAgICBHcmFwZXZpbmUucmVmcmVzaCgpO1xuICAgICAgICBCYW5kLmltcGFpcighIWIpO1xuICAgICAgICBCYW5kLnJlZnJlc2goKTtcbiAgICAgICAgcmV0dXJuIGltcGFpcmVkO1xuICAgIH07XG5cbiAgICAvLyBJbXBhaXIgZm9yIHVwIHRvIHggdGlja3NcbiAgICB2YXIgaW1wYWlyQWRkID0gZnVuY3Rpb24oeCkge1xuICAgICAgICB2YXIgeiA9IE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIHgpO1xuICAgICAgICBpZiAoeiA+IDApIHtcbiAgICAgICAgICAgIGltcGFpcmVkICs9IHo7XG4gICAgICAgICAgICBXR08uYWRkSXRlbShcIkRydWdzIGNhbiBhbHRlciB5b3VyIHNlbnNlIG9mIHBlcmNlcHRpb24uXCIpXG4gICAgICAgICAgICBXR08ucmVmcmVzaCgpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBpbXBhaXJlZDtcbiAgICB9O1xuXG4gICAgdmFyIHJlc3RhcnQgPSBmdW5jdGlvbigpIHtcbiAgICAgICAgQmFuZC5jbGVhcigpO1xuICAgICAgICBXR08uY2xlYXIoKTtcbiAgICAgICAgR3JhcGV2aW5lLmNsZWFyKCk7XG4gICAgICAgIERydWdQcm9tcHQuY2xlYXIoKTtcblxuICAgICAgICAvKiBPbmx5IGJpbmQgdGhlc2UgZXZlbnRzIG9uIGZpcnN0IHBhc3MgKi9cbiAgICAgICAgaWYgKGZpcnN0KSB7XG4gICAgICAgICAgICBmaXJzdCA9IGZhbHNlO1xuICAgICAgICAgICAgJChcIiN0aXRsZVwiKS5jbGljayhmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICBCYW5kLmluY0RhdGUoKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgJChcIiNhYm91dFwiKS5jbGljayhmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICBBYm91dC5zaG93U3BsYXNoKCk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICQoXCIjbmV3X2dhbWVcIikuY2xpY2soZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgcmVzdGFydCgpO1xuICAgICAgICAgICAgICAgIEJhbmRQcm9tcHQubmFtZShCYW5kLnNldE5hbWUpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAkKFwiI3RvdXJzXCIpLmNsaWNrKGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgIEdyYXBldmluZS5vdGhlclNvbmcoKTtcbiAgICAgICAgICAgICAgICBHcmFwZXZpbmUucmVmcmVzaCgpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAkKFwiI2NoYXJ0c1wiKS5jbGljayhmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICBHcmFwZXZpbmUuYWRkSXRlbShcIllvdSBhcmUgb24gdGhlIGNoYXJ0c1wiKTtcbiAgICAgICAgICAgICAgICBHcmFwZXZpbmUucmVmcmVzaCgpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAkKFwiI2hvd190b19wbGF5XCIpLmNsaWNrKGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgIEFib3V0Lmhvd1RvUGxheSgpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAkKFwiI3JlbGVhc2VzXCIpLmNsaWNrKGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgIFdHTy5hZGRJdGVtKFwiUmVsZWFzZXMgc2VsZWN0ZWRcIik7XG4gICAgICAgICAgICAgICAgV0dPLnJlZnJlc2goKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgJChcIiNkcnVnc1wiKS5jbGljayhmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICBCYW5kUHJvbXB0LmRydWdQcmVmZXJlbmNlcyhCYW5kLmdldERydWdzKCkpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9O1xuXG4gICAgZnVuY3Rpb24gc2hvd1BvcHVsYXJpdHkoKSB7XG4gICAgICAgIFdHTy5hZGRJdGVtKEJhbmQuZ2V0UG9wKFwibG9jYWxcIikpO1xuICAgICAgICBXR08uYWRkSXRlbShCYW5kLmdldFBvcChcIm5hdGlvbmFsXCIpKTtcbiAgICAgICAgV0dPLmFkZEl0ZW0oQmFuZC5nZXRQb3AoXCJnbG9iYWxcIikpO1xuICAgICAgICBXR08ucmVmcmVzaCgpO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIHNldEV2ZW50KGIpIHtcbiAgICAgICAgZXZlbnRPcGVuID0gISFiO1xuICAgIH1cblxuICAgIC8vIFJldHVybiBwdWJsaWMgaW50ZXJmYWNlXG4gICAgcmV0dXJuIHtcbiAgICAgICAgaW5jRGF0ZTogZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICBpZiAoIWV2ZW50T3Blbikge1xuICAgICAgICAgICAgICAgIGlmIChpbXBhaXJlZCA+IDApIHtcbiAgICAgICAgICAgICAgICAgICAgaW1wYWlyZWQgLT0gMTtcbiAgICAgICAgICAgICAgICAgICAgaW1wYWlybCh0cnVlKTtcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICBpbXBhaXJlZCA9IDA7XG4gICAgICAgICAgICAgICAgICAgIGltcGFpcmwoZmFsc2UpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB2YXIgeCA9IEJhbmQuaW5jRGF0ZSgpO1xuICAgICAgICAgICAgICAgIGlmICgoeCAlIDMwKSA9PSAwKSB7XG4gICAgICAgICAgICAgICAgICAgIHNob3dQb3B1bGFyaXR5KCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGlmICgoeCAlIDExKSA9PSAwKSB7XG4gICAgICAgICAgICAgICAgICAgIHNldEV2ZW50KHRydWUpO1xuICAgICAgICAgICAgICAgICAgICBXR08uYWRkSXRlbShcIllvdSBoYXZlIGJlZW4gb2ZmZXJlZCBkcnVncy5cIilcbiAgICAgICAgICAgICAgICAgICAgV0dPLnJlZnJlc2goKTtcbiAgICAgICAgICAgICAgICAgICAgRHJ1Z1Byb21wdC5vZmZlcihEcnVnUHJvbXB0LmRydWdOYW1lKHgpLCBpbXBhaXJlZCwgQmFuZC5kcnVnb2ZmZXIsIGltcGFpckFkZCwgc2V0RXZlbnQpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBpZiAoKHggJSAzKSA9PSAwKSB7XG4gICAgICAgICAgICAgICAgICAgIEdyYXBldmluZS5vdGhlclNvbmcoKTtcbiAgICAgICAgICAgICAgICAgICAgR3JhcGV2aW5lLnJlZnJlc2goKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9IC8vIGlmICFldmVudE9wZW5cbiAgICAgICAgfSxcbiAgICAgICAgd2hhdGV2ZXI6IGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgIH0sXG4gICAgICAgIGluaXQ6IGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgcmV0dXJuIHJlc3RhcnQoKTtcbiAgICAgICAgfSxcbiAgICAgICAgaW1wYWlyOiBmdW5jdGlvbihiKSB7XG4gICAgICAgICAgICByZXR1cm4gaW1wYWlybChiKTtcbiAgICAgICAgfVxuICAgIH07IC8vIGVuZCByZXR1cm4gb2YgcHVibGljIG9iamVjdFxuXG59O1xuIiwibW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbigpIHtcblxuICAgIC8vIFByaXZhdGUgdmFyc1xuICAgIHZhciBpbXBhaXJlZCA9IGZhbHNlO1xuICAgIHZhciBtYXhpdGVtcyA9IDEyO1xuICAgIHZhciBtYXN0ZXJjb3VudCA9IDA7XG4gICAgdmFyIGl0ZW1zID0gW107IC8vIExpbmUgaXRlbXMgaW4gXG4gICAgdmFyIHJhbmRvbSA9IHJlcXVpcmUoJy4vcmFuZG9tLmpzJyk7XG4gICAgdmFyIHJvdDEzID0gcmVxdWlyZSgnLi9yb3QxMy5qcycpO1xuXG4gICAgdmFyIGNsYXNzdHlwZXMgPSBbXG4gICAgICAgIFwidGV4dC1tdXRlZFwiLFxuICAgICAgICBcInRleHQtcHJpbWFyeVwiLFxuICAgICAgICBcInRleHQtd2FybmluZ1wiLFxuICAgICAgICBcInRleHQtcHJpbWFyeVwiLFxuICAgICAgICBcInRleHQtaW5mb1wiLFxuICAgICAgICBcInRleHQtd2FybmluZ1wiLFxuICAgICAgICBcInRleHQtZGFuZ2VyXCIsXG4gICAgICAgIFwidGV4dC1zdWNjZXNzXCIsXG4gICAgICAgIFwidGV4dC13YXJuaW5nXCIsXG4gICAgICAgIFwidGV4dC1wcmltYXJ5XCIsXG4gICAgICAgIFwidGV4dC13YXJuaW5nXCIsXG4gICAgICAgIFwidGV4dC1pbmZvXCIsXG4gICAgICAgIFwidGV4dC1kYW5nZXJcIixcbiAgICAgICAgXCJ0ZXh0LXN1Y2Nlc3NcIixcbiAgICAgICAgXCJ0ZXh0LWluZm9cIlxuICAgIF07XG5cblxuICAgIHZhciBhcnRpc3RzID0gW1xuICAgICAgICBcIlRoZSBCaW5nIEJhbmdzXCIsXG4gICAgICAgIFwiTW9kZXJuIFNob2VcIixcbiAgICAgICAgXCJUZWFtIEdvcmRvblwiLFxuICAgICAgICBcIkNvcnkgRG9jdG9yb3dcIixcbiAgICAgICAgXCJLdXJ0IChub3QgdGhhdCBvbmUgdGhlIG90aGVyIG9uZSlcIixcbiAgICAgICAgXCJNeSBVbmRlcndlYXJcIixcbiAgICAgICAgXCJJbnRlcm5hbCBJc3N1ZXNcIixcbiAgICAgICAgXCJDYXQgVmlkZW8gQ2x1YlwiLFxuICAgICAgICBcIk5hdmkgaXMgbXkgU3Bpcml0IEd1aWRlXCIsXG4gICAgICAgIFwiQmx1ZSBDaGlja2VuIE51Z2dldFwiLFxuICAgICAgICBcIllhcm4gUG9ybm9ncmFwaHlcIixcbiAgICAgICAgXCI2IGN5bGluZGVyIE1ha2V1cFwiLFxuICAgICAgICBcIlRoZSBCdXJsYXAgUGVhbnV0XCIsXG4gICAgICAgIFwiVGVxdWlsYSBNb2NraW5nYmlyZFwiLFxuICAgICAgICBcIkFuYXJrZXkgaW4gdGhlIExpYnJhcnlcIixcbiAgICAgICAgXCJCcm90aGVyIFRzaG9iZXJcIixcbiAgICAgICAgXCJGcnVtcHkgQnJlYXN0IEFuZCBUaGUgU2hhY2tcIixcbiAgICAgICAgXCJDaGllZiBQcmVzaWRlbnRcIixcbiAgICAgICAgXCJUd2luIFN0cmFuZ2VyXCIsXG4gICAgICAgIFwiRG91YnQgT2YgUGFyYWRpc2VcIixcbiAgICAgICAgXCJNYXNzaXZlIExvZ2lzdGljXCIsXG4gICAgICAgIFwiUmVwdWJsaWNhbiBGdXJyeVwiLFxuICAgICAgICBcIkdhbGF4eSBPZiBUaGUgSW50aW1hdGUgV2Fsa1wiLFxuICAgICAgICBcIkRlbGVjdGFibGUgSWduaXRlXCIsXG4gICAgICAgIFwiVmVydGlnbyBPZiBUaGUgT2JqZWN0XCIsXG4gICAgICAgIFwiQ2F1dGlvbiBBcm1hZGFcIixcbiAgICAgICAgXCJTdHlybyBBYnNlbmNlXCIsXG4gICAgICAgIFwiQWZ0ZXIgQnVzaFwiLFxuICAgICAgICBcIll1a29uIFN1Y2Nlc3NcIixcbiAgICAgICAgXCJCdXR0LXVnbHkgUGFwZXJcIixcbiAgICAgICAgXCJFbnRpdGxlZCBPZGRzIE9mIFRoZSBTbGluZyBMaWNrXCIsXG4gICAgICAgIFwiUGluayBNaXN0XCIsXG4gICAgICAgIFwiQnV0dCBTZXJpb3VzbHlcIixcbiAgICAgICAgXCJUaGUgRGlzcmEgTWlzdHkgQmFuZFwiLFxuICAgICAgICBcIkRpeGllICYgdGhlIE5pbmphc1wiLFxuICAgICAgICBcIllldCBBbm90aGVyIE1hc3MgRXh0aW5jdGlvbiBFdmVudFwiLFxuICAgICAgICBcIlRoZSBQb3dlciBDaG9yZCBIb3RzaG90c1wiLFxuICAgICAgICBcIkRvbm5lciBEaW5uZXIgUGFydHlcIixcbiAgICAgICAgXCJUZWVuIEFuZ3N0XCIsXG4gICAgICAgIFwiQWdncmVzc2l2ZSBQYWNpZmlzbVwiLFxuICAgICAgICBcIk15IENoZW1pY2FsIEJyb21hbmNlXCIsXG4gICAgICAgIFwiVGhlIE5pY2tsZWJhY2sgVHJpYnV0ZSBCYW5kXCIsXG4gICAgICAgIFwiSGFtYnVyZ2VyIEV2YW5nZWxpc21cIlxuICAgIF07XG5cbiAgICB2YXIgc29uZ3RpdGxlcyA9IFtcbiAgICAgICAgXCJUaGlzIGlzIGEgVHVuZVwiLFxuICAgICAgICBcIllvZGVscyBtYWtlIG1lIGhhcHB5XCIsXG4gICAgICAgIFwiSXQncyBhIHdpbGwgcm9sbCBkYW1taXRcIixcbiAgICAgICAgXCJJIGxpa2UgcG9wY29yblwiLFxuICAgICAgICBcIk15IEVsZWN0cmljaWFuIE1hZGUgbWUgU2FkXCIsXG4gICAgICAgIFwiUk5HIGluIEhlYXJ0aHN0b25lIEZUV1wiLFxuICAgICAgICBcIk15IHRoaXJkIGJlbGx5IGJ1dHRvblwiLFxuICAgICAgICBcIldhdGNoaW5nIFlvdVR1YmUgYXQgV29ya1wiLFxuICAgICAgICBcIlRoZSBUcmlmb3JjZSBpcyBwb2ludHlcIixcbiAgICAgICAgXCJUaGV5IGdyb3cgZnJvbSBzcGVsbHNcIixcbiAgICAgICAgXCJJIHBsYXllZCBhIG1hZ2UgYW5kIEkgbGlrZWQgaXRcIixcbiAgICAgICAgXCJJIHN0aWxsIHBsYXkgb2xkIGdhbWVzXCIsXG4gICAgICAgIFwiSmF2YSBhaW50IGphdmFzY3JpcHRcIixcbiAgICAgICAgXCI1MCByZWFzb25zIHdoeSBKYXZhIGlzIGEgZmFkXCIsXG4gICAgICAgIFwiVGhlIGJlc3QgcGFydCBvZiBtZSBpcyBsZWZ0IGhhbmRlZFwiLFxuICAgICAgICBcIkl0IHRha2VzIGEgZmV3IHllYXJzIHRvIGxpc3RlbiB0byBteSBwbGF5bGlzdFwiLFxuICAgICAgICBcIlRhbmdlbnRpYWwgQ29sZFwiLFxuICAgICAgICBcIlRocm93aW5nIGEgcXVhcnRlciBhbmQgd2lzaGluZyB5b3Ugd2VsbFwiLFxuICAgICAgICBcIk15IGdvb2dsZSBjYWxlbmRhciBpcyByaWRpY3Vsb3VzXCIsXG4gICAgICAgIFwiUmVtZW1iZXIgd2hlbiBwZW9wbGUgbGluZWQgdXAgdG8gYnV5IFdpbmRvd3MgOTU/ICBDcmF6eSFcIixcbiAgICAgICAgXCJSaWNoYXJkIFN0YWxsbWFuIHdhcyBteSBiYWJ5c2l0dGVyXCIsXG4gICAgICAgIFwiTG9va2luZyB0byBUcmFpbj9cIixcbiAgICAgICAgXCJZb3UgZG8gbm90IGhhdmUgdGhlIHByb3BlciBzdG9uZVwiLFxuICAgICAgICBcIkkgYW0gbm90IHJlYWR5XCIsXG4gICAgICAgIFwiQnVnZ3kgdmlkZW8gZ2FtZXMuICBXaGF0J3MgdXAgd2l0aCB0aGF0P1wiLFxuICAgICAgICBcIklzIENhbGwgb2YgRHV0eSBzdGlsbCBhIHRoaW5nP1wiLFxuICAgICAgICBcIkkgaGF2ZSBhIG1pbGxpb24gYmFsbHMgYW5kIEkgYW0gdGhlIHNpemUgb2YgYSBwZWFudXRcIixcbiAgICAgICAgXCJCZWNhdXNlIHlvdSBrbm93IHRoZSBiYWJ5XCIsXG4gICAgICAgIFwiQ291cnRzaGlwIElzIEV2ZXJ5dGhpbmdcIixcbiAgICAgICAgXCJDYW4ndCBTdG9wIFRoZSBGaXJlY3JhY2tlclwiLFxuICAgICAgICBcIkhvbHkgRGVtb2NyYWN5XCIsXG4gICAgICAgIFwiRnJpZW5kcyBXaXRoIFN5bmNocm9uaXNhdGlvblwiLFxuICAgICAgICBcIlJhdyBTdGFzaFwiLFxuICAgICAgICBcIlN1cGVybmF0dXJhbCBUaW1lXCIsXG4gICAgICAgIFwiRG9uJ3QgU3RvcCBUaGUgRGV2aWxcIixcbiAgICAgICAgXCJIZWxsdXZhIFNob3BwaW5nXCIsXG4gICAgICAgIFwiVGhlIEFsbCBBbWVyaWNhbiBHaXJsXCIsXG4gICAgICAgIFwiQ2xhc3NpYyBHdWl0YXJcIixcbiAgICAgICAgXCJPdXRyYWdlb3VzIEF4ZVwiLFxuICAgICAgICBcIlVuY29udHJvbGxhYmxlIENyaW1pbmFsXCIsXG4gICAgICAgIFwiSG90c2hvdCBSYWluYm93XCIsXG4gICAgICAgIFwiVmxhZGltaXIgUHV0aW4gaXMgYSBHb2RcIixcbiAgICAgICAgXCJDcnlpbmcgSmFwYW5lc2UgUG9saXRpY2lhblwiXG4gICAgXTtcblxuICAgIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0gU29tZSBwcml2YXRlIG1ldGhvZHMgLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICAgIC8vIFRoaXMgZnVuY3Rpb24gcmV0dXJucyAndHJ1ZScgaWYgdGhlIGNhc2Ugd2FzIG5vdCBzb2x2YWJsZSBcbiAgICBmdW5jdGlvbiBmb3JtYXRMaW5lKG9iaikge1xuICAgICAgICB2YXIgcmV0dmFsO1xuICAgICAgICBpZiAoaW1wYWlyZWQpIHtcbiAgICAgICAgICAgIHN3aXRjaCAocmFuZG9tKDQpKSB7XG4gICAgICAgICAgICAgICAgY2FzZSAwOlxuICAgICAgICAgICAgICAgICAgICByZXR2YWwgPSBcIjxwIGNsYXNzPVxcXCJcIiArIG9iai5jbGFzc3R5cGUgKyBcIiBsZWFkXFxcIj5cIiArIHJvdDEzKG9iai5zdHIpICsgXCI8L3A+XCI7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIGNhc2UgMTpcbiAgICAgICAgICAgICAgICAgICAgcmV0dmFsID0gXCI8cCBjbGFzcz1cXFwiXCIgKyBvYmouY2xhc3N0eXBlICsgXCJcXFwiPjxtYXJrPlwiICsgcm90MTMob2JqLnN0cikgKyBcIjwvbWFyaz48L3A+XCI7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIGNhc2UgMjpcbiAgICAgICAgICAgICAgICAgICAgcmV0dmFsID0gXCI8cCBjbGFzcz1cXFwiXCIgKyBvYmouY2xhc3N0eXBlICsgXCJcXFwiPjxkZWw+XCIgKyByb3QxMyhvYmouc3RyKSArIFwiPC9kZWw+PC9wPlwiO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICBjYXNlIDM6XG4gICAgICAgICAgICAgICAgICAgIHJldHZhbCA9IFwiPHAgY2xhc3M9XFxcIlwiICsgb2JqLmNsYXNzdHlwZSArIFwiXFxcIj48cz5cIiArIHJvdDEzKG9iai5zdHIpICsgXCI8L3M+PC9wPlwiO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgICAgICAgICByZXR2YWwgPSBcIjxwIGNsYXNzPVxcXCJcIiArIG9iai5jbGFzc3R5cGUgKyBcIlxcXCI+XCIgKyByb3QxMyhvYmouc3RyKSArIFwiPC9wPlwiO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcblxuICAgICAgICAgICAgfVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgcmV0dmFsID0gXCI8cCBjbGFzcz1cXFwiXCIgKyBvYmouY2xhc3N0eXBlICsgXCJcXFwiPlwiICsgb2JqLnN0ciArIFwiPC9wPlwiO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiByZXR2YWw7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gY3JlYXRlSXRlbShzdHIpIHtcbiAgICAgICAgbWFzdGVyY291bnQrKztcbiAgICAgICAgdmFyIGN0ID0gY2xhc3N0eXBlc1ttYXN0ZXJjb3VudCAlIGNsYXNzdHlwZXMubGVuZ3RoXTtcbiAgICAgICAgdmFyIHJldHZhbCA9IHtcbiAgICAgICAgICAgICdjbGFzc3R5cGUnOiBjdCxcbiAgICAgICAgICAgICdzdHInOiBzdHJcbiAgICAgICAgfTtcbiAgICAgICAgcmV0dXJuIHJldHZhbDtcbiAgICB9XG5cblxuICAgIC8vIFJldHVybiBwdWJsaWMgaW50ZXJmYWNlXG4gICAgcmV0dXJuIHtcbiAgICAgICAgaW1wYWlyOiBmdW5jdGlvbihiKSB7XG4gICAgICAgICAgICBpbXBhaXJlZCA9ICEhYjtcbiAgICAgICAgfSxcbiAgICAgICAgb3RoZXJTb25nOiBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIHZhciBhcnRpc3RfaW5kZXggPSBtYXN0ZXJjb3VudCAlIGFydGlzdHMubGVuZ3RoO1xuICAgICAgICAgICAgdmFyIHNvbmdfaW5kZXggPSBtYXN0ZXJjb3VudCAlIHNvbmd0aXRsZXMubGVuZ3RoO1xuICAgICAgICAgICAgdmFyIHJlbGVhc2Vfbm90aWNlID0gXCJOZXcgc2luZ2xlIHJlbGVhc2VkIGJ5ICdcIiArIGFydGlzdHNbYXJ0aXN0X2luZGV4XSArIFwiJyBjYWxsZWQgJ1wiICsgc29uZ3RpdGxlc1tzb25nX2luZGV4XSArIFwiJ1wiO1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuYWRkSXRlbShyZWxlYXNlX25vdGljZSk7XG4gICAgICAgIH0sXG4gICAgICAgIGFkZEl0ZW06IGZ1bmN0aW9uKHN0cikge1xuICAgICAgICAgICAgaXRlbXMucHVzaChjcmVhdGVJdGVtKHN0cikpO1xuICAgICAgICAgICAgaWYgKGl0ZW1zLmxlbmd0aCA+IG1heGl0ZW1zKSB7XG4gICAgICAgICAgICAgICAgaXRlbXMuc2hpZnQoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICB9LFxuICAgICAgICByZWZyZXNoOiBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIHZhciBodG1sc3RyID0gXCJcIjtcbiAgICAgICAgICAgIHZhciBpID0gMDtcbiAgICAgICAgICAgIGZvciAoOyBpIDwgaXRlbXMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgICAgICBodG1sc3RyID0gaHRtbHN0ci5jb25jYXQoZm9ybWF0TGluZShpdGVtc1tpXSkpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgJChcIiNzc2dsb2JhbFwiKS5odG1sKGh0bWxzdHIpO1xuICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgIH0sXG4gICAgICAgIGNsZWFyOiBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIGl0ZW1zID0gW107XG4gICAgICAgICAgICBhcnRpc3RzLnNodWZmbGUoKTtcbiAgICAgICAgICAgIHNvbmd0aXRsZXMuc2h1ZmZsZSgpO1xuICAgICAgICAgICAgdGhpcy5yZWZyZXNoKCk7XG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgfVxuICAgIH07IC8vIGVuZCByZXR1cm4gb2YgcHVibGljIG9iamVjdFxuXG59O1xuIiwibW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbigpIHtcblxuICAgIC8vIFByaXZhdGUgdmFyc1xuICAgIHZhciBpbXBhaXJlZCA9IGZhbHNlO1xuICAgIHZhciBtYXhpdGVtcyA9IDEyO1xuICAgIHZhciBtYXN0ZXJjb3VudCA9IDA7XG4gICAgdmFyIGl0ZW1zID0gW107IC8vIExpbmUgaXRlbXMgaW4gXG4gICAgdmFyIHJhbmRvbSA9IHJlcXVpcmUoJy4vcmFuZG9tLmpzJyk7XG4gICAgdmFyIHJvdDEzID0gcmVxdWlyZSgnLi9yb3QxMy5qcycpO1xuXG4gICAgdmFyIGNsYXNzdHlwZXMgPSBbXG4gICAgICAgIFwidGV4dC1tdXRlZFwiLFxuICAgICAgICBcInRleHQtcHJpbWFyeVwiLFxuICAgICAgICBcInRleHQtd2FybmluZ1wiLFxuICAgICAgICBcInRleHQtcHJpbWFyeVwiLFxuICAgICAgICBcInRleHQtaW5mb1wiLFxuICAgICAgICBcInRleHQtd2FybmluZ1wiLFxuICAgICAgICBcInRleHQtZGFuZ2VyXCIsXG4gICAgICAgIFwidGV4dC1zdWNjZXNzXCIsXG4gICAgICAgIFwidGV4dC13YXJuaW5nXCIsXG4gICAgICAgIFwidGV4dC1wcmltYXJ5XCIsXG4gICAgICAgIFwidGV4dC13YXJuaW5nXCIsXG4gICAgICAgIFwidGV4dC1pbmZvXCIsXG4gICAgICAgIFwidGV4dC1kYW5nZXJcIixcbiAgICAgICAgXCJ0ZXh0LXN1Y2Nlc3NcIixcbiAgICAgICAgXCJ0ZXh0LWluZm9cIlxuICAgIF07XG4gICAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSBTb21lIHByaXZhdGUgbWV0aG9kcyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gICAgLy8gVGhpcyBmdW5jdGlvbiByZXR1cm5zICd0cnVlJyBpZiB0aGUgY2FzZSB3YXMgbm90IHNvbHZhYmxlIFxuICAgIGZ1bmN0aW9uIGZvcm1hdExpbmUob2JqKSB7XG4gICAgICAgIHZhciByZXR2YWw7XG4gICAgICAgIGlmIChpbXBhaXJlZCkge1xuICAgICAgICAgICAgc3dpdGNoIChyYW5kb20oNCkpIHtcbiAgICAgICAgICAgICAgICBjYXNlIDA6XG4gICAgICAgICAgICAgICAgICAgIHJldHZhbCA9IFwiPHAgY2xhc3M9XFxcIlwiICsgb2JqLmNsYXNzdHlwZSArIFwiIGxlYWRcXFwiPlwiICsgcm90MTMob2JqLnN0cikgKyBcIjwvcD5cIjtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgY2FzZSAxOlxuICAgICAgICAgICAgICAgICAgICByZXR2YWwgPSBcIjxwIGNsYXNzPVxcXCJcIiArIG9iai5jbGFzc3R5cGUgKyBcIlxcXCI+PG1hcms+XCIgKyByb3QxMyhvYmouc3RyKSArIFwiPC9tYXJrPjwvcD5cIjtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgY2FzZSAyOlxuICAgICAgICAgICAgICAgICAgICByZXR2YWwgPSBcIjxwIGNsYXNzPVxcXCJcIiArIG9iai5jbGFzc3R5cGUgKyBcIlxcXCI+PGRlbD5cIiArIHJvdDEzKG9iai5zdHIpICsgXCI8L2RlbD48L3A+XCI7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIGNhc2UgMzpcbiAgICAgICAgICAgICAgICAgICAgcmV0dmFsID0gXCI8cCBjbGFzcz1cXFwiXCIgKyBvYmouY2xhc3N0eXBlICsgXCJcXFwiPjxzPlwiICsgcm90MTMob2JqLnN0cikgKyBcIjwvcz48L3A+XCI7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICAgICAgICAgIHJldHZhbCA9IFwiPHAgY2xhc3M9XFxcIlwiICsgb2JqLmNsYXNzdHlwZSArIFwiXFxcIj5cIiArIHJvdDEzKG9iai5zdHIpICsgXCI8L3A+XCI7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICByZXR2YWwgPSBcIjxwIGNsYXNzPVxcXCJcIiArIG9iai5jbGFzc3R5cGUgKyBcIlxcXCI+XCIgKyBvYmouc3RyICsgXCI8L3A+XCI7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHJldHZhbDtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBjcmVhdGVJdGVtKHN0cikge1xuICAgICAgICBtYXN0ZXJjb3VudCsrO1xuICAgICAgICB2YXIgY3QgPSBjbGFzc3R5cGVzW21hc3RlcmNvdW50ICUgY2xhc3N0eXBlcy5sZW5ndGhdO1xuICAgICAgICB2YXIgcmV0dmFsID0ge1xuICAgICAgICAgICAgJ2NsYXNzdHlwZSc6IGN0LFxuICAgICAgICAgICAgJ3N0cic6IHN0clxuICAgICAgICB9O1xuICAgICAgICByZXR1cm4gcmV0dmFsO1xuICAgIH1cblxuICAgIC8vIFJldHVybiBwdWJsaWMgaW50ZXJmYWNlXG4gICAgcmV0dXJuIHtcbiAgICAgICAgaW1wYWlyOiBmdW5jdGlvbihiKSB7XG4gICAgICAgICAgICBpbXBhaXJlZCA9ICEhYjtcbiAgICAgICAgfSxcbiAgICAgICAgYWRkSXRlbTogZnVuY3Rpb24oc3RyKSB7XG4gICAgICAgICAgICBpdGVtcy5wdXNoKGNyZWF0ZUl0ZW0oc3RyKSk7XG4gICAgICAgICAgICBpZiAoaXRlbXMubGVuZ3RoID4gbWF4aXRlbXMpIHtcbiAgICAgICAgICAgICAgICBpdGVtcy5zaGlmdCgpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgIH0sXG4gICAgICAgIHJlZnJlc2g6IGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgdmFyIGh0bWxzdHIgPSBcIlwiO1xuICAgICAgICAgICAgdmFyIGkgPSAwO1xuICAgICAgICAgICAgZm9yICg7IGkgPCBpdGVtcy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgICAgIGh0bWxzdHIgPSBodG1sc3RyLmNvbmNhdChmb3JtYXRMaW5lKGl0ZW1zW2ldKSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICAkKFwiI3NzbG9jYWxcIikuaHRtbChodG1sc3RyKTtcbiAgICAgICAgICAgIHJldHVybiBodG1sc3RyO1xuICAgICAgICB9LFxuICAgICAgICBjbGVhcjogZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICBpdGVtcyA9IFtdO1xuICAgICAgICAgICAgdGhpcy5yZWZyZXNoKCk7XG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgfVxuICAgIH07IC8vIGVuZCByZXR1cm4gb2YgcHVibGljIG9iamVjdFxufTtcbiIsIm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24odGFyZ2V0KSB7XG4gICAgcmV0dXJuIE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIHRhcmdldCk7XG59O1xuIiwibW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbihzKSB7XG4gICAgcmV0dXJuIHMucmVwbGFjZSgvW0EtWmEtel0vZywgZnVuY3Rpb24oYykge1xuICAgICAgICByZXR1cm4gXCJBQkNERUZHSElKS0xNTk9QUVJTVFVWV1hZWmFiY2RlZmdoaWprbG1ub3BxcnN0dXZ3eHl6XCIuY2hhckF0KFxuICAgICAgICAgICAgXCJOT1BRUlNUVVZXWFlaQUJDREVGR0hJSktMTW5vcHFyc3R1dnd4eXphYmNkZWZnaGlqa2xtXCIuaW5kZXhPZihjKVxuICAgICAgICApO1xuICAgIH0pO1xufTtcbiIsIi8vIHN0b25lc3VuLmpzXG52YXIgR2FtZU1hbmFnZXIgPSByZXF1aXJlKCcuL0dhbWVNYW5hZ2VyLmpzJykoKTtcblxudmFyIHBhc3N0aW1lID0gZnVuY3Rpb24oKSB7XG4gICAgR2FtZU1hbmFnZXIuaW5jRGF0ZSgpO1xuICAgIHNldFRpbWVvdXQocGFzc3RpbWUsIDMwMDApO1xufVxuXG4vLyBBZGQgc2h1ZmZsZSBmdW5jdGlvbiB0byBhbGwgYXJyYXkgb2JqZWN0c1xuQXJyYXkucHJvdG90eXBlLnNodWZmbGUgPSBmdW5jdGlvbigpIHtcbiAgICBmb3IgKHZhciBybmQsIHRtcCwgaSA9IHRoaXMubGVuZ3RoOyBpOyBybmQgPSBwYXJzZUludChNYXRoLnJhbmRvbSgpICogaSksIHRtcCA9IHRoaXNbLS1pXSwgdGhpc1tpXSA9IHRoaXNbcm5kXSwgdGhpc1tybmRdID0gdG1wKTtcbn07XG5cblxuLyogRGVmaW5lIGEgJ2NvbnNvbGUnIG9iamVjdCBmb3IgSUUgKi9cbmlmICh0eXBlb2YgY29uc29sZSAhPT0gJ29iamVjdCcpIHtcbiAgICBjb25zb2xlID0ge1xuICAgICAgICBsb2c6IGZ1bmN0aW9uKCkge30sXG4gICAgICAgIGRlYnVnOiBmdW5jdGlvbigpIHt9LFxuICAgICAgICBpbmZvOiBmdW5jdGlvbigpIHt9LFxuICAgICAgICB3YXJuOiBmdW5jdGlvbigpIHt9LFxuICAgICAgICBlcnJvcjogZnVuY3Rpb24oKSB7fSxcbiAgICAgICAgYXNzZXJ0OiBmdW5jdGlvbigpIHt9LFxuICAgICAgICBjbGVhcjogZnVuY3Rpb24oKSB7fSxcbiAgICAgICAgZGlyOiBmdW5jdGlvbigpIHt9LFxuICAgICAgICBkaXJ4bWw6IGZ1bmN0aW9uKCkge30sXG4gICAgICAgIHRyYWNlOiBmdW5jdGlvbigpIHt9LFxuICAgICAgICBncm91cDogZnVuY3Rpb24oKSB7fSxcbiAgICAgICAgZ3JvdXBDb2xsYXBzZWQ6IGZ1bmN0aW9uKCkge30sXG4gICAgICAgIGdyb3VwRW5kOiBmdW5jdGlvbigpIHt9LFxuICAgICAgICB0aW1lOiBmdW5jdGlvbigpIHt9LFxuICAgICAgICB0aW1lRW5kOiBmdW5jdGlvbigpIHt9LFxuICAgICAgICBwcm9maWxlOiBmdW5jdGlvbigpIHt9LFxuICAgICAgICBwcm9maWxlRW5kOiBmdW5jdGlvbigpIHt9LFxuICAgICAgICBjb3VudDogZnVuY3Rpb24oKSB7fSxcbiAgICAgICAgZXhjZXB0aW9uOiBmdW5jdGlvbigpIHt9LFxuICAgICAgICB0YWJsZTogZnVuY3Rpb24oKSB7fVxuICAgIH07XG59XG5cbiQod2luZG93KS5sb2FkKEdhbWVNYW5hZ2VyLmluaXQpO1xuc2V0VGltZW91dChwYXNzdGltZSwgMzAwMCk7XG4iXX0=
