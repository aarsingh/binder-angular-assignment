import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PopupService {
  private subject = new Subject<void>();

  showPopup(message: any): void {
    this.subject.next(message);
  }

  onShowPopup(): Subject<void> {
    return this.subject;
  }
}