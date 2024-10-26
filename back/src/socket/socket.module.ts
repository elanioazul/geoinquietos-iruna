import { Module } from '@nestjs/common';
import { SocketService } from './socket/socket.service';
import { SocketGateway } from './socket/socket-gateaway';
import { FlotaModule } from 'src/flota/flota.module';

@Module({
  providers: [SocketService, SocketGateway],
  imports: [FlotaModule],
})
export class SocketModule {}
