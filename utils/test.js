import server from '../server';
export const testHelper = (describeMess = '[MissDescription]', testCases) => {
  describe(describeMess, () => {
    testCases.forEach(test => {
      it(test.message, test.itFunc);
    });
    after(done => {
      server.close();
      done();
    });
  });
};
