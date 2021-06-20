const {Router} = require('express');
const authController = require('../controllers/authController');

const app = Router();

app.get('/signup', authController.signup_get);
app.post('/signup', authController.signup_post);
app.get('/login', authController.login_get);
app.post('/login', authController.login_post);
app.get('/logout', authController.logout_get);

module.exports = app;