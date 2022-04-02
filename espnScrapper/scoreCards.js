const request = require("request");
const cheerio = require("cheerio");

function getInfoFromScoreCard(url) {
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
    let selecTool = cheerio.load(html); // selector tool contains html of i-th scorecard

    let desc = selecTool(".header-info"); // let desc = selecTool(".match-header-info.match-info-MATCH");

    let descArr = desc.text().split(",");

    //------------------------->Get Match Venue<-------------------------
    let venueOfMatch = descArr[1];

    //------------------------->Get Match Date<-------------------------
    let dateOfMatch = descArr[2];
    console.log("\nDate:", dateOfMatch, "\nVenue:", venueOfMatch);

    //------------------------->Get Team Names<-------------------------
    let teamsArr = selecTool(".name-detail>.name-link");

    let team1 = selecTool(teamsArr[0]).text();
    let team2 = selecTool(teamsArr[1]).text();
    console.log(team1, "VS", team2);

    //------------------------->Get Results<-------------------------
    let matchResElem = selecTool(
        ".match-info.match-info-MATCH.match-info-MATCH-half-width>.status-text"
    );
    console.log("Result:", matchResElem.text(), "\n");

    //------------------------->Get Innings<-------------------------

    let allBatsmenTable = selecTool(".table.batsman tbody");
    console.log(
        "no of batsmen table are:",
        selecTool(allBatsmenTable).length,
        "\n"
    );

    // let htmlString = ""; just to extract the html file for the innings table

    for (let i = 0; i < allBatsmenTable.length; i++) {
        // htmlString += selecTool(allBatsmenTable[i]).html();

        let allRows = selecTool(allBatsmenTable[i]).find("tr"); // get the descendants(table rows) of each element(table)

        for (let j = 0; j < allRows.length; j++) {
            // check to see if any of the matched elements have the given className
            let row = selecTool(allRows[j]);
            let firstColumnInRow = row.find("td")[0];

            if (selecTool(firstColumnInRow).hasClass("batsman-cell")) {
                //will get valid data
                // name | runs | balls | 4's | 6's | sr
                let playerName = selecTool(row.find("td")[0]).text();
                let runs = selecTool(row.find("td")[2]).text();
                let balls = selecTool(row.find("td")[3]).text();
                let numOf4 = selecTool(row.find("td")[5]).text();
                let numOf6 = selecTool(row.find("td")[6]).text();
                let sr = selecTool(row.find("td")[7]).text();

                console.log(
                    `${playerName} | ${runs} | ${balls} | ${numOf4} | ${numOf6} | ${sr} `
                );
                console.log("--------------------------------------------");
            }
        }
    }
}

module.exports = {
    gifs: getInfoFromScoreCard,
};
