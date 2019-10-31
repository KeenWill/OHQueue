import { Component, Input } from '@angular/core';

import { QuestionService } from '../question.service';
import { Question } from '../models/question.model';
import { User } from '../../../@core/auth/auth.service';
import { EditQuestionDialogComponent } from './edit-question-dialog.component';
import { MatDialog } from '@angular/material';
import { NbToastrService } from '@nebular/theme';

@Component({
  selector: 'question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.scss'],
})
export class QuestionComponent {

  @Input() question: Question;
  @Input() user: User;

  constructor(
      private questionService: QuestionService,
      private toastrService: NbToastrService,
      public dialog: MatDialog,
  ) { }

  /*addHeartToNote(val: number) {
    if (this.note.id) {
      this.questionService.updateNote(this.note.id, { hearts: val + 1 });
    } else {
      console.error('Note missing ID!');
    }
  }*/

  deleteQuestion(id: string) {
    // this.questionService.deleteQuestion(id);
    this.showToast('Deleted Question', this.question.title || null);
  }

  answerQuestion(id: string) {
    // this.questionService.deleteQuestion(id);
    this.questionService.answerQuestion(id, this.question.queueId, this.user.uid);
    this.showToast('Answered Question', !!this.question.title ? this.question.title : undefined);
  }

  unanswerQuestion(id: string) {
    // this.questionService.deleteQuestion(id);
    this.questionService.unanswerQuestion(id, this.question.queueId);
    this.showToast('Unanswered Question', this.question.title || null);
  }

  updateQuestion() {
    const dialogRef = this.dialog.open(EditQuestionDialogComponent, {
      width: '250px',
      data: { question: this.question },
    });

    dialogRef.afterClosed().subscribe(result => {
      this.showToast('Updated Question');
      result.question.desc = result.desc;
      result.question.title = result.title;
      this.questionService.updateQuestion(result);
    });
  }

  showToast(title: string, message?: string): void {
    this.toastrService.show(!!message ? message : '', title, { limit: 3, status: 'success' });
  }

}
