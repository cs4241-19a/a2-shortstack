'use strict';

import CONSTANTS from './public/js/constants.mjs';

const http = require('http'),
    fs = require('fs'),
    mime = require('mime'),
    //database stuff
    router = require('./postHandlers/postRequestRouter'),
    //port
    port = 3000;


//Helper function for file name from url
exports.getFileName = function getFileName(url) {
    if (url === '/') {
        return './public/index.html'
    }
    return '.' + url;
};

//we can have this return a promise for a file, then have
//the server wait for it
exports.getFile = function getFile(url) {
    // we create a promise that will only return once the file is created,
    // or will return an error if there is no file with that name
    return new Promise(function (resolve, reject) {
        fs.readFile(exports.getFileName(url), function (err, content) {
            if (err) {
                reject(new Error("404 file not found"))
            }
            resolve(content);
        })
    });
};

const server = http.createServer(function (request, response) {
    if (request.method === 'GET') {
        exports.getFile(request.url)
            .then(file => {
                const type = mime.getType(exports.getFileName(request.url));
                response.writeHead(200, {'Content-Type': type});
                response.end(file)
            })
            .catch(err => {
                response.statusCode = 404;
                response.statusMessage = "File not found with error: " + err;
                response.end();
            });
    } else if (request.method === 'POST') {
        response.writeHead(200, "OK", {'Content-Type': 'text/plain'});
        console.log(request.url);
        //figure out which function the user wants to call
        let requestOutput=null;

        //resolve the request based on the url
        if(request.url === CONSTANTS.SUBMIT) {
            requestOutput=router.updateItems(request);
        } else if(request.url === CONSTANTS.REMOVE){
            requestOutput=router.deleteItem(request);
        } else if(request.url === CONSTANTS.GETALL){
            requestOutput=router.getAllGroceryItems(request);
        } else if(request.url === CONSTANTS.PURCHASE){
            requestOutput=router.togglePurchase(request);
        }
        //then resolve it
        if(requestOutput){
            requestOutput.then(allItems => {
                if (allItems) {
                    //send the response a json string
                    response.end(JSON.stringify(allItems));
                }
            });
        }
        else{
            console.log("no url match");
            response.end();
        }
    }
});


server.listen(process.env.PORT || port);
