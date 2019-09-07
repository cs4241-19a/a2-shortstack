const express = require('express'),
    bodyParser = require('body-parser'),
    server = express(),
    dir = '/public/',
    port = 3000;

let links = [
    {'name': 'Vue.js', 'tags': ['library', 'javascript', 'typescript', 'programming'], 'url': 'http://vuejs.org'},
    {'name': 'React.js', 'tags': ['library', 'javascript', 'typescript', 'programming'], 'url': 'http://reactjs.org'},
    {'name': 'Angular', 'tags': ['library', 'javascript', 'typescript', 'programming'], 'url': 'http://angular.io'},
    {'name': 'Facebook', 'tags': ['social media', 'news'], 'url': 'http://facebook.com'},
    {'name': 'Feedly', 'tags': ['rss', 'news'], 'url': 'http://feedly.com'},
];

server.set('port', process.env.PORT || port);

server.use(bodyParser.json()); // support json encoded bodies
server.use(bodyParser.urlencoded({extended: true})); // support encoded bodies
server.use(express.static(__dirname + '/public'));

server.get('/', function (req, res) {
    res.sendFile(__dirname + dir + 'index.html');
});

server.get('/links', (request, response) => {
    let links = getLinks();
    response.json(links);
});

server.post('/api/addLink', function (req, res) {
    let link = req.body;
    let duplicate = false;

    if (!link.name || !link.url) {
        res.send('empty');
        return;
    }


    if (!/^https?:\/\//i.test(link.url)) {
        link.url = 'http://' + link.url;
    }
    link.name = link.name.charAt(0).toUpperCase() + link.name.slice(1);
    link.tags = link.tags.split(',');
    links.filter(l => {
        if ((l.name.toLowerCase() === link.name.toLowerCase() || l.url.toLowerCase() === link.url.toLowerCase()) && !link.isEdit) {
            res.send('duplicate');
            duplicate = true;
        }
    });

    if (duplicate) {
        return;
    }

    if (link.isEdit) {
        console.log(`editing ${link.name}`);
        links[link.isEdit] = link;
        res.send(true);
    }

    if (!duplicate && !link.isEdit) {
        links.push(link);
        res.send(true);
    }
});

server.post('/api/deleteLink', function (req, res) {
    let index = parseInt(req.body.index);
    links.splice(index, 1);
    res.send(true);
});

server.get('/links/:tag', function (req, res) {
    console.log("tag is " + req.params.tag);
    let links = getLinks(req.params.tag);
    res.json(links);
});

server.listen(port, function () {
    console.log(`Bookmarker app listening on port ${port}!`);
});

server.use(function (req, res, next) {
    res.status(404).sendFile(__dirname + dir + '404.html');
});

const getLinks = (tag) => {
    if (tag) {
        let filteredLinks = links.filter(data => {
            let hasTag = data.tags.filter(t => {
                return t.trim().toLowerCase() === tag.trim().toLowerCase();
            });
            return (hasTag !== undefined && hasTag.length > 0);
        });
        for (let i = 0; i < filteredLinks.length; i++) {
            let url = filteredLinks[i].url;
            let icon = 'https://findicons.com/files/icons/1036/function/48/warning.png';
            if (url) {
                icon = `https://s2.googleusercontent.com/s2/favicons?domain=${url}`;
            }
            filteredLinks[i]['icon'] = icon;
        }
        return filteredLinks;
    } else {
        for (let i = 0; i < links.length; i++) {
            let url = links[i].url;
            let icon = 'https://findicons.com/files/icons/1036/function/48/warning.png';
            if (url) {
                icon = `https://s2.googleusercontent.com/s2/favicons?domain=${url}`;
            }
            links[i]['icon'] = icon;
        }
        return links;
    }
};
