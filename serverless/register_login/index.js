var regLog = require('./node_modules/regLog.node');

exports.handler = function(event, context) {
    var email = event["email"];
    // var name = event["name"];
    // var password = event["password"];
    // var location = event["location"];
    // var comments = event["comments"];
    // var regLog.registerLogin(name, email, password, location, comments, function(results) {

    regLog.registerLogin(email, function(results) {
        context.succeed(results);
    });
};
