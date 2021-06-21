const {Router} = require('express');
const authController = require('../controllers/authController');

const app = Router();

app.get('/signup', authController.signup_get);
app.post('/signup', authController.signup_post);
app.get('/login', authController.login_get);
app.post('/login', authController.login_post);
app.get('/logout', authController.logout_get);
//for swagger
app.get('/showusers', authController.showusers);
app.get('/showuser/:id', authController.showuser);
app.post('/createuser', authController.createuser);
app.delete('/delete/:id',authController.deleteuser);
module.exports = app;
