const request = require("request");
const cheerio = require("cheerio");

//Included modules
const { getIssues } = require("./getIssues");

function getProjects(link) {
    console.log("link from getprojects.js:", link);
    request(link, cb);
}

function cb(err, res, body) {
    if (err) {
        console.log("Error");
    } else {
        goToProject(body);
    }
}

function goToProject(html) {
    let selecTool = cheerio.load(html);
    let projectNamesArr = selecTool('h3>a[class="text-bold wb-break-word"]');

    for (let i = 0; i < 8; i++) {
        console.log(selecTool(projectNamesArr[i]).text());

        let relativeLink = selecTool(projectNamesArr[i]).attr("href");
        console.log(relativeLink);

        let finalLink = "https://github.com" + relativeLink;

        getIssues(body);
        break;
    }
}

module.exports = {
    getProjects: getProjects,
};
