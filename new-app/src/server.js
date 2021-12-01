const express = require('express');
const cors = require('cors');
const colors = require('colors');
const morgan = require('morgan');
const mongoose = require('./db/database');
const authRoutes = require('./routes/auth.routes');
const { createRoles } = require('./libs/initial.setup');
const helmet = require('helmet');


const app = express();
 
const createR = createRoles();

app.use(express.json());
app.use(morgan('dev'));
app.use(cors());

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

// Listening
app.listen(8080, () => console.log('Server ON port 8080'.rainbow)); 