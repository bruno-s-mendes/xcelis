const sinon = require('sinon');
const { expect } = require('chai');

const userModel = require('../models/userModel');
const userService = require('../services/userService');

describe('Recupera todos usuários do banco de dados', () => {
  describe('quando é recuperado com sucesso', () => {
    before(() => {

      sinon.stub(userModel, 'getAll')
        .resolves([
          {
            _id: "618c7646259c49223dff98e9",
            name: "Bruno",
            birth: "10/06/1994",
            phone: 14526655662,
            cell: 999377436,
            email: "menino33@gmail.com",
            password: "brunao",
            role: "admin",
            photoPath: "/home/bruno/Documents/Projetos Pessoais/Desafios_Tecnicos/xcelis/backEnd/uploads/618c7646259c49223dff98e9.jpeg"
          }, {
            _id: "618d130e77db13eb5bb69605",
            name: "Bruno",
            birth: "10/06/1994",
            phone: 14526655662,
            cell: 999377436,
            email: "bmendes@gmail.com",
            password: "123456",
            role: "user"
          },]);
    });

    after(() => {
      userModel.getAll.restore();
    });

    it('retorna um array de objetos', async () => {
      const response = await userService.getUsers();

      expect(response).to.be.a('array');
    });

    it('O primeiro objeto do array nao possu propriedade pasword', async () => {
      const response = await userService.getUsers();

      expect(response[0]).to.not.have.a.property('password');
    });

  });
});

describe('Adiciona um novo usuário', () => {
  describe('quando o payload informado não é válido', () => {
    const payloadUser = {};

    before(() => {
      sinon.stub(userModel, 'create')
        .resolves(false);
    });

    after(() => {
      userModel.create.restore();
    });

    it('retorna um boolean', async () => {
      const response = await userService.insertUser(payloadUser);

      expect(response).to.be.a('boolean');
    });

    it('o boolean contém "false"', async () => {
      const response = await userService.insertUser(payloadUser);

      expect(response).to.be.equal(false);
    });

  });

  describe('quando é inserido com sucesso', () => {
    const payloadUser = {
      name: "fulano", 
      birth: "01/01/1900", 
      phone: 14526356, 
      cell: 974125896, 
      email: "fulano@gmail.com", 
      password: "senhasecreta", 
      role: "user",
    };

    before(() => {
      const ID_EXAMPLE = '604cb554311d68f491ba5781';

      sinon.stub(userModel, 'create')
        .resolves({
          name: "fulano", 
          email: "fulano@gmail.com", 
          role: "user",
          id: ID_EXAMPLE,
        });
    });

    after(() => {
      userModel.create.restore();
    });

    it('retorna um objeto', async () => {
      const response = await userService.insertUser(payloadUser);

      expect(response).to.be.a('object');
    });

    it('tal objeto possui o "id" do novo usuário inserido', async () => {
      const response = await userService.insertUser(payloadUser);

      expect(response).to.have.a.property('id');
    });

  });
});

describe('Remove um usuário', () => {
  describe('quando o payload informado não é válido', () => {
    const payloadUser = {};

    before(() => {
      sinon.stub(userModel, 'create')
        .resolves(false);
    });

    after(() => {
      userModel.create.restore();
    });

    it('retorna um boolean', async () => {
      const response = await userService.insertUser(payloadUser);

      expect(response).to.be.a('boolean');
    });

    it('o boolean contém "false"', async () => {
      const response = await userService.insertUser(payloadUser);

      expect(response).to.be.equal(false);
    });

  });

  describe('quando é removido com sucesso', () => {
    const ID_EXAMPLE = '604cb554311d68f491ba5781';

    before(() => {

      sinon.stub(userModel, 'deleteById')
        .resolves({
          "acknowledged": true,
          "deletedCount": 1
        });
    });

    after(() => {
      userModel.deleteById.restore();
    });

    it('retorna um objeto', async () => {
      const response = await userService.removeUser(ID_EXAMPLE);

      expect(response).to.be.a('object');
    });

    it('O objeto retornado possui propriedade acknowledged com valor true', async () => {
      const response = await userService.removeUser(ID_EXAMPLE);

      expect(response.acknowledged).to.equal(true);
    });

  });
});