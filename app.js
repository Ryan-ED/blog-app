var express = require("express"),
app         = express(),
bodyParser  = require("body-parser"),
mongoose    = require("mongoose");

// APP CONFIG
app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}));

// MONGO MODEL CONFIG
mongoose.connect("mongodb://localhost/blog_app");

var blogSchema = new mongoose.Schema({
    title: String,
    image: String,
    body: String,
    created: {type: Date, default: Date.now}
});

var Blog = mongoose.model("Blog", blogSchema);

// Blog.create({
//     title: "Happy New Year!",
//     image: "https://cdn.pixabay.com/photo/2017/01/04/21/00/new-years-eve-1953253_960_720.jpg",
//     body: "It is now 2018. Wow. 2017 went by so fast. What are your new year's resolutions? Lorem Ipsum Dolor blar blar."
// });

// RESTFUL ROUTES

//INDEX
app.get('/', function(req, res) {
    res.redirect("/blogs");
});

app.get('/blogs', function(req, res) {
    Blog.find({}, function(err, blogs){
        if(err){
            console.log(err);
        }
        else {
            res.render("index", {blogs: blogs});
        }
    });
});

app.listen(3000, function() {
    console.log('App listening on port 3000!');
});