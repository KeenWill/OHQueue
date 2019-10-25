import { NbMenuItem } from '@nebular/theme';
import { User } from '../@core/auth/auth.service';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

const notLoggedIn: NbMenuItem[] = [
  {
    title: 'Login',
    icon: 'lock-outline',
    link: '/pages/login',
  },
];

const loggedInAsStudent: NbMenuItem[] = [
  {
    title: 'Queues',
    icon: 'home-outline',
    link: '/pages/queues',
  },
  {
    title: 'Login',
    icon: 'lock-outline',
    link: '/pages/login',
  },
];

const loggedInAsTA: NbMenuItem[] = [
  {
    title: 'Dashboard',
    icon: 'home-outline',
    link: '/pages/dashboard',
    home: true,
  },
  {
    title: 'Queues',
    icon: 'home-outline',
    link: '/pages/queues',
  },
  {
    title: 'Login',
    icon: 'lock-outline',
    link: '/pages/login',
  },
];

export function MENU_ITEMS(user: Observable<User>): Observable<NbMenuItem[]> {
  return user.pipe(map((u) => u ? ( u.isTA ? loggedInAsTA : loggedInAsStudent ) : notLoggedIn));
}
