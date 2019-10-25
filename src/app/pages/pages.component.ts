import { Component } from '@angular/core';

import { MENU_ITEMS } from './pages-menu';
import { AuthService } from '../@core/auth/auth.service';
import { NbMenuItem } from '@nebular/theme';
import { Observable } from 'rxjs';

@Component({
  selector: 'ngx-pages',
  styleUrls: ['pages.component.scss'],
  template: `
    <ngx-one-column-layout>
      <nb-menu [items]="menu | async"></nb-menu>
      <router-outlet></router-outlet>
    </ngx-one-column-layout>
  `,
})
export class PagesComponent {

  menu: Observable<NbMenuItem[]>;

  constructor(public authService: AuthService) {
    this.menu = MENU_ITEMS(this.authService.user);
  }
}
