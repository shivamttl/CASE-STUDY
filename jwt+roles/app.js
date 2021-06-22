const express = require('express');
const mongoose = require('mongoose');
const authRoutes = require('./routes/authRoutes');
const cookieParser = require('cookie-parser');
const { requireAuth, checkUser } = require('./middleware/authMiddleware');
const axios=require('axios');
const app = express();

// middleware
app.use(express.static('public')); //to serve static files in browser (stored in public folder)
app.use(express.json());  // used to parse json object passed by user to be used in code.(req object)
app.use(cookieParser());

const swaggerUi = require("swagger-ui-express"),
swaggerDocument = require("./swagger.json")
app.use('/api-docs',swaggerUi.serve,swaggerUi.setup(swaggerDocument));
// view engine
app.set('view engine', 'ejs');

// database connection
const dbURI = 'mongodb+srv://admin:admin@cluster0.clq6u.mongodb.net/JWT';
mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex:true })
  .then((result) => app.listen(7000))
  .catch((err) => console.log(err));

// routes
app.get('*', checkUser); //check every link
app.get('/', (req, res) => res.render('home')); //render home view

app.get('/reception', (req, res) => res.render('reception')); //render home view
app.get('/manager', (req, res) => res.render('manager')); //render home view
app.get('/owner', (req, res) => res.render('owner')); //render home view

app.get('/smoothies', requireAuth, (req, res) => res.render('smoothies')); //render smothie view
app.use(authRoutes);
//requireAuth will check the tokken validation 