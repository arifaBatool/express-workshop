var formidable = require('express-formidable');
var mustache = require('mustache-express');
var express = require('express');
var fs = require('fs');
var app =  express();

app.engine('mustache', mustache());
app.set('view engine', 'mustache');
app.set('views', './views');

app.use(express.static('public'));

app.use(formidable());

app.post('/create-post', function (req, res) {

    fs.readFile(__dirname + '/data/posts.json', function (error, file) {
        if (!error){
            var parsedFile = JSON.parse(file);
            parsedFile[Date.now()] = req.fields.blogpost;
            var data = JSON.stringify(parsedFile);
           fs.writeFile(__dirname + '/data/posts.json', data , function (error) {
               if (error) throw error
               else
                   res.redirect('/');
           });
        }
        else
            console.log(error);
    });
});

app.get('/get-posts', function (req, res) {
    res.sendFile(__dirname + '/data/posts.json');

    });

app.get('/posts/:postId', function (req, res) {
    fs.readFile(`${__dirname}/data/posts.json`, function (error, file) {
        if (!error) {
            var parsedFile = JSON.parse(file);
            var content = parsedFile[req.params.postId];
            res.render('post', {
                title: getTitle(content),
                post: content
            });
        }
    });

});

function getTitle(content) {
    return `Title # ${content.toString().length}`;

}

app.listen(3000, function () {
    console.log('Server is listening on port 3000. Ready to accept requests!');
});