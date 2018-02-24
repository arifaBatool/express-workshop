var formidable = require('express-formidable');
var express = require('express');
var fs = require('fs');
var app =  express();

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
            }
            );
        }
        else
            console.log(error);

    });

});

app.get('/get-posts', function (req, res) {
    res.sendFile(__dirname + '/data/posts.json');

    });



app.listen(3000, function () {
    console.log('Server is listening on port 3000. Ready to accept requests!');
});