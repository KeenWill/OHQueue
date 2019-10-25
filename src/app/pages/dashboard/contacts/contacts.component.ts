import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { User, AuthService } from '../../../@core/auth/auth.service';

// import { Contacts, RecentUsers, UserData } from '../../../@core/data/users';

@Component({
  selector: 'ngx-contacts',
  styleUrls: ['./contacts.component.scss'],
  templateUrl: './contacts.component.html',
})
export class ContactsComponent {

  // private alive = true;

  tas: Observable<User[]>;
  students: Observable<User[]>;

  constructor(/*private userService: UserData*/ public authService: AuthService) {
    /*forkJoin(
      this.userService.getContacts(),
      this.userService.getRecentUsers(),
    )
      .pipe(takeWhile(() => this.alive))
      .subscribe(([contacts, recent]: [Contacts[], RecentUsers[]]) => {
        this.contacts = contacts;
        this.recent = recent;
      });*/
    this.tas = this.authService.getTAs();
    this.students = this.authService.getStudents();
  }

  promote(uid: string) {
    this.authService.promoteToTA(uid);
  }

  demote(uid: string) {
    this.authService.demoteFromTA(uid);
  }

  /*ngOnDestroy() {
    this.alive = false;
  }*/
}
