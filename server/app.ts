const express = require('express');
const app = express();

app.get("/", (req:any, res:any) => {
    res.send('Hello World!')
});

app.listen(8080, () => {
    console.log("Server running on port 8080");
});