const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
require('dotenv').config();

const PORT = process.env.PORT;

const userController = require('./controllers/userController');

const app = express();
app.use(express.json());
app.use(cors());

app.use(bodyParser.urlencoded({ extended: false }));

app.get('/user', userController.getUsers);
app.post('/user', userController.insertUser);
app.delete('/user/:id', userController.deleteUser);




app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}!`);
});