import { NgModule } from '@angular/core';
import { NbMenuModule, NbListModule, NbCardModule, NbUserModule, NbButtonModule, NbCheckboxModule } from '@nebular/theme';


import { ThemeModule } from '../@theme/theme.module';
import { PagesComponent } from './pages.component';
import { DashboardModule } from './dashboard/dashboard.module';
import { PagesRoutingModule } from './pages-routing.module';


import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule, MatDialogModule, MatInputModule, MatCardModule, MatButtonModule,
  MatGridListModule, MatMenuModule, MatIconModule, MatCheckboxModule } from '@angular/material';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { QueuesComponent } from './queue/queues/queues.component';
import { QueueComponent } from './queue/queue/queue.component';
import { QuestionComponent } from './queue/question/question.component';
import { AskQuestionDialogComponent } from './queue/queue/ask-question-dialog.component';
import { EditQuestionDialogComponent } from './queue/question/edit-question-dialog.component';
import { NewQueueDialogComponent } from './queue/queues/new-queue-dialog.component';
import { QueuesService } from './queue/queues.service';
import { QuestionService } from './queue/question.service';
import { LoginComponent } from './login/login.component';
import { PromoteStudentDialogComponent } from './dashboard/contacts/promote-student-dialog-component';

@NgModule({
  imports: [
    PagesRoutingModule,
    ThemeModule,
    NbMenuModule,
    DashboardModule,

    CommonModule,
    FormsModule,
    MatFormFieldModule,
    MatDialogModule,
    MatInputModule,
    MatCardModule,
    MatButtonModule,
    MatGridListModule,
    DragDropModule,
    MatMenuModule,
    MatIconModule,
    ThemeModule,
    NbCheckboxModule,
    MatCheckboxModule,

    NbCardModule,
    NbListModule,
    NbUserModule,
    NbButtonModule,
  ],
  declarations: [PagesComponent, QueuesComponent, QueueComponent, QuestionComponent, AskQuestionDialogComponent,
    NewQueueDialogComponent, LoginComponent, EditQuestionDialogComponent, PromoteStudentDialogComponent],
  providers: [QueuesService, QuestionService],
  entryComponents: [AskQuestionDialogComponent, NewQueueDialogComponent,
    EditQuestionDialogComponent, PromoteStudentDialogComponent],
})
export class PagesModule {
}
