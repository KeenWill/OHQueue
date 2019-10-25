import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Question } from '../models/question.model';

@Component({
  selector: 'ask-question-dialog',
  templateUrl: './ask-question-dialog.component.html',
  styleUrls: ['./ask-question-dialog.component.scss'],
})
export class AskQuestionDialogComponent {

    constructor(
        public dialogRef: MatDialogRef<AskQuestionDialog>,
        @Inject(MAT_DIALOG_DATA) public question: Question) {}

    onCloseClick(): void {
        this.dialogRef.close();
    }

}
