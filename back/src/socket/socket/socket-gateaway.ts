import {
  ConnectedSocket,
  MessageBody,
  OnGatewayConnection,
  OnGatewayDisconnect,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Socket } from 'socket.io';
import { SocketService } from './socket.service';

@WebSocketGateway({
  cors: {
    origin: '*',
  },
})
export class SocketGateway implements OnGatewayConnection {
  @WebSocketServer()
  private server: Socket;

  constructor(private readonly socketService: SocketService) {}

  handleConnection(socket: Socket): void {
    this.socketService.handleConnection(socket);
  }

  @SubscribeMessage('messageToAll')
  handleMessage(@MessageBody() data: any) {
    console.log(data);
    this.server.emit('mensajeParaTodos', data);
  }

  @SubscribeMessage('messageToAllExceptMe')
  handleMessageToAll(
    @ConnectedSocket() client: Socket,
    @MessageBody() data: any,
  ) {
    // console.log(client.id);
    client.broadcast.emit('mensajeParaTodosMenoYo', data);
  }
}
