const express = require('express');
const cors = require('cors');

require('dotenv').config();

const ProductRoutes = require('./src/routes/productRoute');

const app = express();
const PORT = process.env.PORT;

const corsOption = {
    origin : `http://localhost:${PORT}`
}
app.use(cors(corsOption));

app.use(express.json());
app.use(express.urlencoded({ extended: true }))

app.use(express.static('public/images'));

app.use('/product', ProductRoutes);

app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));