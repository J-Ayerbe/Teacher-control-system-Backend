import express from 'express';
import cors from 'cors';
import http from 'http';
import { server as WebSocketServer } from 'websocket';
import EventEmitter from 'events';

const app = express();
const server = http.createServer(app);
const wsServer = new WebSocketServer({
  httpServer: server,
  autoAcceptConnections: false
});

const eventEmitter = new EventEmitter();

app.set("port", 3001);
app.use(cors());
app.use(express.json());

// Función para enviar un mensaje a través de WebSocket
function notify(mensaje: string) {
  const connection = getconnection(mensaje);
  if (!connection) {
    console.log('No se encontró el cliente ' + mensaje);
    return;
  }
  // Enviamos el mensaje a todos los clientes conectados
  for (let i = 0; i < connection.length; i++) {
    // Verifica si la conexión existe y está abierta
    if (connection[i] && connection[i].connected) {
      connection[i].sendUTF(mensaje);
      console.log("Mensaje conexión: " + mensaje);
    }
  }
}

// Manejador de eventos para recibir mensajes desde el servidor en el puerto 3000
eventEmitter.on('enviarMensajeWebSocket', (mensaje) => {
   notify(mensaje);
});

// subscribe y unsubscribe los clientes
wsServer.on("request", (request) => {
  const url = new URL(request.httpRequest.url!, 'http://localhost:3001');
  const id = url.searchParams.get('id');

  const connection = request.accept(null, request.origin);
  (connection as any).id = id; // Usa 'any' para el tipo si TypeScript no reconoce la propiedad 'id'

  connection.on("message", (message) => {
    console.log("Mensaje recibido: " + message.utf8Data);
  });
  connection.on("close", (_reasonCode, _description) => {
    console.log("El cliente se desconectó");
  });
});

function getconnection(opcion: string) {
  const connections = Array.from(wsServer.connections.values()) as any[];
  const arrayConnections = [];

  for (let i = 0; i < connections.length; i++) {
    if (connections[i].id === opcion) {
      arrayConnections.push(connections[i]);
    }
  }
  if (arrayConnections.length > 0) {
    return arrayConnections;
  }

  return null;
}

export { server, eventEmitter };