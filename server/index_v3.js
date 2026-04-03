//URL Manipulation 

const http = require('http');
const fs = require('fs');
const url = require('url');


const myServer = http.createServer((req, res) => {          

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
});


myServer.listen(8000, () => console.log("Server Started ! "));
