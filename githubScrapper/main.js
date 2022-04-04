const request = require("request");
const cheerio = require("cheerio");

//Imported Modules
const { getProjects } = require("./getProjects");

let url = "https://github.com/topics";

request(url, cb);

function cb(err, res, body) {
    if (err) {
        console.log("Error");
    } else {
        handleHtml(body);
    }
}

function handleHtml(html) {
    // console.log(html);
    let selecTool = cheerio.load(html);

    let topics = selecTool(
        ".col-lg-9.position-relative.pr-lg-5.mb-6.mr-lg-5 div .flex-column"
    );
    for (let i = 0; i < 3; i++) {
        // console.log("relative-link:", selecTool(topics[i]).attr("href"));

        let relativeLink = selecTool(topics[i]).attr("href");
        let finalLink = "https://github.com" + relativeLink;
        
        console.log(selecTool(topics[i]).text());

        getProjects(finalLink);

        break;
    }
}
