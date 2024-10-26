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
import { LocationUpdateDto } from '../dto/update-unidad-flota';
import { FlotaService } from 'src/flota/flota.service';

@WebSocketGateway({
  cors: {
    origin: '*',
  },
})
export class SocketGateway implements OnGatewayConnection {
  @WebSocketServer()
  private server: Socket;

  constructor(
    private readonly socketService: SocketService,
    private readonly flotaService: FlotaService,
  ) {}

  handleConnection(socket: Socket): void {
    this.socketService.handleConnection(socket);
  }

  @SubscribeMessage('messageToAll')
  handleMessage(@MessageBody() data: any) {
    console.log(data);
    this.server.emit('mensajeParaTodos', data);
  }

  @SubscribeMessage('updateLocation')
  async handleMessageToAll(
    @ConnectedSocket() client: Socket,
    @MessageBody() data: LocationUpdateDto,
  ) {
    await this.flotaService.updateLocation(data.id, data.lon, data.lat);
    // console.log(client.id);
    client.broadcast.emit('locationChanged', data);
  }
}
