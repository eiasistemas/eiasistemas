import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment.development';
import { FormControl, FormGroup, NonNullableFormBuilder, Validators } from '@angular/forms';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { LoginForm } from '../models/forms/login-form.model';
import { login } from '../models/login.model';
import { Observable, of, tap, catchError } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private api: string = environment.api;
  private logoutTimeout: any;

  constructor(private fb: NonNullableFormBuilder, private http: HttpClient, private router: Router) { }

  formAuthLogin(): FormGroup<LoginForm> {
    return this.fb.group({
      Username: new FormControl('', [Validators.required, Validators.maxLength(10)]),
      Password: new FormControl('', [Validators.required, Validators.minLength(4), Validators.maxLength(16)]),
    });
  }

  public login(body: Partial<login>): Observable<any> {
    const { Username, Password } = body;
    const credentials = `${Username}:${Password}`;
    const authHeader = `Basic ${btoa(credentials)}`;
    const headers = new HttpHeaders({
      'Authorization': authHeader,
      'x-api-key': 'B5D31933-C996-476C-B116-EF212A41479A',
      'x-api-id': '1093',
      'Content-Type': 'application/json'
    });
    const requestBody = { ...body, terminal: 'postman' };

    return this.http.post<HttpResponse<any>>(`${this.api}main/login`, requestBody, { headers, observe: 'response' }).pipe(
      tap(response => {
        const pragma = response.headers.get('pragma');
        if (pragma) {
          localStorage.setItem('userInfo', JSON.stringify({ pragma }));
          this.clearLogoutTimeout(); // Limpia cualquier temporizador previo
          this.logoutTimeout = setTimeout(() => {
            this.logout();
          }, 1200000); // 10 segundos
        }
      }),
      catchError((error) => {
        console.error('Error en el inicio de sesión', error);
        return of(null); // Maneja el error y evita continuar con el temporizador si hay error
      })
    );
  }

  private clearLogoutTimeout() {
    if (this.logoutTimeout) {
      clearTimeout(this.logoutTimeout);
      this.logoutTimeout = null;
    }
  }

  public currentUser(): Observable<any> {
    const userInfo = localStorage.getItem('userInfo');
    return of(userInfo ? JSON.parse(userInfo) : null);
  }

  public logout(): void {
    this.clearLogoutTimeout(); // Limpia el temporizador
    localStorage.removeItem('userInfo');
    console.log('Sesión cerrada automáticamente.');
    this.router.navigateByUrl('/login');
  }
}
