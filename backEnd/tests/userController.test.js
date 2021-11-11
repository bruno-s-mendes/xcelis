const sinon = require('sinon');
const { expect } = require('chai');

const controller = require('../controllers/userController');
const { required } = require('joi');

const HTTP_OK_STATUS = 200;
const HTTP_CREATED_STATUS = 201;
const HTTP_BAD_STATUS = 400;

describe('Testar getUsers ', () => {
  describe('quando é retornado com sucesso', () => {
    const response = {};
    const request = {};

    before(() => {
      response.status = sinon.stub()
        .returns(response);
      response.json = sinon.stub()
        .returns();
    })

    it('é chamado o status com o código 200', async () => {
      await controller.getUsers(request, response);

      expect(response.status.calledWith(HTTP_OK_STATUS)).to.be.equal(true);
    });
  });
});

describe('Testar insertUser ', () => {
  describe('quando o payload informado não é válido', () => {
    const response = {};
    const request = {};

    before(() => {
      response.status = sinon.stub()
        .returns(response);
      response.json = sinon.stub()
        .returns();
    })

    it('é chamado o status com o código 400', async () => {
      await controller.insertUser(request, response);

      expect(response.status.calledWith(HTTP_BAD_STATUS)).to.be.equal(true);
    });
  });
    
  describe('quando é feito cadastro com sucesso', () => {
    const response = {};
    const request = {};

    before(() => {
      request.body= {
        name: "fulano", 
        birth: "01/01/1900", 
        phone: 14526356, 
        cell: 974125896, 
        email: "fulano@gmail.com", 
        password: "senhasecreta", 
        role: "user",
      }

      response.status = sinon.stub()
        .returns(response);
      response.json = sinon.stub()
        .returns();
    })

    it('é chamado o status com o código 201', async () => {
      await controller.insertUser(request, response);

      expect(response.status.calledWith(HTTP_CREATED_STATUS)).to.be.equal(true);
    });
  });
});

describe('Testar deleteUser ', () => {
  describe('quando o payload informado não é válido', () => {
    const response = {};
    const request = {};

    before(() => {
      response.status = sinon.stub()
        .returns(response);
      response.json = sinon.stub()
        .returns();
    })

    it('é chamado o status com o código 400', async () => {
      await controller.deleteUser(request, response);

      expect(response.status.calledWith(HTTP_BAD_STATUS)).to.be.equal(true);
    });
  });
    
  describe('quando é deletado com sucesso', () => {
    const response = {};
    const request = {};

    before(() => {
      request.params= {
        id: "618c7646259c49223dff98e9"
      }

      response.status = sinon.stub()
        .returns(response);
      response.json = sinon.stub()
        .returns();
    })

    it('é chamado o status com o código 200', async () => {
      await controller.deleteUser(request, response);

      expect(response.status.calledWith(HTTP_OK_STATUS)).to.be.equal(true);
    });
  });
});