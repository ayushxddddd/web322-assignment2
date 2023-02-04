const {initialize,
    getAllPosts,
    getPublishedPosts,
    getCategories} = require('./blog-service');

const express = require('express');
const app = express();

// Use the static middleware to serve files from the public folder
app.use(express.static('public'));
const port = process.env.PORT || 8080;

// Redirect the "/" route to the "/about" route
app.get('/', (req, res) => {
    res.redirect('/about');
});

// Serve the about.html file on the "/about" route
app.get('/about', (req, res) => {
    res.sendFile(__dirname + '/views/about.html');
});

app.get('/blog', function(req, res) {
    getPublishedPosts().then((data) => {
        res.send(data);
    })
    .catch((err) => {
        res.send(err);
    })
    });
    
    app.get('/posts', function(req, res) {
    getAllPosts().then((data) => {
        res.send(data);
    })
    .catch((err) => {
        res.send(err);
    })
    });
    
    app.get('/categories', function(req, res) {
        getCategories ().then((data) => {
            res.send(data);
        })
        .catch((err) => {
            res.send(err);
        })
        });

    app.use(function(req, res) {
        res.status(404).send("Page Not Found");
        });

        module.exports = app;
// Listen on the specified port and output a message to the console

initialize().then(() => {
app.listen(port, () => {
console.log(`Server running at http://localhost:${port}`);
});
}).catch((error) => {
console.error(`Error starting server: ${error}`);
});
