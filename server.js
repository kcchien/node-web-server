/**
 * Created by KC on 24/01/2017.
 * Express web server playground
 */

const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

const listenPort = 3000;

let app = express();

// register partials template
// before app.set
hbs.registerPartials(__dirname + '/views/partials');

// set view engine using hbs
app.set('view engine', 'hbs');

// use middleware
// middleware mounted without a path will be executed for every request to the app.
// 有request進來時會觸發
// call next when done
app.use((req, res, next) => {

    let now = new Date().toString();
    let log = `${now}: ${req.method} ${req.url}`;

    console.log(log);

    // 把LOG資訊寫入檔案
    fs.appendFile('server.log',log + '\n', (err) => {
        if(err){
            console.log('Unable to append to server log.');
        }
    });
    // 有呼叫next才會往下執行
    next();
});

// use middleware to interrupt page load
// app.use((req, res, next) => {
//     res.render('maintenance.hbs');
// });

// serve static content
// use middleware
app.use(express.static(__dirname + '/public'));

// register Helper
hbs.registerHelper('getCurrentYear', () => {
    return new Date().getFullYear();
});

hbs.registerHelper('screamIt', (text) => {
    return text.toUpperCase();
});

app.get('/', (req, res) => {
    res.render('home.hbs',{
        pageTitle:'Home Page',
        welcomeMessage: 'Welcome to Home'
    });
});

app.get('/about', (req, res) => {
    res.render('about.hbs', {
        pageTitle: 'About Page',
    });
});

app.get('/bad', (req, res) => {
    res.send({
            errorMessage: 'Unable to handle request.'
        }
    );
});

app.listen(listenPort, () => {
    console.log(`Server is running up on ${listenPort}`);
});