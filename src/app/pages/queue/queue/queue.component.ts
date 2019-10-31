import { Component, OnInit, Input } from '@angular/core';
import { QuestionService } from '../question.service';
import { Observable, of } from 'rxjs';
import { Queue } from '../models/queue.model';
import { Question } from '../models/question.model';

import { NbToastrService } from '@nebular/theme';

import { AskQuestionDialogComponent } from './ask-question-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { AuthService } from '../../../@core/auth/auth.service';

import { User } from '../../../@core/auth/auth.service';
import { QueuesService } from '../queues.service';
import { map } from 'rxjs/operators';

@Component({
  selector: 'queue',
  templateUrl: './queue.component.html',
  styleUrls: ['./queue.component.scss'],
})
export class QueueComponent implements OnInit {

  @Input() queue: Queue;

  showAnswered: boolean = true;
  private unansweredQuestions: Observable<Question[]>;
  private allQuestions: Observable<Question[]>;

  constructor(
    private questionService: QuestionService,
    private queuesService: QueuesService,
    private toastrService: NbToastrService,
    public auth: AuthService,
    public dialog: MatDialog) { }

  ngOnInit() {
    this.allQuestions = this.questionService.getQuestions(this.queue.id);
    this.unansweredQuestions = this.allQuestions.pipe(map(questions =>
        questions.filter(question => !question.served)));
  }

  askQuestion(asker: User) {
    this.showToast('Asked Question Answered Questions');
    const dialogRef = this.dialog.open(AskQuestionDialogComponent, {
      width: '250px',
      data: {},
    });

    dialogRef.afterClosed().subscribe(result => {
      this.questionService.createQuestion(asker, this.queue.id, result.title || '', result.desc || '');
      this.showToast('Asked Question', !!result.title ? result.title : undefined);
    });
  }

  showAnsweredQuestions() {
    this.showToast('Revealing Answered Questions');
    this.showAnswered = true;
    // this.answeredQuestions = this.answeredQuestionsObs;
  }

  hideAnsweredQuestions() {
    this.showToast('Hiding Answered Questions');
    this.showAnswered = false;
    // this.answeredQuestions = of([]);
  }

  openQueue() {
    this.showToast('Opened Queue');
    this.queuesService.openQueue(this.queue.id);
  }

  closeQueue() {
    this.showToast('Closed Queue');
    this.queuesService.closeQueue(this.queue.id);
  }

  deleteQueue() {
    this.showToast('Deleted Queue');
    this.queuesService.deleteQueue(this.queue.id);
  }

  showToast(title: string, message?: string): void {
    this.toastrService.show(!!message ? message : '', title, { limit: 3, status: 'success' });
  }

}
