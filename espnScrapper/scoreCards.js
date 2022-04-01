const request = require("request");
const cheerio = require("cheerio");

function getInfoFromScoreCard(url) {
    console.log("from scorecards.js:", url);
    request(url, cb);
}

function cb(err, res, body) {
    if (err) {
        console.log("error", err);
    } else {
        extractAllMatchLink(body);
    }
}
module.exports = {
    gifs: getInfoFromScoreCard,
};
