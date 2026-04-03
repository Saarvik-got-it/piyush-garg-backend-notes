const http = require('http');
const fs = require('fs');
const url = require('url');
const express = require('express');

//              <<<---HTTP Server--->>>
function myHandler(req, res) {
     if(req.url === '/favicon.ico') return res.end();

    const log = `${Date.now()} ${req.method} ${req.url} New Request Received \n`;
    const myUrl = url.parse(req.url, true)
    console.log(myUrl);

    fs.appendFile('log.txt', log, (err, data) => {
    
    switch(myUrl.pathname)
    {
        case '/': 
        if(req.method === 'GET')  res.end('Home Page')
        break;
        case '/about': 
            const username = myUrl.query.myName
            res.end(`Hi, my name is ${username}`)
            break; 
        case '/search':
            const search = myUrl.query.search_query;
            res.end('Here are your results for ' + search);
        case '/signup':
            if(req.method === 'GET') res.end('This is the signup form');
            else if(req.method === 'POST') {
                //DB query
                res.end('Login Successfull');
            }
            break;
        default:
            res.end('404 Not Found')
    }   
    })
}

// const myServer = http.createServer(myHandler);
// myServer.listen(8000, () => console.log("Server Started ! "));
//------------------------------------------------------------------------------------------------------------------------





//              <<<---EXPRESS App--->>>

//Creates an express app (similar to a handler function in HTTP server)
const app = express();

app.get('/', (req, res) => {
    res.send("This is the home page");
})

app.get('/about', (req, res) => {
    res.send(`I am ${req.query.name}`);
})

// const myServer = http.createServer(app);
// myServer.listen(8000, () => console.log("Server Started ! "));

app.listen(8000, () => console.log("Server Started !"));    