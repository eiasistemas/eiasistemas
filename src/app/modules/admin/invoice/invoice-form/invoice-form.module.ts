import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InvoiceFormComponent } from './invoice-form.component';
import { InvoiceFormRoutingModule } from './invoice-form-routing.module';
import { InputTextModule } from 'primeng/inputtext';
import { FloatLabelModule } from 'primeng/floatlabel';
import { DropdownModule } from 'primeng/dropdown';
import { ButtonModule } from 'primeng/button';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { ReactiveFormsModule } from '@angular/forms';
import { OverlayPanelModule } from 'primeng/overlaypanel';
import { Overlay } from 'primeng/overlay';
import { DocumentoElectronicoComponent } from '../the-factory-form/the-factory-form.component';


@NgModule({
  declarations: [
    InvoiceFormComponent,
    DocumentoElectronicoComponent
  ],
  imports: [
    CommonModule,
    InvoiceFormRoutingModule,
    InputTextModule,
    FloatLabelModule,
    DropdownModule,
    ButtonModule,
    AutoCompleteModule,
    ReactiveFormsModule,
    OverlayPanelModule
  ]
})
export class InvoiceFormModule { }
