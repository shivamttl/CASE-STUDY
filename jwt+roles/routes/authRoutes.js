const {Router} = require('express');
const authController = require('../controllers/authController');
const { requireAuth1,requireAuth2,requireAuth3 } = require('../middleware/authMiddleware');
const app = Router();

app.get('/signup',requireAuth3 , authController.signup_get);
app.post('/signup', requireAuth3 ,authController.signup_post);
app.get('/login', authController.login_get);
app.post('/login', authController.login_post);
app.get('/logout', authController.logout_get);
//for swagger
app.get('/showusers',requireAuth3 , authController.showusers);
app.get('/showuser/:id',requireAuth3 , authController.showuser);
app.post('/createuser',requireAuth3 , authController.createuser);
app.delete('/delete/:id',requireAuth3 ,authController.deleteuser);
app.put('/update/:name',requireAuth3 , authController.update);

module.exports = app;
