/**
 * Created by KC on 24/01/2017.
 * Express web server playground
 */

const express = require('express');

var app = express();

app.get('/',(req, res) => {
    res.send('First response');
});

app.get('/about',(req, res) => {
    res.send('First response');
});

app.listen(3000);