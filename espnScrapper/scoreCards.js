const request = require("request");
const cheerio = require("cheerio");

function getInfoFromScoreCard(url) {
    // console.log("from scorecards.js:", url);
    request(url, cb);
}

function cb(err, res, body) {
    if (err) {
        console.log("error", err);
    } else {
        getMatchDetails(body);
    }
}
function getMatchDetails(html) {
    // selector tool contains html of i-th scorecard
    let selecTool = cheerio.load(html);
    // let desc = selecTool(".match-header-info.match-info-MATCH");
    let desc = selecTool(".header-info");

    let descArr = desc.text().split(",");

    // 1) get venue
    let venueOfMatch = descArr[1];

    // 2) get date
    let dateOfMatch = descArr[2];

    console.log("Date:", dateOfMatch, "\nVenue:", venueOfMatch);
    // 3) get team names
    // 4) get results
    let matchResElem = selecTool(
        ".match-info.match-info-MATCH.match-info-MATCH-half-width>.status-text"
    );
    console.log("Result:", matchResElem.text());
}

module.exports = {
    gifs: getInfoFromScoreCard,
};
