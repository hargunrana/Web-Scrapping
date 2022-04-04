const request = require("request");
const cheerio = require("cheerio");

function goToIssues(link) {
    // console.log("link from getIssues.js : ", link);
    request(link, cb);
}

function cb(err, res, body) {
    if (err) {
        console.log("Error");
    } else {
        getIssues(body);
    }
}

function getIssues(html) {
    let selecTool = cheerio.load(html);

    console.log("Issues:");
    let issuesArr = selecTool('a[data-hovercard-type="issue"]');
    // console.log(issuesArr.length);
    for (let i = 0; i < issuesArr.length; i++) {
        let IssueName = selecTool(issuesArr[i]).text();

        let relativeLink = selecTool(issuesArr[i]).attr("href");
        let IssueLink = "https://github.com" + relativeLink;

        console.log(
            "\n",
            i + 1,
            ")    Issue Name: ",
            IssueName,
            "\n\tIssue Link: ",
            IssueLink
        );
    }
}

module.exports = {
    goToIssues: goToIssues,
};
