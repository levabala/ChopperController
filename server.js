console.log("Hello! That's a special control panel for chopper on IBR-2. \nYou can see a visual report on localhost:8558 in your browser\n");

var http = require('http');
var url = require('url');
var request = require('request');
var readline = require('readline');
var fs = require('fs');
var index = fs.readFileSync("./index.html");

setInterval(function () { index = fs.readFileSync("./index.html"); }, 400); //for debug

http.createServer(function (req, res) {
    var urlP = url.parse(req.url, true);
    console.log("HTTP Request: ", ((req.socket.remoteAddress == '127.0.0.1') ? "(you)" : "") + req.socket.remoteAddress + urlP.pathname);
    urlP.pathname = urlP.pathname.toString().split("/");
    switch (urlP.pathname[1]) {
        case "": {
            res.end(index);
            break;
        }
        case "aScripts": {
            switch (urlP.pathname[2]) {
                case "main.js": {
                    res.setHeader('Content-Type', 'application/javascript');
                    res.end(fs.readFileSync("./main.js"));
                    break;
                }
                case "client.js": {
                    res.setHeader('Content-Type', 'application/javascript');
                    res.end(fs.readFileSync("./client.js"));
                    break;
                }
            }
            break;
        }
        default: {
            res.end('What?');
            break;
        }
    }
}).listen(8558);


//console input
var chopperIP = "google.com";
var rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

var commandsToServer = {
    show: function(){
        callServer('show');
    },
    hide: function(){
        callServer('hide');
    },
    close: function(){
        callServer('close');
    },
    wpoints: function(){
        callServer('wpoints');
    },   
    axstart: function(params){
        callServer(params.join(" "));
    }//to be continued
};
var funs = {
    "help": function () { 
        var str = "Available commands: ";
        for (var f in funs) str += f + ", ";
        str = str.substring(0, str.length - 2); //delete two last elements ("," and " ")
        console.log(str);
    },
    "pingGoogle": function () {
        request('http://www.google.com', function (error, response, body) {
            if (!error && response.statusCode == 200) {
                console.log("Successful\n");
            }
            else console.error('ERROR\n');
        });
    },
    "say": function (what) {
        commandsToServer[what.shift()](what);
    }
};

rl.on('line', function (input) {
    var args = [];
    var fC = "";    
    if (input.indexOf(" ") != -1) {
        input = input.split(" ");        
        fC = input.shift();
        args = input;
    }
    else {
        fC = input;
    }        
    if (!funs[fC]) console.log('Invalid command. Enter "help" to get list of available commands');
    else {
        funs[fC](args);
        console.log("---\n");
    }
});

function callServer(body){
    request(chopperIP+'/?command='+encodeURI(body), function (error, response, body) {  //to rewrite
            if (!error && response.statusCode == 200) {
                console.log("Successful\n");
            }
            else console.error('ERROR\n');
        });
}
