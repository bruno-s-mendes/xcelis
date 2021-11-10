const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
require('dotenv').config();

const PORT = process.env.PORT;

const app = express();
app.use(express.json());
app.use(cors());

app.use(bodyParser.urlencoded({ extended: false }));

app.get('/user', );
app.post('/user', );
app.delete('/user/:id', );




app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}!`);
});