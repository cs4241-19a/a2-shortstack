const http = require('http'),
    express = require('express'),
    fs = require('fs'),
    request = require('request'),
    cors = require('cors'),
    querystring = require('querystring'),
    cookieParser = require('cookie-parser'),
    mime = require('mime'),
    app = express(),
    dir = 'public/',
    port = 3000,
    client_id = process.env.CLIENT_ID,
    client_secret = process.env.CLIENT_SECRET,
    redirect_uri = process.env.spotify_callback

let stateKey = 'spotify_auth_state'

app.use(express.static('public'))
app.use(cookieParser())

let queue = []

app.get('/login', (req, res) => {
    let state = generateRandomString(16);
    res.cookie(stateKey, state);

    // your application requests authorization
    let scope = ''
    console.log('redirecting to spotify login')
    res.redirect('https://accounts.spotify.com/authorize?' +
        querystring.stringify({
            response_type: 'code',
            client_id: client_id,
            scope: scope,
            redirect_uri: redirect_uri,
            state: state
        }));
})

app.get('/queue', (req, res) => {
    res.json(queue)
})

app.get('/search', (req, res) => {
    let query = req.query.query

    let song = req.query.song ? 'track' : null
    let artist = req.query.artist ? 'artist' : null
    let album = req.query.album ? 'album' : null
    let playlist = req.query.playlist ? 'playlist' : null
    let type = [song, artist, album, playlist].filter(Boolean).join(",")
    let data = querystring.stringify({
        q: query,
        type: type
    })
    let options = {
        url: `https://api.spotify.com/v1/search?${data}`,
        headers: {
            'Authorization': 'Bearer ' + access_token
        },
    }
    request.get(options)
        .on('body', (res) => console.log(res))
    res.sendStatus(200)

})

app.get('/add', (req, res) => {
    queue.push({
        id: req.query.id.trim(),
        title: req.query.title.trim(),
        artist: req.query.artist.trim(),
        album: req.query.album.trim(),
        adder: req.query.adder.trim(),
        duration: parseInt(req.query.duration),
        startTime: queue[queue.length - 1] ? queue[queue.length - 1].startTime + queue[queue.length - 1].duration : new Date().getTime()
    })
    console.log(queue[queue.length - 1])
    res.sendStatus(200)

})

app.get('/callback', (req, res) => {
    let code = req.query.code || null;
    let state = req.query.state || null;
    let storedState = req.cookies ? req.cookies[stateKey] : null;

    if (state === null || state !== storedState) {
        res.redirect('/#' +
            querystring.stringify({
                error: 'state_mismatch'
            }));
    } else {
        console.log('correct state')
        res.clearCookie(stateKey);
        let authOptions = {
            url: 'https://accounts.spotify.com/api/token',
            form: {
                code: code,
                redirect_uri: redirect_uri,
                grant_type: 'authorization_code'
            },
            headers: {
                'Authorization': 'Basic ' + (new Buffer(client_id + ':' + client_secret).toString('base64'))
            },
            json: true
        };

        request.post(authOptions, function(error, response, body) {
            if (!error && response.statusCode === 200) {
                console.log('no errors')
                let access_token = body.access_token,
                    refresh_token = body.refresh_token;

                let options = {
                    url: 'https://api.spotify.com/v1/me',
                    headers: {
                        'Authorization': 'Bearer ' + access_token
                    },
                    json: true
                };

                // use the access token to access the Spotify Web API
                // request.get(options, function(error, response, body) {
                //     console.log(body);
                // });

                // we can also pass the token to the browser to make requests from there
                res.cookie('spotify_access_token', access_token)
                res.cookie('spotify_refresh_token', refresh_token)
                // res.redirect('/#' +
                //     querystring.stringify({
                //         access_token: access_token,
                //         refresh_token: refresh_token
                //     }));
                res.redirect('/#');
            } else {
                res.redirect('/#' +
                    querystring.stringify({
                        error: 'invalid_token'
                    }));
            }
        });
    }
})

app.get('/refresh_token', (req, res) => {
    // requesting access token from refresh token
    let refresh_token = req.query.refresh_token;
    let authOptions = {
        url: 'https://accounts.spotify.com/api/token',
        headers: {
            'Authorization': 'Basic ' + (new Buffer(client_id + ':' + client_secret).toString('base64'))
        },
        form: {
            grant_type: 'refresh_token',
            refresh_token: refresh_token
        },
        json: true
    };

    request.post(authOptions, function(error, response, body) {
        if (!error && response.statusCode === 200) {
            let access_token = body.access_token;
            res.send({
                'access_token': access_token
            });
        }
    });
})

function generateRandomString(length) {
    let text = '';
    let possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

    for (let i = 0; i < length; i++) {
        text += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return text;
};

const sendFile = function(response, filename) {
    console.log(filename);
    const type = mime.getType(filename)

    fs.readFile(filename, function(err, content) {

        // if the error = null, then we've loaded the file successfully
        if (err === null) {

            // status code: https://httpstatuses.com
            response.writeHeader(200, {
                'Content-Type': type
            })
            response.end(content)

        } else {

            // file not found, error code 404
            response.writeHeader(404)
            response.end('404 Error: File Not Found')

        }
    })
}

app.listen(process.env.PORT || port, () => console.log(`Listening on port ${port}`))
