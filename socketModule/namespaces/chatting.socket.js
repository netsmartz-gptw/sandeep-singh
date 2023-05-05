// npm module
const debugConnect = require('debug')("ChattingSocket:connect");
const debugDisConnect = require('debug')("TrackingSocket:disconnect");
const mongoose = require('mongoose');
const { saveData } = require('../../dao/queries');
const TokenManager = require('../../lib/token-manager');
const { getChatFunc } = require('../../methods/chat.methods');
const {Chats} = require('../../models');
const {DATABASE: {SOCKET: {EVENTTS: {CONNNECTION, CONNNECTED, MESSAGE, RECEIVE_MESSAGE, SOCKET_ERROR, PARAMETER_ERROR, DISCONNECT}}}} = require('../../constants/appDefaults')

let socketConnected = {}

module.exports = (io) => {
	// creating namespace
	let chattingNSP = io.of('/CHATTING');
	// listen for connection event for this namespace
	chattingNSP.on(CONNNECTION, async (socket) => {
		console.log(" ...tracking socket id is....", socket.id, socket.handshake.query.accessToken);
		const language = socket.handshake.query.language || 'en';
		if (socket && socket.handshake.query && socket.handshake.query.accessToken && socket.id) {
			try {
				let accessToken = socket.handshake.query.accessToken.replace(/"/g, "")
				var result = await TokenManager.decodeAndVerifyToken(accessToken);
				let socketData = {
					socketId: socket.id
				};
				// socketConnected[socket.id] = result._id
				if(result._id && socketConnected[result._id]) socketConnected[result._id].push(socket.id)
				else if(result._id) socketConnected[result._id] = [socket.id]
				// console.log('++++', socketConnected)
				socket.emit(CONNECTED, socketData);
			} catch (err) {
				debugConnect('Error in socket connect', err);
				socket.emit(SOCKET_ERROR,{status: 400, message: 'Unauth'});
			}

			socket.on('message', async (data, ack)=>{
				// if(!data.conversationId) socket.emit('parameter_error', 'conversation Id required')
				if(!data.senderId) socket.emit(PARAMETER_ERROR, 'sender Id required')
				if(!data.receiverId) socket.emit(PARAMETER_ERROR, 'receiver Id required')
				if(!data.chatType) socket.emit(PARAMETER_ERROR, 'message type required')

				let criteria = {$or: [{
					senderId: data.senderId,
					receiverId: data.receiverId
				},{
					senderId: data.receiverId,
					receiverId: data.senderId
				}]}

				// getting conversation Id
				let getConversationId = await getChatFunc(criteria)

				//assigning conversationId to neww or from existing chat
				if(getConversationId && getConversationId.conversationId) data.conversationId = getConversationId.conversationId
				else data.conversationId = mongoose.Types.ObjectId()

				// saving chat
				let saveChat = await saveData(Chats, data)

				// emiting message to online receiver
				if(saveChat && socketConnected && socketConnected[data.receiverId] && socketConnected[data.receiverId].length) {
					socketConnected[data.receiverId].map(receiver => {
						chattingNSP.to(receiver).emit(RECEIVE_MESSAGE, saveChat)
					})
				}
				ack(1)
			})

			socket.on(DISCONNECT, async () => {
				console.log(' ############  Socket disconnected #############', socket.id);
				if(result && result._id){
					const index = socketConnected[result._id].indexOf(socket.id);
					if (index > -1) {
						socketConnected[result._id].splice(index, 1);
					}
				}
				console.log('RRRRRR', socketConnected)
			});
		} else {
			debugDisConnect('no accessToken');
			// socket.emit(COMMON_SOCKET_EVENTS.EMITTER.SOCKET_ERROR, ErrorResponse(language, VALIDATION_MESSAGES.COMMON.NO_ACCESS_TOKEN));
		}
	});

	return chattingNSP;
};