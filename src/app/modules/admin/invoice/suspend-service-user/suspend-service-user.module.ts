import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SuspendServiceUserComponent } from './suspend-service-user.component';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';


@NgModule({
  declarations: [
    SuspendServiceUserComponent
  ],
  imports: [
    CommonModule,
    ButtonModule,
    InputTextModule
  ]
})
export class SuspendServiceUserModule { }
