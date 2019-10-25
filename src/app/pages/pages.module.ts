import { NgModule } from '@angular/core';
import { NbMenuModule, NbListModule, NbCardModule, NbUserModule, NbButtonModule, NbCheckboxModule } from '@nebular/theme';


import { ThemeModule } from '../@theme/theme.module';
import { PagesComponent } from './pages.component';
import { DashboardModule } from './dashboard/dashboard.module';
import { PagesRoutingModule } from './pages-routing.module';


import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule, MatDialogModule, MatInputModule, MatCardModule, MatButtonModule, MatGridListModule, MatMenuModule, MatIconModule, MatCheckboxModule } from '@angular/material';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { QueuesComponent } from './queue/queues/queues.component';
import { QueueComponent } from './queue/queue/queue.component';
import { QuestionComponent } from './queue/question/question.component';
import { AskQuestionDialog } from './queue/queue/ask-question-dialog.component';
import { EditQuestionDialog } from './queue/question/edit-question-dialog.component';
import { NewQueueDialog } from './queue/queues/new-queue-dialog.component';
import { QueuesService } from './queue/queues.service';
import { QuestionService } from './queue/question.service';
import { NbUser } from '@nebular/auth';
import { LoginComponent } from './login/login.component';

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
    NbButtonModule
  ],
  declarations: [PagesComponent, QueuesComponent, QueueComponent, QuestionComponent, AskQuestionDialog, NewQueueDialog,
  LoginComponent, EditQuestionDialog],
  providers: [QueuesService, QuestionService],
  entryComponents: [AskQuestionDialog, NewQueueDialog, EditQuestionDialog]
})
export class PagesModule {
}
