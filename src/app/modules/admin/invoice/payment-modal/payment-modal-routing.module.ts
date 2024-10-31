import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PaymentModalComponent } from './payment-modal.component';



const routes: Routes = [
  {
    path: '',
    component: PaymentModalComponent,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PaymentModalRoutingModule { }