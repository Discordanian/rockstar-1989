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
        'room mate',
        'friend with benefits'
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
        'the pub',
        'the coffee shop',
        'the book store you go to when you want to pretend you have been to college',
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
