const express = require("express");
const { AsyncFunction } = require("./amazon.js");
const app = express();
const port = 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use((req, res, next) => {
    console.log(`Request from: ${req.ip}:${port}`);
    next();
});

app.post('/run', (req, res) => {
    const { link } = req.body;

    if (!link) {
        return res.status(400).json({'Error': 'Link is required'});
    }
    
    AsyncFunction(link).then(result => {    
        console.log(result);
        res.status(200).json(result);
    }).catch(err => {
        console.error(err);
        res.status(500).json({'Error': 'Internal Server Error'});
    });
});

app.listen(port, '0.0.0.0', () => {
    console.log(`Server is listening at port :${port}`);
});

