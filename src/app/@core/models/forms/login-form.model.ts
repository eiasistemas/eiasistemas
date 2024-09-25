import { FormControl } from "@angular/forms"

export interface LoginForm {
    Username: FormControl<string>;
    Password: FormControl<string>;
}