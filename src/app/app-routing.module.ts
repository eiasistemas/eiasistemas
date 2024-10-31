import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { guardGuard } from './@core/guards/guard.guard';
import { HttpsRedirectGuard } from './@core/guards/httpsredirect-guard.guard';


const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full',
  },
  {
    path: 'login',
    loadChildren: () =>
      import('./modules/auth/login/login.module').then((m) => m.LoginModule),
    title: 'Iniciar Sesión',
    //canActivate: [HttpsRedirectGuard]
  },
  {
    path: 'invoice/invoiceForm',
    loadChildren: () =>
      import('./modules/admin/invoice/invoice-form/invoice-form.module').then((m) => m.InvoiceFormModule),
    title: 'Inicio',
    //canActivate: [guardGuard, HttpsRedirectGuard],
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
