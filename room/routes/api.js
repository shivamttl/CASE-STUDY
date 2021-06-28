const {Router} = require('express');
const authController = require('../controller/authController');

const app = Router();

app.get('/read', authController.read);
app.get('/roomReport', authController.roomReport);
app.get('/availableRoom', authController.availableRoom);
app.get('/occupiedRoom', authController.occupiedRoom);
app.put('/checkIn/:number', authController.checkIn);
app.put('/checkOut/:number', authController.checkOut);
app.put('/update/:name', authController.update);
app.get('/read/:id', authController.readOne);
app.post('/create', authController.create);
app.delete('/delete/:id',authController.delete);
module.exports = app;