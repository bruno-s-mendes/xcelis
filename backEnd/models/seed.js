const userModel = require('./userModel');

const populate = async () => {
  const user = {
    "name": "",
    "birth": "",
    "phone": 0,
    "cell": 0,
    "email": "daniel.paraizo@xcelis.com.br",
    "password": "teste123",
    "role": "admin"
  }

  let response;
  try {
    await userModel.deleteAll();
    response = await userModel.create(user);
  } catch (error) {
    return console.log(error);
  }
  console.log(response);
  process.exit(1);
}

populate();
