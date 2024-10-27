import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { io, Socket } from 'socket.io-client';
import { Observable } from 'rxjs';
import { Message } from 'src/app/interfaces/message';

export const WS_ENDPOINT = environment.socketIoEndpoint;

@Injectable({
  providedIn: 'root'
})
export class RealTimeSocketIoService {

  private socket: Socket;

  constructor() {
    this.socket = io(WS_ENDPOINT);
  }

  onMessage(): Observable<Message> {
    let observable = new Observable<Message>(observer => {
      this.socket.on('locationChanged', (data: Message) => {
        observer.next(data);
      });
      return () => { this.socket.disconnect(); };
    });
    return observable;
  }

  close(): void {
    this.socket.disconnect();
  }
}


