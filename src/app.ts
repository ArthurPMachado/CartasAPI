import express from 'express';
import router from './routes';

const server = express();

server.use(express.json());
server.use(express.urlencoded({ extended: true }));
server.use(router);

export default server;
