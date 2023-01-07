const express = require('express');
const cors = require('cors');
const session = require('express-session'); 
const SequeliezeStore = require('connect-session-sequelize');
const db = require('./src/config/Database');

require('dotenv').config();

const ProductRoutes = require('./src/routes/productRoute');
const AuthRoutes = require('./src/routes/authRoute');

const app = express();
const PORT = process.env.PORT;

const sessionStore = SequeliezeStore(session.Store);

const store = new sessionStore({
    db : db
})

app.use(session({
    secret : process.env.SECRET_KEY_SESSION,
    resave : false,
    saveUninitialized : true,
    store : store,
    cookie : {
        secure : 'auto'
    }
}))

const corsOption = {
    origin : `http://localhost:3000`,
    credential : true
}
app.use(cors(corsOption));

app.use(express.json());
app.use(express.urlencoded({ extended: true }))

// static folder
app.use(express.static('public/images'));

// Routes
app.use('/product', ProductRoutes);
app.use('/auth', AuthRoutes);

// adding table session store to database
// store.sync();

app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));