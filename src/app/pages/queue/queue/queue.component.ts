import {Component, OnInit, Input} from '@angular/core';
import {QuestionService} from '../question.service';
import {Observable, of} from 'rxjs';
import {Queue} from '../models/queue.model';
import {Question} from '../models/question.model';

import { NbToastrService } from '@nebular/theme';

import { AskQuestionDialogComponent } from './ask-question-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { AuthService } from '../../../@core/auth/auth.service';

import {User} from '../../../@core/auth/auth.service';
import {QueuesService} from '../queues.service';
import {map} from 'rxjs/operators';

@Component({
  selector: 'queue',
  templateUrl: './queue.component.html',
  styleUrls: ['./queue.component.scss'],
})
export class QueueComponent implements OnInit {

  @Input() queue: Queue;
  @Input() user: User;

  showAnswered: boolean = true;
  private unansweredQuestions: Observable<Question[]>;
  private allQuestions: Observable<Question[]>;

  constructor(
    private questionService: QuestionService,
    private queuesService: QueuesService,
    private toastrService: NbToastrService,
    public auth: AuthService,
    public dialog: MatDialog) { }

  static timestampComparison(qa: Question, qb: Question): number {
    if (qa.timestamp < qb.timestamp) return 1;
    if (qa.timestamp > qb.timestamp) return -1;
    return 0;
  }

 static servedComparison(qa: Question, qb: Question) {
    if (qa.served && qb.served) return 0;
    if (qa.served && !qb.served) return 1;
    return -1;
  }

  ngOnInit() {
    this.allQuestions = this.questionService.getQuestions(this.queue.id).pipe(map(questions => questions
      .sort((qa, qb) => QueueComponent.timestampComparison(qa, qb) + 10 * QueueComponent.servedComparison(qa, qb))));
    this.unansweredQuestions = this.allQuestions.pipe(map(questions =>
      questions.filter(question => !question.served)));
    // determine if the user's question is in the queue
    this.allQuestions.pipe(map(questions => questions
      .reduce((acc, question) => acc || question.uid === this.user.uid, false)))
      .subscribe(containsUserQuestion => {
          this.queue.containsUserQuestion = containsUserQuestion;
          this.queue.containsUserQuestionUnknown = false;
      });
  }

  askQuestion(asker: User) {
    this.showToast('Asked Question Answered Questions');
    const dialogRef = this.dialog.open(AskQuestionDialogComponent, {
      width: '250px',
      data: {},
    });

    dialogRef.afterClosed().subscribe(result => {
      this.questionService.createQuestion(asker, this.queue.id, result.title || '', result.desc || '');
      this.showToast('Asked Question', result.title || null);
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
    this.toastrService.show(message || '', title, { limit: 3, status: 'success' });
  }

}
