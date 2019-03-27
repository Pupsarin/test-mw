export function sendSocketMessage(message) {
    return {
        type : "SEND_WEBSOCKET_MESSAGE",
        payload : message
    }
}

export function receiveSocketMessages(messages) {
    return {
        type : "SOCKET_MESSAGE_RECEIVED",
        payload : messages
    }
}