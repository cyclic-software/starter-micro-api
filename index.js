const express = require('express');
const app = express();
const PORT = 3000;

app.get('/', (res, req) => {
    res.json({message: "testing my app"})
})

app.listen(PORT, () => {
    console.log("server is listening on port ", PORT)
})