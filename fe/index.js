const express=require('express');
const serveStatic=require('serve-static');
const https = require('https');
const fs = require('fs');


var hostname="localhost";
var port=3001;


var app=express();
var bunyan = require('bunyan');
var log = bunyan.createLogger({name:'FrontEnd'})

app.use(function(req,res,next){
    log.info(req.url);
    log.info(req.method);
    log.info(req.path);
    log.info(req.query.id);
    //Checking the incoming request type from the client
    if(req.method!="GET"){
        res.type('.html');
        var msg='<html><body>This server only serves web pages with GET request</body></html>';
        res.end(msg);
    }else{
        next();
    }
});


app.use(serveStatic(__dirname+"/public"));


app.get("/", (req, res) => {
    res.sendFile("/public/home.html", { root: __dirname });
});


// app.listen(port,hostname,function(){
//     console.log(`Server hosted at http://${hostname}:${port}`);
// });

https.createServer({
    key: fs.readFileSync("./key.pem"),
    cert: fs.readFileSync("./cert.pem"),
    passphrase: 'password1234'
}, app).listen(port);