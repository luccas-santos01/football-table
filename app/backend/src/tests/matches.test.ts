import 'mocha';
import * as chai from 'chai';
import * as jwt from 'jsonwebtoken';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';

chai.use(chaiHttp);

const { expect } = chai;

describe('Testes para o endpoint de partidas', () => {

  let token: string;

  beforeEach(async () => {
    token =  getAuthToken();
  });

  it('Deve retornar todas as partidas', async () => {
    return chai.request(app)
      .get('/matches')
      .set('Authorization', `Bearer ${token}`)
      .then((res) => {
        expect(res).to.have.status(200);
        expect(res.body).to.be.an('array');
      });
  });

  it('Deve retornar partidas em andamento', async () => {
    return chai.request(app)
      .get('/matches?inProgress=true')
      .set('Authorization', `Bearer ${token}`)
      .then((res) => {
        expect(res).to.have.status(200);
        expect(res.body).to.be.an('array');
      });
  });
  });
function getAuthToken(): string {
  const payload = {
    id: 1,
    role: "admin"
  };

  const secret = 'jwt_secret';

  const token = jwt.sign(payload, secret, { expiresIn: '1h' });

  return token;
}
