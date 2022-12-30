const express = require('express');
const app = express();
const db = require("../config/Database");

PORT = 4040;

db.authenticate()
.then(() => {
    console.log('connected..')
})
.catch(err => {
    console.log('Error'+ err)
})

db.sync({ force: false })
.then(() => {
    console.log('yes re-sync done!')
})

app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT} and Migration Successfully!`));