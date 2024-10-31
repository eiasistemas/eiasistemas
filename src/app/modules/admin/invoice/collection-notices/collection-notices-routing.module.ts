import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CollectionNoticesComponent } from './collection-notices.component';


const routes: Routes = [
  {
    path: '',
    component: CollectionNoticesComponent,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CollectionNoticesRoutingModule { }