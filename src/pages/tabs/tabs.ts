import { Component } from '@angular/core';

import { AccountPage } from '../account/account';
import { AdminPage } from '../admin/admin';
import { GraphPage } from '../graph/graph';
import { HomePage } from '../home/home';
import { LoginPage } from '../login/login';
import { LogoutPage } from '../logout/logout';
import { SharesPage } from '../shares/shares';
import { RegisterPage } from '../register/register';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab1Root = AccountPage;
  tag2Root = AdminPage;
  tab3Root = GraphPage;
  tab4Root = HomePage;
  tab5Root = LoginPage;
  tab6Root = LogoutPage;
  tab7Root = SharesPage;
  tab8Root = RegisterPage;

  constructor() {

  }
}
