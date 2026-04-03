const http = require('http');
const fs = require('fs');

//Creating web server
//Contains Callback Handler function to handle incoming web requests onto this server

//Always try to perform non blocking tasks inside this server to prevent blocking of  user requests
const myServer = http.createServer((req, res) => {          //req - request object ,res - response 
    const log = `${Date.now()} ${req.url} New Request Received \n`
    fs.appendFile('log.txt', log, (err, data) => {
    // res.end("Hello from Server");
    switch(req.url)
    {
        case '/': res.end('Home Page')
        break;
        case '/about': res.end('About Page')
        break; 
        default:
            res.end('404 Not Found')
    }
    })
    // console.log(req)
});


//To run this server, we need a port number
//On that port number we will make this server listen to incoming requests
myServer.listen(8000, () => console.log("Server Started ! "));
