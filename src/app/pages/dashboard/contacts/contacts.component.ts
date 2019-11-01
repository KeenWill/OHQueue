import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { User, AuthService } from '../../../@core/auth/auth.service';
import { MatDialog } from '@angular/material';
import {PromoteStudentDialogComponent} from './promote-student-dialog-component';

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

  constructor(/*private userService: UserData*/ public authService: AuthService, public dialog: MatDialog) {
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
    this.dialog.open(PromoteStudentDialogComponent, {
      height: '200px',
      width: '400px',
      data: {promoteStudent: () => this.authService.promoteToTA(uid)},
    });
  }

  demote(uid: string) {
    this.authService.demoteFromTA(uid);
  }

  /*ngOnDestroy() {
    this.alive = false;
  }*/
}
