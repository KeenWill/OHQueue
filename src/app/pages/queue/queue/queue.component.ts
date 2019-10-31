import { Component, OnInit, Input } from '@angular/core';
import {QuestionService} from '../question.service';
import { Observable, of } from 'rxjs';
import { Queue } from '../models/queue.model';
import { Question } from '../models/question.model';

import {AskQuestionDialogComponent} from './ask-question-dialog.component';
import {MatDialog} from '@angular/material/dialog';
import {AuthService} from '../../../@core/auth/auth.service';

import { User } from '../../../@core/auth/auth.service';
import {QueuesService} from '../queues.service';
import {map} from 'rxjs/operators';

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
        public auth: AuthService,
        public dialog: MatDialog) {
    }
  
    timestampComparison(qa: Question, qb: Question): number {
      if (qa.timeCreated < qb.timeCreated) return 1;
      if (qa.timeCreated > qb.timeCreated) return -1;
      return 0;
    }
  
    servedComparison(qa: Question, qb: Question) {
      if (qa.served && qb.served) return 0;
      if (qa.served && !qb.served) return 1;
      return -1;
    }

    ngOnInit() {
        this.allQuestions = this.questionService.getQuestions(this.queue.id).pipe(map(questions => questions
            .sort((qa, qb) => timestampComparison(qa, qb) + 10 * servedComparison(qa, qb))));
        this.unansweredQuestions = this.allQuestions.pipe(map(questions =>
            questions.filter(question => !question.served)));
    }

    askQuestion(asker: User) {
        const dialogRef = this.dialog.open(AskQuestionDialogComponent, {
            width: '250px',
            data: {},
        });

        dialogRef.afterClosed().subscribe(result => {
            this.questionService.createQuestion(asker, this.queue.id, result.title || '', result.desc || '');
        });
    }

    showAnsweredQuestions() {
        this.showAnswered = true;
        // this.answeredQuestions = this.answeredQuestionsObs;
    }

    hideAnsweredQuestions() {
        this.showAnswered = false;
        // this.answeredQuestions = of([]);
    }

    answerQuestion() {
        // this.questionService.answerQuestion(this.queue.id);
        console.log('answering question');
    }

    openQueue() {
        this.queuesService.openQueue(this.queue.id);
    }

    closeQueue() {
        this.queuesService.closeQueue(this.queue.id);
    }

    deleteQueue() {
        this.queuesService.deleteQueue(this.queue.id);
    }

}
