import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { DialogService } from 'primeng/dynamicdialog';
import { AuthService } from '../../../@core/services/auth.service';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { VersionService } from '../../../@core/services/version.service';
import { TheFactoryService } from '../../../@core/services/the-factory.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class LoginComponent implements OnInit{
  version: string;

  ngOnInit(): void {
    this.versionService.getVersion().subscribe(data => {
      this.version = data.version;
      console.log('Version:', this.version);
    });

    
    // this.theFactoryService.getToken().subscribe(
    //   (data) => {
    //     console.log('Token:', data);
    //   },
    //   (error) => {
    //     console.error('Error fetching token:', error);
    //   }
    // );

    // this.theFactoryService.authenticate().subscribe(
    //   (data) => {
    //     console.log('Authenticated:', data);
    //   },
    //   (error) => {
    //     console.error('Error authenticating:', error);
    //   }
    // );
  }

  loginForm = this.authService.formAuthLogin();

  getErrorMessage(field: string) {
    const error = this.loginForm.get(field);
    let message = '';

    if (error?.errors?.['required']) {
      message = 'El campo es requerido';
    }
    if (error?.hasError('minlength') || error?.hasError('maxlength')) {
      message = 'Debe colocar un mínimo de 4 caracteres y un máximo de 16';
    }
    if (error?.hasError('maxlength')) {
      message = 'El usuario tiene un máximo de 10 caracteres';
    }
    if (error.hasError('Username')) {
      message = 'El usuario no es válido';
    }

    return message;
  }

  isValidField(field: string) {
    const error = this.loginForm.get(field);
    return (error?.touched || error?.dirty) && error?.invalid;
  }

  onSubmit() {
    if (this.loginForm.valid) {
      this.authService.login(this.loginForm.value).subscribe({
        next: response => {
          console.log('Login successful:', response);
          console.log("Token:", response.token);
          this.router.navigateByUrl('/invoice/invoiceForm');
        },
        error: error => {
          this.messageService.add({severity: 'error', summary: 'Error', detail: 'Usuario o contraseña incorrectos'});
        }
      });
    } else {
      console.log('Form is invalid');
    }
  }

  constructor(public dialogService: DialogService, private authService: AuthService, private router: Router, private messageService: MessageService, private versionService: VersionService, private theFactoryService: TheFactoryService) {}
}