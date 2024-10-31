import { FormControl } from "@angular/forms";

export interface InvoiceForm {
    //haz que esto sea con form control
    codigo: FormControl<string>;
    descripcion: FormControl<string>;
    cantidad: FormControl<number>;
    precio: FormControl<number>;
    descuento: FormControl<number>;
    impuesto: FormControl<number>;
    totalItem: FormControl<number>;
}