import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DropdownModule } from 'primeng/dropdown';
import { PaymentModalComponent } from './payment-modal.component';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    PaymentModalComponent
  ],
  imports: [
    CommonModule,
    DropdownModule,
    InputTextModule,
    ButtonModule,
    FormsModule
  ]
})
export class PaymentModalModule { }
