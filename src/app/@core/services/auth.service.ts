import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment.development';
import { FormControl, FormGroup, NonNullableFormBuilder, Validators } from '@angular/forms';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { LoginForm } from '../models/forms/login-form.model';
import { login } from '../models/login.model';
import { Observable, of, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private api: string = environment.api;

  constructor(private fb: NonNullableFormBuilder, private http: HttpClient) { }

  formAuthLogin(): FormGroup<LoginForm>{
    const form: FormGroup<LoginForm> = this.fb.group({
      Username: new FormControl('', [Validators.required, Validators.maxLength(10)]),
      Password: new FormControl('', [Validators.required, Validators.minLength(4), Validators.maxLength(16)]),
    });
    return form;
  }

  public login(body: Partial<login>): Observable<any> {
    const { Username, Password } = body;

    // Codifica las credenciales en Base64
    const credentials = `${Username}:${Password}`;
    const authHeader = `Basic ${btoa(credentials)}`;

    // Define los encabezados
    const headers = new HttpHeaders({
      'Authorization': authHeader,
      'x-api-key': 'B5D31933-C996-476C-B116-EF212A41479A',
      'x-api-id': '1093',
      'Content-Type': 'application/json'
    });

    // Agrega el campo "terminal": "postman" al cuerpo de la solicitud
    const requestBody = {
      ...body,
      terminal: 'postman'
    };

    // Realiza la petición POST con los encabezados y el cuerpo ajustado
    return this.http.post<HttpResponse<any>>(`${this.api}main/login`, requestBody, { headers, observe: 'response' }).pipe(
      tap(response => {
        // Guarda el pragma en el localStorage
        const pragma = response.headers.get('pragma');
        console.log(pragma);
        if (pragma) {
          const userInfo = { pragma };
          localStorage.setItem('userInfo', JSON.stringify(userInfo));
            // Configura el temporizador para cerrar la sesión después de 30 minutos (1800000 ms)
            setTimeout(() => {
              this.logout();
            }, 1800000); // 30 minutos en milisegundos = 1800000
        
        }
      })
    );
  }

  public currentUser(): Observable<any> {
    const userInfo = localStorage.getItem('userInfo');
    if (userInfo) {
      return of(JSON.parse(userInfo));
    } else {
      return of(null);
    }
  }
  
    public logout(): void {
      localStorage.removeItem('userInfo');
      // Aquí puedes agregar cualquier otra lógica necesaria para cerrar la sesión
      console.log('Sesión cerrada automáticamente.');
    }

}
