// server

const apm = require('elastic-apm-node');

// Handler for all uncaught errros happend
process.on('uncaughtException' as any, (error: any, origin: any) => {
  console.log(`Uncaught Exception catched (Origin = ${origin}):`);
  console.log(error);
})

// Must run that at first for configuration
apm.start({
  serviceName: process.env.ELASTIC_APM_SERVICE_NAME,
  serverUrl: process.env.ELASTIC_APM_SERVER_URL,
  secretToken: process.env.ELASTIC_APM_SECRET_TOKEN || '',
  active: process.env.ELASTIC_APM_ACTIVE === 'true' || false,
});

// Handle uncaught exceptions with apm
apm.handleUncaughtExceptions((error: any) => {
  console.log('Error caught with apm transport:');
  console.log(error);
});


import * as https from 'https';
import { readFileSync } from 'fs';
import app from './app';
import config from './config';
import { LOG_LEVEL, log, parseLogData } from './utils/logger';

// TODO: Change these for your own certificates.  This was generated through the commands:
// openssl genrsa -out privatekey.pem 2048
// openssl rsa -in privatekey.pem -pubout -out publickey.pem
// openssl req -new -key privatekey.pem -out certrequest.csr
// openssl x509 -req -in certrequest.csr -signkey privatekey.pem -out certificate.pem
const options = {
  key  : readFileSync(config.privateKeyPath),
  cert : readFileSync(config.certificatePath),
};

https.createServer(options, app).listen(app.get('port'), () => {
  const logMessage =
    `Authorization Server is running at port ${app.get('port')} in ${app.get('env')} mode`;

  log(LOG_LEVEL.INFO, parseLogData('Server Initialization', logMessage, null, null));

  console.log(logMessage);
  console.log('Press CTRL-C to stop\n');
});
