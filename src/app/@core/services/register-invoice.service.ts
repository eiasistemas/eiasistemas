import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment.development';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { RegisterInvoiceForm } from '../models/forms/register-invoice-form.model';

@Injectable({
  providedIn: 'root'
})
export class RegisterInvoiceService {
  api: string = environment.api;

  createRegisterFormInvoice(values: any): FormGroup<RegisterInvoiceForm> {
    return this.fb.group({
      invoice: this.fb.group({
        codClie: new FormControl(values.codClie),
        codVend: new FormControl(values.codVend),
        codUbic: new FormControl(values.codUbic),
        descrip: new FormControl(values.descrip),
        direc1: new FormControl(values.direc1),
        direc2: new FormControl(values.direc2),
        mtoTotal: new FormControl(values.mtoTotal),
        tgravable: new FormControl(values.tgravable),
        texento: new FormControl(values.texento),
        monto: new FormControl(values.monto),
        mtoTax: new FormControl(values.mtoTax),
        contado: new FormControl(values.contado),
        tipoCli: new FormControl(values.tipoCli),
        fechaE: new FormControl(values.fechaE),
        fechaV: new FormControl(values.fechaV),
        Id3: new FormControl(values.Id3),
        ordenC: new FormControl(values.ordenC),
        telef: new FormControl(values.telef),
        tipoFac: new FormControl(values.tipoFac)
      }),
      items: this.fb.array([
        this.fb.group({
          codItem: new FormControl(values.items[0].codItem),
          codUbic: new FormControl(values.items[0].codUbic),
          codVend: new FormControl(values.items[0].codVend),
          descrip1: new FormControl(values.items[0].descrip1),
          priceO: new FormControl(values.items[0].priceO),
          precio: new FormControl(values.items[0].precio),
          cantidad: new FormControl(values.items[0].cantidad),
          mtoTax: new FormControl(values.items[0].mtoTax)
        })
      ]),
      payments: this.fb.array([
        this.fb.group({
          monto: new FormControl(values.payments[0].monto),
          codTarj: new FormControl(values.payments[0].codTarj),
          fechae: new FormControl(values.payments[0].fechae),
          descrip: new FormControl(values.payments[0].descrip)
        })
      ]),
      taxes: this.fb.array([
        this.fb.group({
          monto: new FormControl(values.taxes[0].monto),
          codTaxs: new FormControl(values.taxes[0].codTaxs),
          tgravable: new FormControl(values.taxes[0].tgravable)
        })
      ])
    }) as FormGroup<RegisterInvoiceForm>;
  }

  submitInvoice(form: FormGroup<RegisterInvoiceForm>): Observable<any> {
    // Obtén el objeto userInfo del localStorage
    const userInfo = JSON.parse(localStorage.getItem('userInfo') || '{}');
    const pragma = userInfo.pragma;

    // Configura los headers
    const headers = new HttpHeaders({
      'Pragma': pragma
    });

    const url = `${this.api}adm/invoice`;

    // Formatear los datos del formulario
    const formattedData = [
      {
        invoice: form.get('invoice').value,
        items: form.get('items').value,
        payments: form.get('payments').value,
        taxes: form.get('taxes').value
      }
    ];

    return this.http.post(url, formattedData, { headers });
  }

  constructor(private fb: FormBuilder, private http: HttpClient) { }
}
