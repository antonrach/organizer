import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-modal-delete',
  templateUrl: './modal-delete.component.html',
  styleUrls: ['./modal-delete.component.scss']
})
export class ModalDeleteComponent implements OnInit {

  @Output() closeEvent = new EventEmitter();
  @Output() userConfirmed = new EventEmitter();

  constructor() { }

  ngOnInit(): void {
  }

  closeModal(): void {
    this.closeEvent.emit();
  }

  confirmRemoval(): void {
    this.userConfirmed.emit();
  }

}
