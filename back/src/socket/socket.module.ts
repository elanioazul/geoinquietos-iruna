import { Module } from '@nestjs/common';
import { SocketService } from './socket/socket.service';
import { SocketGateway } from './socket/socket-gateaway';

@Module({
  providers: [SocketService, SocketGateway],
})
export class SocketModule {}
