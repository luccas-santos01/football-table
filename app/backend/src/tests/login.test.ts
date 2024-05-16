import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';

import { Response } from 'superagent';

chai.use(chaiHttp);

const { expect } = chai;

describe('Testes para o endpoint login', () => {

  it('Deve retornar um token após uma tentativa de login válida', async () => {
    return chai.request(app)
      .post('/login')
      .send({ email: 'user@user.com', password: 'secret_user' })
      .then((res: Response) => {
        expect(res).to.have.status(200);
        expect(res.body).to.have.property('token');
      });
  });

  it('Deve retornar um erro 400 quando o email estiver vazio', async () => {
    return chai.request(app)
      .post('/login')
      .send({ email: '', password: 'secret_user' })
      .then((res: Response) => {
        expect(res).to.have.status(400);
      });
  });
  it('Deve retornar um erro 400 quando a senha estiver vazia', async () => {
    return chai.request(app)
      .post('/login')
      .send({ email: 'user@user.com', password: '' })
      .then((res: Response) => {
        expect(res).to.have.status(400);
      });
  });
});
