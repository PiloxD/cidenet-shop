const express = require('express');
const cors = require('cors');
const colors = require('colors');
const morgan = require('morgan');
const mongoose = require('./db/database');
const authRoutes = require('./routes/auth.routes');
const { createRoles } = require('./libs/initial.setup');
const helmet = require('helmet');
const productsRoutes = require('./routes/products.routes');
const stockRoutes = require('./routes/stock.routes')
const cartRoutes = require('./routes/cart.routes')


const app = express();

const createR = createRoles();

app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

// Middlewares
const corsOptions = {
};
app.use(cors(corsOptions));
app.use(helmet());
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Routes 
app.use('/api/auth', authRoutes);
app.use('/api/products', productsRoutes);
app.use('/api/stock', stockRoutes);
app.use('/api/cart', cartRoutes);
app.use(require('./routes/nodemailer.routes'));



// Listening 
app.listen(8080, () => console.log('Server ON port 8080'.rainbow)); 