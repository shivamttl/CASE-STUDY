const express = require('express');
const mongoose = require('mongoose');
const authRoutes = require('./routes/authRoutes');
const cookieParser = require('cookie-parser');
const { requireAuth1,requireAuth2,requireAuth3, checkUser } = require('./middleware/authMiddleware');
const axios=require('axios');
const app = express();

// axios.get('http://localhost:4000/staff/read/').then(resp => {

//     console.log(resp.data);
// });

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
// const dbURI = 'mongodb+srv://admin:admin@cluster0.clq6u.mongodb.net/JWT';
// mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex:true })
//   .then((result) => app.listen(7000))
//   .catch((err) => console.log(err));



  mongoose.connect("mongodb+srv://admin:admin@cluster0.clq6u.mongodb.net/JWT", () => {
    console.log("database connected");
});

// listen for requests
var server=app.listen(process.env.port || 7000, function(){
    console.log('SERVER UP & RUNNING');
});
module.exports=server;
// routes
app.get('*', checkUser); //check every link
app.get('/', (req, res) => res.render('home')); //render home view

app.get('/reception', requireAuth1,(req, res) => res.render('reception')); //render home view
app.get('/manager', requireAuth2, (req, res) => res.render('manager')); //render home view
app.get('/owner',  requireAuth3, (req, res) => res.render('owner')); //render home view

app.use(authRoutes);
//requireAuth will check the tokken validation 
module.exports=server;