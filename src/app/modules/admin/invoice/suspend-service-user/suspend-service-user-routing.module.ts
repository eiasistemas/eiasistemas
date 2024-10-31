import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SuspendServiceUserComponent } from './suspend-service-user.component';



const routes: Routes = [
  {
    path: '',
    component: SuspendServiceUserComponent,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SuspendServiceUserRoutingModule { }