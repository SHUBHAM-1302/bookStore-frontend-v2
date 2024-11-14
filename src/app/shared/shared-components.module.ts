import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserProfileComponent } from './components/user-profile/user-profile.component';
import { ButtonModule } from 'primeng/button';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { DividerModule } from 'primeng/divider';
import { ConfirmPopupModule } from 'primeng/confirmpopup';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { CardModule } from 'primeng/card';

@NgModule({
    declarations: [
      UserProfileComponent,

    ],
    imports: [
      CommonModule,
      ButtonModule,
      FormsModule,
      ReactiveFormsModule,
      InputTextModule,
      DividerModule,
      ConfirmPopupModule,
      InputTextareaModule,
      CardModule
    ],
    exports: [
        ButtonModule,
        FormsModule,
        ReactiveFormsModule,
        UserProfileComponent,
        InputTextModule,
        DividerModule,
        InputTextareaModule,
        CardModule
    ]
  })
  export class SharedComponentsModule { }
