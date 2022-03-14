const express = require("express");
const app = express();
let url = require('url');

app.use((req, res, next) => {
    res.append('Access-Control-Allow-Origin', ['*']);
    res.append('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.append('Access-Control-Allow-Headers', 'Content-Type');
    next();
});

app.use(express.json( {extended: true}));

app.get("/", (req, res) => {
    res.status(200);
    res.send("asd");
});

app.post("/", (req, res) => {
    res.status(201);
    res.send("SUCCESS");
});

app.listen(process.env.PORT || 2000, () => {
    console.log("Listening");
});