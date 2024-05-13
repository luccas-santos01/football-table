import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';

import { Response } from 'superagent';

chai.use(chaiHttp);

const { expect } = chai;

describe('Testes para o endpoint teams', () => {

  it('Deve retornar uma lista com todos os times cadastrados', async () => {
    return chai.request(app)
      .get('/teams')
      .then((res: Response) => {
        expect(res).to.have.status(200);
        expect(res.body).to.be.an('array');
      });
  });

  it('Deve retornar um time específico', async () => {
    return chai.request(app)
      .get('/teams/1')
      .then((res: Response) => {
        expect(res).to.have.status(200);
        expect(res.body).to.be.an('object');
      });
  });
});
