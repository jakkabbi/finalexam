import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../app/services/auth';

@Component({
  selector: 'app-logout',
  template: ''
})
export class LogoutPage implements OnInit {

  constructor(private auth: AuthService) { }

  ngOnInit() {
    this.auth.logout();
  }

}
