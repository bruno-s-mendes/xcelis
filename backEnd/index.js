const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const multer = require('multer');
const cors = require('cors');
require('dotenv').config();

const PORT = process.env.PORT;

const userController = require('./controllers/userController');
const loginController = require('./controllers/loginController');
const userInputValidationMid = require('./middlewares/userInputValidationMid');
const userIdValidationMid = require('./middlewares/userIdValidation');
const loginValidationMid = require('./middlewares/loginValidationMid');
const authMid = require('./middlewares/authMid');
const isAdminMid = require('./middlewares/isAdminMid');

const app = express();
app.use(express.json());
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use('/uploads', express.static(path.join(__dirname, '.', 'uploads')));

const storage = multer.diskStorage({
  destination: (_req, _file, cb) => {
    cb(null, path.join(__dirname, '.', 'uploads'));
  },
  filename: (req, _file, cb) => {
    const { id } = req.params;
    cb(null, `${id}.jpeg`);
  },
});

const upload = multer({ storage });

app.get('/user', authMid, isAdminMid, userController.getUsers);
app.post('/user', authMid, isAdminMid, userInputValidationMid, userController.insertUser);
app.post('/user/:id', authMid, isAdminMid, userIdValidationMid, upload.single('image'), userController.uploadImage);
app.delete('/user/:id', authMid, isAdminMid, userIdValidationMid, userController.deleteUser);

app.post('/login', loginValidationMid, loginController.login);

app.get('/task', );
app.post('/task', );
app.put('/task/:id', );
app.delete('/task/:id', );

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}!`);
});