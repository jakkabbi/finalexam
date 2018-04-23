import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-toast',
  templateUrl: './toast.html'
  // styleUrls: ['./toast.css']
})
export class ToastComponent {
  @Input() message = { body: '', type: '' };

  setMessage(body, type, time = 3000) {
    this.message.body = body;
    this.message.type = type;
    setTimeout(() => { this.message.body = ''; }, time);
  }
}
