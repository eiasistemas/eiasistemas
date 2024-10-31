import { FormControl, FormGroup, FormArray } from "@angular/forms";

export interface RegisterInvoiceForm {
  invoice: FormGroup<{
    codClie: FormControl<string>;
    codVend: FormControl<string>;
    codUbic: FormControl<string>;
    descrip: FormControl<string>;
    direc1: FormControl<string>;
    direc2: FormControl<string>;
    mtoTotal: FormControl<number>;
    tgravable: FormControl<number>;
    texento: FormControl<number>;
    monto: FormControl<number>;
    mtoTax: FormControl<number>;
    contado: FormControl<number>;
    tipoCli: FormControl<number>;
    fechaE: FormControl<string>;
    fechaV: FormControl<string>;
    Id3: FormControl<string>;
    ordenC: FormControl<string>;
    telef: FormControl<string>;
    tipoFac: FormControl<string>;
  }>;
  items: FormArray<FormGroup<{
    codItem: FormControl<string>;
    codUbic: FormControl<string>;
    codVend: FormControl<string>;
    descrip1: FormControl<string>;
    priceO: FormControl<number>;
    precio: FormControl<number>;
    cantidad: FormControl<number>;
    mtoTax: FormControl<number>;
  }>>;
  payments: FormArray<FormGroup<{
    monto: FormControl<number>;
    codTarj: FormControl<string>;
    fechae: FormControl<string>;
    descrip: FormControl<string>;
  }>>;
  taxes: FormArray<FormGroup<{
    monto: FormControl<number>;
    codTaxs: FormControl<string>;
    tgravable: FormControl<number>;
  }>>;
}