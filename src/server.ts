import http from 'http';
import { app } from './app';
import { dbConnect } from './db/db.connect';
import { port } from './config';
import createDebug from 'debug';

const debug = createDebug('SOCIALNETWORK:SERVER');

const server = http.createServer(app);

dbConnect()
  .then((mongoose) => {
    server.listen(port);
    debug('Connected to db: ' + mongoose.connection.db.databaseName);
  })
  .catch((error) => {
    server.emit('error', error);
  });

server.on('listening', () => {
  debug('Listening on PORT: ' + port);
});

server.on('error', (error) => {
  debug(error.message);
});
