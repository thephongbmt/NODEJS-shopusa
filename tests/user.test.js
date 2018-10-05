import { testHelper } from '../utils/test';
import server from '../server';
import chai from 'chai';
import chaiHttp from 'chai-http';

const expect = chai.expect;
chai.use(chaiHttp);

let testCasesGetPing = [
  {
    message: 'Should return list user',
    itFunc : done => {
      chai.request
        .agent(server)
        .get('/user')
        .end((err, res) => {
          expect(res.body.data).to.equal('pong');
          expect(res).to.have.status(200);
          done();
        });
    }
  }
];
testHelper('[GET]-/ping', testCasesGetPing);
