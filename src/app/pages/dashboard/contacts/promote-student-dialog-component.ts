import {Component, Inject} from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'promote-student-dialog',
  templateUrl: './promote-student-dialog.component.html',
  styleUrls: ['./promote.component.scss'],
})
export class PromoteStudentDialogComponent {
  constructor(@Inject(MAT_DIALOG_DATA) public data: any) {}
  promoteStudent () {
    this.data.promoteStudent();
  }
}
