import 'mocha';
import * as chai from 'chai';
import * as jwt from 'jsonwebtoken';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';

chai.use(chaiHttp);

const { expect } = chai;

describe('Testes para o endpoint de equipes', () => {

  let token: string;

  before(async () => {
    token =  getAuthToken();
  });

  it('Deve retornar todas as equipes', async () => {
    return chai.request(app)
      .get('/teams')
      .set('Authorization', `Bearer ${token}`)
      .then((res) => {
        expect(res).to.have.status(200);
        expect(res.body).to.be.an('array');
      });
  });

  it('Deve retornar uma equipe pelo ID', async () => {
    return chai.request(app)
      .get('/teams/1')
      .set('Authorization', `Bearer ${token}`)
      .then((res) => {
        expect(res).to.have.status(200);
        expect(res.body).to.be.an('object');
      });
  });

  it('Deve retornar estatísticas da equipe mandante', async () => {
    return chai.request(app)
      .get('/leaderboard/home')
      .set('Authorization', `Bearer ${token}`)
      .then((res) => {
        expect(res).to.have.status(200);
        expect(res.body).to.be.an('array');
      });
  });

  it('Deve retornar estatísticas da equipe visitante', async () => {
    return chai.request(app)
      .get('/leaderboard/away')
      .set('Authorization', `Bearer ${token}`)
      .then((res) => {
        expect(res).to.have.status(200);
        expect(res.body).to.be.an('array');
      });
  });

  it('Deve retornar estatísticas totais da equipe', async () => {
    return chai.request(app)
      .get('/leaderboard')
      .set('Authorization', `Token ${token}`)
      .then((res) => {
        expect(res).to.have.status(200);
        expect(res.body).to.be.an('array');
      });
  });
});

function getAuthToken(): string {
  const payload = {
    id: 1,
    role: 'admin'
  };

  const secret = 'jwt_secret';

  const token = jwt.sign(payload, secret, { expiresIn: '1h' });

  return token;
}
