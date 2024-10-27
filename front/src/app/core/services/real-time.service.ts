import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { webSocket, WebSocketSubject } from 'rxjs/webSocket';
import { retryWhen, tap, delayWhen, switchAll, catchError } from 'rxjs/operators';
import { Observable, timer, EMPTY, BehaviorSubject } from 'rxjs';
import { Message } from 'src/app/interfaces/message';
//export const WS_ENDPOINT = environment.wsEndpoint;
export const RECONNECT_INTERVAL = environment.reconnectInterval;
@Injectable({
  providedIn: 'root'
})
export class RealTimeService {

  private socket$!: WebSocketSubject<Message> | undefined;
  private messagesSubject$ = new BehaviorSubject<Observable<Message>>(EMPTY);
  public messages$ = this.messagesSubject$.pipe(switchAll(), catchError(e => { throw e }));

  // public getNewWebSocket(): WebSocketSubject<Message> {
  //   return webSocket({
  //     url: WS_ENDPOINT,
  //     closeObserver: {
  //       next: () => {
  //         console.log('[DataService]: connection closed');
  //         this.socket$ = undefined;
  //         this.connect({ reconnect: true });
  //       }
  //     },
  //   })
  // }



  // sendMessage(msg: Message) {
  //   this.socket$?.next(msg);
  // }
  // close() {
  //   this.socket$?.complete();
  // }

  // public connect(cfg: { reconnect: boolean } = { reconnect: false }): void {

  //   if (!this.socket$ || this.socket$.closed) {
  //     this.socket$ = this.getNewWebSocket();
  //     const messages = this.socket$.pipe(cfg.reconnect ? this.reconnect : o => o,
  //       tap({
  //         error: error => console.log(error),
  //       }), catchError(_ => EMPTY));
  //     this.messagesSubject$.next(messages);
  //   }
  // }



  // private reconnect(observable: Observable<Message>): Observable<Message> {
  //   return observable.pipe(retryWhen(errors => errors.pipe(tap(val => console.log('[Data Service] Try to reconnect', val)),
  //     delayWhen(_ => timer(RECONNECT_INTERVAL)))));
  // }
}
