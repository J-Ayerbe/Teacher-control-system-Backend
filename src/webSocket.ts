import express from 'express';
import cors from 'cors'
import EventEmitter from 'events';
import http from 'http';
const WebSocketServer = require("websocket").server;

const app2 = express();
app2.use(cors({
    origin: 'http://localhost:5173',
    credentials: true,
}));
const server = new http.Server(app2);
const eventEmitter = new EventEmitter();

// Creamos el servidor de sockets y lo incorporamos al servidor de la aplicación
const wsServer = new WebSocketServer({
    httpServer: server,
    autoAcceptConnections: false
});

// Función para enviar un mensaje a través de WebSocket
function enviarMensajeWebSocket(mensaje) {
    const connection = obtenerConexionAppropriate();
    //Enviamos el mensaje a todos los clientes conectados
    for (let i = 0; i < connection.length; i++) {
        // Verifica si la conexión existe y está abierta
        if (connection[i] && connection[i].connected) {
            connection[i].sendUTF(mensaje);
            console.log("Mensaje conexion :"+mensaje );
        }
    }
  
}

// Manejador de eventos para recibir mensajes desde el servidor en el puerto 3000
eventEmitter.on('enviarMensajeWebSocket', (mensaje) => {
    enviarMensajeWebSocket(mensaje);
});

wsServer.on("request", (request) =>{
    const connection = request.accept(null, request.origin);
    connection.on("message", (message) => {
        console.log("Mensaje recibido: " + message.utf8Data);
        connection.sendUTF("Recibido: " + message.utf8Data);
    });
    connection.on("close", (_reasonCode: any, _description: any) => {
        console.log("El cliente se desconecto");
    });
});

function obtenerConexionAppropriate() {
    const connections = wsServer.connections;
    //Aceptar varias conexiones
    if (connections.length > 0) {
        return connections;
    }
    return null;
}

export { eventEmitter, server };