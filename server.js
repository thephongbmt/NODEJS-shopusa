import express from 'express';
import bodyParser from 'body-parser';
import Raven from 'raven';
import compression from 'compression';
import cors from 'cors';
import router from './api';
import { middleware } from './middleware/express';
import {
  SENTRY,
  PORT,
  ENV,
  DESCRIPTION,
  DB_HOST,
  DB_PORT,
  DB_NAME
} from './constant';
import Log from './lib/Log.class';
import MongoDB from './db/MongoDB.class';

//connect to database
const database = new MongoDB(DB_HOST, DB_PORT, DB_NAME);
database.connect();

const app = express();
//MIDDLE WARE
//Handler body parser Request
app.use(bodyParser.urlencoded({ extended: false }, bodyParser.json()));
//compress response
app.use(compression());
//cross origin resource sharing
app.use(cors());
//public resource
app.use('/assets', express.static(`${__dirname}assets/public`));

//RAVEN
// Must configure Raven before doing anything else with it
if (SENTRY) {
  Raven.config(SENTRY, { environment: ENV }).install();
  // The request handler must be the first middleware on the app
  app.use(Raven.requestHandler());
}

middleware.handleResponse(app);
//ROUTER
//check API test is live
app.get('/ping', (req, res) => {
  res.SUCCESS('pong');
});
app.get('/', (req, res) => {
  res.end('API is alive');
});

//init route
router(app);

//check request not found
middleware.handleNotFoundRequest(app);
//MIDDLE WARE Handler Error
//handle error
middleware.handleError(app);
//Raven
app.use(Raven.errorHandler());

const server = app.listen(PORT || 3000, () => {
  let port = server.address().port;
  let host =
    server.address().address === '::' ? 'localhost' : server.address().address;
  Log.info(
    `- ${DESCRIPTION}
  + Server is running at http://${host}:${port}
  + API ENV: ${ENV || 'development'}`,
    'green'
  );
});

export default server;
