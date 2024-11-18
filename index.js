require("dotenv").config();
const express = require('express');
const cors = require('cors');
const router = require('./router/index');
const sequelize = require('./dbAdmin');
const model =require('./models/models');

PORT = process.env.PORT || 5001;

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api", router);


const start = async () => {
    try {
        await sequelize.authenticate();
        await sequelize.sync();
        app.listen(PORT, () => {console.log(`Server started on port ${PORT}`)})
    }catch(err) {
        console.error(err);
    }
}

start().then()



