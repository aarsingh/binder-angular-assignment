// confirmation-modal.component.ts

import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-confirmation-modal',
  template: `
    <div class="modal" [ngClass]="{ 'is-active': showModal }">
      <div class="modal-background" (click)="closeModal()"></div>
      <div class="modal-content">
        <div class="box">
          <p>{{ modalMessage }}</p>
          <!-- <button class="button is-success" (click)="confirmAction.emit(true)">Yes</button>
          <button class="button" (click)="confirmAction.emit(false); closeModal()">No</button> -->
          <button class="button" (click)="confirmAction.emit(false); closeModal()">Ok</button>
        </div>
      </div>
      <button class="modal-close is-large" aria-label="close" (click)="confirmAction.emit(false); closeModal()"></button>
    </div>
  `,
  styles: [
    `
    .modal {
    display: none;
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    align-items: center;
    justify-content: center;
  }
  
  .modal.is-active {
    display: flex;
  }
  
  .modal-background {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: transparent;
  }
  
  .modal-content {
    background-color: #fff;
    padding: 20px;
    border-radius: 5px;
    max-width: 400px;
    text-align: center;
  }
  
  .modal-close {
    position: absolute;
    top: 15px;
    right: 15px;
    cursor: pointer;
    background: none;
    border: none;
  }
  
  .modal-close::before,
  .modal-close::after {
    content: '';
    position: absolute;
    top: 0;
    left: 10px;
    width: 2px;
    height: 20px;
    background-color: #333;
  }
  
  .modal-close::before {
    transform: rotate(45deg);
  }
  
  .modal-close::after {
    transform: rotate(-45deg);
  }

  .button {
    padding: 5px 18px;
    border: none;
    border-radius: 2px;
    font-size: 12px;
    margin: 0px 5px;
    background-color: #235c5c;
    color: #fff;
  }

    `
  ]
})
export class ModalComponent {
  @Input() showModal: boolean;
  @Input() modalMessage: string;
  @Output() confirmAction = new EventEmitter<boolean>();

  closeModal() {
    this.showModal = false;
  }
}
