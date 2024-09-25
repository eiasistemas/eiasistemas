import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';


import { CheckboxModule } from 'primeng/checkbox';
import { ButtonModule } from 'primeng/button';
import {StyleClassModule} from 'primeng/styleclass';
import { DynamicDialogModule } from 'primeng/dynamicdialog';
import { DialogModule } from 'primeng/dialog';
import { TableModule } from 'primeng/table';
import { InputTextModule } from 'primeng/inputtext';
import { ReactiveFormsModule } from '@angular/forms';
import { LoginComponent } from './login.component';
import { LoginRoutingModule } from './login-routing.module';



@NgModule({
  declarations: [
    LoginComponent
  ],
  imports: [
    CommonModule,
    LoginRoutingModule,
    CheckboxModule,
    ButtonModule,
    StyleClassModule,
    DynamicDialogModule,
    DialogModule,
    TableModule,
    InputTextModule,
    ReactiveFormsModule
  ]
})
export class LoginModule { }
