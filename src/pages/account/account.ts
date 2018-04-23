import { Component, OnInit } from '@angular/core';
import { ToastComponent } from '../../app/shared/toast/toast';
import { AuthService } from '../../app/services/auth';
import { UserService } from '../../app/services/user';
import { User } from '../../app/shared/models/user';

@Component({
  selector: 'app-account',
  templateUrl: './account.html'
})
export class AccountPage implements OnInit {

  user: User;
  isLoading = true;

  constructor(private auth: AuthService,
              public toast: ToastComponent,
              private userService: UserService) { }

  ngOnInit() {
    this.getUser();
  }

  getUser() {
    this.userService.getUser(this.auth.currentUser).subscribe(
      data => this.user = data,
      error => console.log(error),
      () => this.isLoading = false
    );
  }

  save(user: User) {
    this.userService.editUser(user).subscribe(
      res => this.toast.setMessage('account settings saved!', 'success'),
      error => console.log(error)
    );
  }

}
