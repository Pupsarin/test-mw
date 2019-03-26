export function sendSocketMessage(message) {
    return {
        type : "SEND_WEBSOCKET_MESSAGE",
        payload : message
    }
}