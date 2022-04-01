const request = require("request");
const cheerio = require("cheerio");
const { gifs } = require("./scoreCards");
let url = "https://www.espncricinfo.com/series/ipl-2020-21-1210595";

request(url, cb);

function cb(err, res, body) {
    if (err) {
        console.log("error", err);
    } else {
        extractAllMatchLink(body);
    }
}

function getAllMatch(url) {
    // console.log("from allmatch.js:", url);
    request(url, cb);
}

function extractAllMatchLink(html) {
    let selecTool = cheerio.load(html);
    let scorecardElemArr = selecTool('a[data-hover="Scorecard"]');

    for (let i = 0; i < scorecardElemArr.length; i++) {
        let scorecardLink = selecTool(scorecardElemArr[i]).attr("href");

        let fullLink = "https://www.espncricinfo.com" + scorecardLink;

        gifs(fullLink);
        break;
    }
}

module.exports = {
    getAllMatch: getAllMatch,
};
