import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { LoaderComponent } from './loader.component';
import { ProgressBarModule } from 'primeng/progressbar';

@NgModule({
  declarations: [
    LoaderComponent
  ],
  imports: [
    CommonModule,
    ProgressSpinnerModule,
    ProgressBarModule
  ],
  exports: [LoaderComponent]
})
export class LoaderModule { }
