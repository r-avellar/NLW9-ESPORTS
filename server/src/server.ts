import express from 'express';

const app = express();

app.get('/ads', (req, res)=> {
    return res.json([
        {id:1, name: "VAI TOMA NO TU"},
        {id:2, name: "VAI TOMA NO TU"},
    ])
});

app.listen(3333);