module.exports = {
    BOT_NAME: 'in_garage',
    TWITTER_URL: "https://twitter.com/in_garage",
    TWITTER_API_KEYS: {
        consumer_key: ' ',
        consumer_secret: ' ',
        access_token: ' ',
        access_token_secret: ' ',
    },
    COMMAND_RESPONSE_MAP: {
        startup: {
            response: function() {
                return "It's " + getTime() + " and Bellhop has started #statusMsg";
            }
        },
        doorbellNotification: {
            response: function() {
                var responses = ["ding dong!", "someone's at the door.", "you have a visitor."];
                return "<USER> [" + getTime() + "]: " + responses[Math.floor(Math.random() * responses.length)];
            }
        },
    },
    BELL: {
	// Set pin to null and bellhop will use the onboard pushbutton by default, for testing
	// Otherwise refer to https://www.npmjs.com/package/chip-io for pin addressing information 
	pin: null,
        debounceTime: 180, // Number of seconds to wait between tweet notifications.
        lastTweetSent: null 
    },
    AUTHORIZED_USERS: ["charltontrez"],
};

function getTime() {
    var dt = new Date();
    var hours = (dt.getHours() % 12 || 12);
    var minutes = dt.getMinutes();

    // ensure minutes always 2 digits
    if (dt.getMinutes() < 10)
        minutes = "0" + minutes;

    return hours + ":" + minutes;
}
