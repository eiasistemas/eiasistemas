import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CollectionNoticesComponent } from './collection-notices.component';
import { CollectionNoticesRoutingModule } from './collection-notices-routing.module';



@NgModule({
  declarations: [
    CollectionNoticesComponent
  ],
  imports: [
    CommonModule,
    CollectionNoticesRoutingModule
  ]
})
export class CollectionNoticesModule { }
