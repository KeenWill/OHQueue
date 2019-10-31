import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Question } from '../models/question.model';

@Component({
  selector: 'edit-question-dialog',
  templateUrl: './edit-question-dialog.component.html',
  styleUrls: ['./edit-question-dialog.component.scss'],
})
export class EditQuestionDialogComponent {
    private question: Question;
    constructor(
        public dialogRef: MatDialogRef<EditQuestionDialogComponent>,
        @Inject(MAT_DIALOG_DATA) public data: any) {
            this.question = data.question;
        }

    onCloseClick(): void {
        this.dialogRef.close();
    }

}
