module.exports = {
    BOT_NAME: 'in_garage',
    TWITTER_URL: "https://twitter.com/in_garage",
    TWITTER_API_KEYS: {
        consumer_key: '',
        consumer_secret: '',
        access_token: '',
        access_token_secret: '',
    },
    COMMAND_RESPONSE_MAP: {
        startup: {
            response: function() {
                return "It's " + getTime() + " and the doorbell service has started #statusMsg";
            }
        },
        doorbellNotification: {
            response: function() {
                var responses = ["ding dong!", "someone's at the door", "you have a visitor"];
                return "<USER> " + getTime() + " : " + responses[Math.floor(Math.random() * responses.length)];
            }
        },
    },
    BELL: {
        pin: 4,
        debounceTime: 10, // Number of seconds to wait between tweet notifications.
        lastTweetSent: null 
    },
    AUTHORIZED_USERS: ["charltontrez", "sonyatrezevant", "jamestrezevant"],
    IP: process.env.OPENSHIFT_NODEJS_IP || "127.0.0.1",
    PORT: process.env.OPENSHIFT_NODEJS_PORT || process.env.PORT || 8082
};
