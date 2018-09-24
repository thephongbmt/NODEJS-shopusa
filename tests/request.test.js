import {test} from '../utils/test-utils';
import server from '../server';
import chai from 'chai';
import chaiHttp from 'chai-http';

const expect = chai.expect;
chai.use(chaiHttp);

let testCasesGetPing = [
  {
    message: 'Should be return pong',
    itFunc : done => {
      chai.request
        .agent(server)
        .get('/ping')
        .end((err, res) => {
          expect(res.body.data).to.equal('pong');
          expect(res).to.have.status(200);
          done();
        });
    }
  }
];
test('[GET]-/ping', testCasesGetPing);
