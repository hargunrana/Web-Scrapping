const request = require("request");
const cheerio = require("cheerio");
// cheerio
// it parses HTML and traverses the htmlo that data  can be manipulated according to user's needs
request("https://www.worldometers.info/coronavirus/", cb);

function cb(err, res, body) {
    if (err) {
        console.log("error", err);
    } else {
        handleHtml(body);
    }
}

function handleHtml(body) {
    let selecTool = cheerio.load(body);

    let coronaStats = selecTool(".maincounter-number");
    // console.log(coronaStats.text());

    let totalCases = selecTool(coronaStats[0]).text();
    console.log("Total Cases:", totalCases);

    let totalDeaths = selecTool(coronaStats[1]).text();
    console.log("Total Deaths:", totalDeaths);

    let totalRecovered = selecTool(coronaStats[2]).text();
    console.log("Total Recovered:", totalRecovered);
}
