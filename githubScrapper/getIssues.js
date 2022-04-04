const request = require("request");
const cheerio = require("cheerio");

function getIssues(link) {
    console.log("link from getIssues.js : ", link);
    //request(link, cb);
}

function cb(err, res, body) {
    if (err) {
        console.log("Error");
    } else {
        goToIssues(body);
    }
}

function goToIssues(html) {
    console.log(html);
}

module.exports = {
    getIssues: getIssues,
};
