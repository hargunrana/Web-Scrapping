const request = require("request");
const cheerio = require("cheerio");

//Included modules
const { goToIssues } = require("./getIssues");

function getProjects(link) {
    // console.log("link from getprojects.js:", link);
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
        let projectName = selecTool(projectNamesArr[i]).text().trim();
        console.log("ProjectName: ", projectName);

        let relativeLink = selecTool(projectNamesArr[i]).attr("href");
        // console.log(relativeLink);

        let finalLink = "https://github.com" + relativeLink + "/issues";
        // console.log(finalLink); //https://github.com/mrdoob/three.js

         goToIssues(finalLink);

        //break;
    }
}

module.exports = {
    getProjects: getProjects,
};
