let express = require("express");
let path = require("path");
let app = express();
let bodyParser = require("body-parser");
let session = require("express-session");

app.use(session({secret: 'codingdojorocks'}));
app.use(bodyParser.urlencoded({ extended: true }));
// setting up ejs and our views folder
app.set('views', path.join(__dirname, './views'));
app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname, './static')));
// root route to render the index.ejs view

// app.post('/', function(req, res){
//     req.session.count = 0;
// })



app.get('/', function(req, res) {
    if(req.session.num == null){
        req.session.num = Math.floor((Math.random()*100)+1);
    }
    context = {
        high: req.session.high,
        low: req.session.low,
        correct: req.session.correct,
    };
    res.render("index", context);
});

app.post('/process', function(req, res){
    req.session.high = "";
    req.session.low = "";
    req.session.correct = "";

    if(req.body.guess > req.session.num){
        req.session.high = "Too High!";
        console.log(req.session.high);
    }
    else if(req.body.guess < req.session.num){  
        req.session.low = "Too Low!";
        console.log(req.session.low);
    }
    else{
        req.session.correct = `${req.body.guess} was the number!`;
        console.log(req.session.correct);
    }
    
    res.redirect('/');
});

app.get('/again', function(req, res){
    req.session.num = null;
    req.session.correct = "";
    res.redirect('/');
});

// post route for adding a user
// app.post('/users', function(req, res) {
//  console.log("POST DATA", req.body);
//  This is where we would add the user to the database
//  Then redirect to the root route
//  res.redirect('/');
// })
// tell the express app to listen on port 8000
app.listen(8000, function() {
 console.log("listening on port 8000");
});
