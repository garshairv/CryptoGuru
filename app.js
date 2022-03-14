const express = require("express");
const app = express();

app.use((req, res, next) => {
    res.append('Access-Control-Allow-Origin', ['*']);
    res.append('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.append('Access-Control-Allow-Headers', 'Content-Type');
    res.append({'X-Api-Key' : 'LCAI7w4plGGN4ytCYHhw2A==u1KYNraaqddRHd5N'}, 'headers');
    next();
});

app.use(express.json( {extended: true}));

app.get("/", (req, res) => {
    res.status(200);
    res.send(JSON.stringify("TEST"));
});

app.post("/", (req, res) => {
    res.status(201);
    res.send("SUCCESS");
});

app.listen(process.env.PORT || 2000, () => {
    console.log("Listening");
});