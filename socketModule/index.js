let socket = require('socket.io')
let io = new socket.Server()

// namespaces to export
let chattingNSP;

const connectSocket = (server) => {
	io = io.listen(server.listener);
	// const redisAdapter = require('socket.io-redis');
	// io.adapter(redisAdapter({ host: 'localhost', port: 6379 }));
	// requiring namespaces
	const socketNamespaces = require('./namespaces');
	// binding tracking namespace with it's events
	chattingNSP = socketNamespaces.chattingNSP(io);
};

const getChattingNamespaceRef = () => {
	return chattingNSP;
};

module.exports = {
	connectSocket,
	getChattingNamespaceRef
};