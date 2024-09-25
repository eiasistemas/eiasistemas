import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CreditNoteComponent } from './credit-note.component';
import { CreditNoteRoutingModule } from './credit-note-routing.module';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';



@NgModule({
  declarations: [
    CreditNoteComponent
  ],
  imports: [
    CommonModule,
    ButtonModule,
    CreditNoteRoutingModule,
    InputTextModule
  ],
})
export class CreditNoteModule { }
