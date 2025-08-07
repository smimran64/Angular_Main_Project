import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SharedDataService {

  private roomUpdateSource = new BehaviorSubject<boolean>(false);
  roomUpdate$ = this.roomUpdateSource.asObservable();

  notifyRoomUpdate() {
    this.roomUpdateSource.next(true);
  }
}
