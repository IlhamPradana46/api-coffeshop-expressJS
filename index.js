const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const helmet = require('helmet');   
const db = require('./src/config/Database');

require('dotenv').config();

const ProductRoutes = require('./src/routes/productRoute');
const AuthRoutes = require('./src/routes/authRoute');

const app = express();
const PORT = process.env.PORT;

app.use(cookieParser());
app.use(helmet.xssFilter());


const corsOption = {
    origin : `http://localhost:3000`,
    credentials : true,
}
app.use(cors(corsOption));
    
app.use(express.json());
app.use(express.urlencoded({ extended: true }))

// static folder
app.use(express.static('public/images'));

// Routes
app.use('/product', ProductRoutes);
app.use('/auth', AuthRoutes);

app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));