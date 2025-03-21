const express = require("express");
const app = express();
const mongoose = require("mongoose");
const path = require("path");
const images = require("./models/images");

app.use(express.static("public"));
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());


mongoose.connect("mongodb://127.0.0.1:27017/fakeimages")
    .then(() => console.log("Connected to DB"))
    .catch(err => console.log(err));


app.get("/", (req, res) => {
    res.render("index.ejs");
});


app.get("/fake-image-detector", async (req, res) => {
    const allimg = await images.find({});
    res.render("imgdet.ejs", { allimg });
});


app.post("/analyze-image", async (req, res) => {
    const { imgLink } = req.body;

    if (!imgLink) {
        return res.redirect("/fake-image-detector");
    }

    try {

        const imageRecord = await images.findOne({ image: imgLink });

        let isFake = !!imageRecord; 
        let confidence = isFake ? Math.floor(Math.random() * 26) + 75 : null;
        let isInvalid = false;

        const response = await fetch(imgLink, { method: 'HEAD' });
        if (!response.ok || !response.headers.get('content-type')?.startsWith('image')) {
            isInvalid = true;
        }

        res.render("result.ejs", { imgLink, isFake, confidence, isInvalid });

    } catch (error) {
        console.error("Error analyzing image:", error);
        res.render("result.ejs", { imgLink: null, isFake: false, confidence: null, isInvalid: true });
    }
});

app.get("/contact", (req, res) => {
    res.render("contact.ejs");
});

app.get("/news", (req, res) => {
    res.render("news.ejs");
});
app.get("/how-it-works", (req, res) => {
    res.render("how.ejs");
});

app.get("/blog", (req,res) => {
    res.render("blog.ejs");
});

app.get("/fake-video-detector", (req,res) => {
    res.render("viddet.ejs");
});
app.post("/analyze-video", async (req, res) => {
    const { imgLink } = req.body;

    if (!imgLink) {
        return res.redirect("/fake-video-detector");
    }

    try {

        const imageRecord = await images.findOne({ image: imgLink });

        let isFake = !!imageRecord; 
        let confidence = isFake ? Math.floor(Math.random() * 26) + 75 : null;
        let isInvalid = false;

        const response = await fetch(imgLink, { method: 'HEAD' });
        if (!response.ok || !response.headers.get('content-type')?.startsWith('image')) {
            isInvalid = true;
        }

        res.render("resultvid.ejs", { imgLink, isFake, confidence, isInvalid });

    } catch (error) {
        console.error("Error analyzing video:", error);
        res.render("resultvid.ejs", { imgLink: null, isFake: false, confidence: null, isInvalid: true });
    }
});

app.get("/about", (req, res) => {
    res.render("about.ejs");
});

app.post("/", (req, res) => {
    let {uname, umail, umobile, umsg} = req.body;
    console.log(`User Name: ${uname}\nUser Email: ${umail}\nUser Mobile No.: ${umobile}\nUser Message: ${umsg}`);
    res.redirect("/");
});



app.listen(8080, () => {
    console.log("Server is running on port 8080");
});
