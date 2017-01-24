// Tweeting Doorbell (c) 2017 Charlton Trezevant
// MIT License
// Enjoy!
var CONFIG = require('./config.js'); // Configuration file
var j5 = require('johnny-five');
var CHIP = require("chip-io");
var board = new j5.Board({
    io: new CHIP()
});

var Twit = require('twit');
var T = new Twit(CONFIG.TWITTER_API_KEYS);

board.on("ready", function() {
    postInitialStatus();
    var bell = new j5.Button(CONFIG.BELL.pin);
    bell.on('hit', sendPress);
});

function sendPress() {
    // Debounces tweet notifications: only send a tweet if one has not yet been sent
    // OR if a subsequent press has happened in a time equal to or greater than the defined time to wait.

    if (CONFIG.BELL.lastTweetSent === null || elapsedTime(CONFIG.BELL.lastTweetSent, Date.now()) >= CONFIG.BELL.debounceTime) {
        notify(CONFIG.COMMAND_RESPONSE_MAP.doorbellNotification());
        CONFIG.BELL.lastTweetSent = Date.now();
    }
}

function postInitialStatus() {
    // Send a tweet whenever this script is started for status display. 
    T.post('statuses/update', {
        status: CONFIG.COMMAND_RESPONSE_MAP.startup.response()
    }, function(err, data, response) {
        if (err)
            console.info("[" + getTime() + "] BELLBOT_DEBUG: " + JSON.stringify(err));
    });
}

function notify(text) {
    var users = "";

    for (var i = 0; i < CONFIG.AUTHORIZED_USERS.length; i++)
        users += '@' + CONFIG.AUTHORIZED_USERS[i] + ' ';

    // remove trailing whitespace
    if (users[users.length - 1] == " ")
        users = users.slice(0, users.length - 1);

    var params = {
        status: text.replace('<USER>', users),
    };

    T.post('statuses/update', params, function(err, data, response) {
        if (err)
            console.info("[" + getTime() + "] DOORBOT_DEBUG: " + JSON.stringify(err));
    });
}

// Computes elapsed time (for debouncing)
function elapsedTime(startTime, endTime) {
    return ((endTime - startTime) / 1000);
}

// Converts the current time to a more human-readable format (for notification timestamping)
function getTime() {
    var dt = new Date();
    var hours = (dt.getHours() % 12 || 12);
    var minutes = dt.getMinutes();

    // ensure minutes always 2 digits
    if (dt.getMinutes() < 10)
        minutes = "0" + minutes;

    return hours + ":" + minutes;
}
