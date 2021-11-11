const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const multer = require('multer');
const cors = require('cors');
require('dotenv').config();

const PORT = process.env.PORT;

const userController = require('./controllers/userController');
const userInputValidationMid = require('./middlewares/userInputValidationMid');
const userIdValidationMid = require('./middlewares/userIdValidation');

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

app.get('/user', userController.getUsers);
app.post('/user', userInputValidationMid, userController.insertUser);
app.post('/user/:id', userIdValidationMid, upload.single('image'), userController.uploadImage);
app.delete('/user/:id', userIdValidationMid, userController.deleteUser);


upload.single('image')


app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}!`);
});