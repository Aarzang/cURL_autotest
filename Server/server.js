const http = require('http'); // Loads the http module 
const fs = require('fs').promises;
const host = 'localhost';
const port = 1337;

let sampleHTMLFile;

fs.readFile(__dirname + "/index.html")
    .then(contents => {
        sampleHTMLFile = contents;
    })
    .catch(err => {
        console.error(`Could not read index.html file: ${err}`);
        process.exit(1);
    });

const requestlistener = function (req, res) {

        switch (req.url) {
        case "/html":
            res.setHeader("Content-Type", "text/html");
            res.writeHead(200);
            res.end(sampleHTMLFile);
            break
        case "/json":
            res.setHeader("Content-Type", "application/json");
            res.writeHead(200);
            res.end(`{"message": "This is a JSON response"}`);
            break
        case "/csv":
            res.setHeader("Content-Type", "text/csv");
            res.setHeader("Content-Disposition", "attachment;filename=thisresponse.csv");
            res.writeHead(200);
            res.end(`action,type\nresponse,CSV`);
            break
        case "/interror":
            res.setHeader("Content-Type", "application/json");
            res.writeHead(500);
            res.end(JSON.stringify({error:"Internal server error"}));
            break
        case "/error404":
            res.setHeader("Content-Type", "application/json");
            res.writeHead(404);
            res.end(JSON.stringify({error:"Resource not found"}));
            break
        default:
            res.writeHead(200);
            res.end("Test response")
            }

};



const server = http.createServer(requestlistener)
server.listen(port, host, () => {
    console.log(`Server is running on http://${host}:${port}`);
}); // 4. Tells the server what port to be on
