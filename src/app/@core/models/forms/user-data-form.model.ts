import { FormControl } from "@angular/forms";

export interface userDataForm {
    cedula: FormControl<string>;
    cliente: FormControl<string>;
    direccion: FormControl<string>;
    telefono: FormControl<string>;
    email: FormControl<string>;
    direccionServicio: FormControl<string>;
    descuento: FormControl<string>;
}