const express = require('express');
const app = express();
const sequelize = require("../config/Database");
const models = require('../models/indexModel');

PORT = 4040;

const migration = async () => {
    try {
        await sequelize.authenticate();
        console.log('Database connected');
        const createdTable = sequelize.sync({force : true});

        if(createdTable) {
            console.log("Created table done");
        }

    } catch (error) {
        console.log("Connected database failed !");
    }
}

migration();


app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT} and Migration Successfully!`));