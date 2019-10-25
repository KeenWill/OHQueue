import { Component, Input } from '@angular/core';

import { QuestionService } from '../question.service';
import { Question } from '../models/question.model';
import { User } from '../../../@core/auth/auth.service';
import { EditQuestionDialog } from './edit-question-dialog.component';
import { MatDialog } from '@angular/material';

@Component({
  selector: 'question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.scss'],
})
export class QuestionComponent {

  @Input() question: Question;
  @Input() user: User;

  constructor(private questionService: QuestionService, public dialog: MatDialog) { }

  /*addHeartToNote(val: number) {
    if (this.note.id) {
      this.questionService.updateNote(this.note.id, { hearts: val + 1 });
    } else {
      console.error('Note missing ID!');
    }
  }*/

  deleteQuestion(id: string) {
    //this.questionService.deleteQuestion(id);
    console.log("deleting question")
  }

  answerQuestion(id: string) {
    //this.questionService.deleteQuestion(id);
    this.questionService.answerQuestion(id, this.question.queueId, this.user.uid);
    console.log("answering question")
  }

  unanswerQuestion(id: string) {
    //this.questionService.deleteQuestion(id);
    this.questionService.unanswerQuestion(id, this.question.queueId);
    console.log("unanswering question")
  }

  updateQuestion() {
    const dialogRef = this.dialog.open(EditQuestionDialog, {
      width: '250px',
      data: {question: this.question}
    });

    dialogRef.afterClosed().subscribe(result => {
      result.question.desc = result.desc;
      result.question.title = result.title;
      this.questionService.updateQuestion(result);
    });
  }

}
