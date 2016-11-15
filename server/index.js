var path = require('path');
var express = require('express');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var api = require('./api');
var utils = require('./utils');
var prerender = require('prerender-node');

var app = express();

var clientPath = path.join(__dirname, '../client');

prerender.set('prerenderToken', process.env.PRERENDER_TOKEN);

app.use(prerender);
app.use(express.static(clientPath));
app.use(cookieParser());
app.use(bodyParser.json());

app.use('/api', api);

app.get('*', function (req, res, next) {
    if (utils.isAsset(req.url)) {
        return next();
    } else {
        res.sendFile(path.join(clientPath, 'index.html'));
    }
});

app.listen(process.env.PORT || 3000);
