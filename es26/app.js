"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fastify_1 = __importDefault(require("fastify"));
const fastify = (0, fastify_1.default)({
    logger: true
});
// Declare a route
fastify.get('/', function (request, reply) {
    reply.send({ hello: 'world' });
});
// Run the server!
fastify.listen({ port: 3000, host: 'localhost' }, function (err, address) {
    if (err) {
        fastify.log.error(err);
        process.exit(1);
    }
    fastify.log.info(`Server is now listening on ${address}`);
});
