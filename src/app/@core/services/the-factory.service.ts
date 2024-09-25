import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment.development';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { catchError, Observable, tap, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TheFactoryService {
  api: string = environment.apiTheFactory;

  constructor(private http: HttpClient) { }

  // getToken(): Observable<any> {
  //   // Define el cuerpo de la solicitud
  //   const body = {
  //     usuario: 'seqrhfvjvrhn_tfhka',
  //     clave: ',MkOoSs.VcVk'
  //   };
  
  //   // Verifica si el token está almacenado en el localStorage
  //   const storedUserInfo = localStorage.getItem('userInfo');
  //   let token = storedUserInfo ? JSON.parse(storedUserInfo).token : null;
  
  //   // Configura los encabezados, incluyendo los de CORS y Bearer Token
  //   const headers = new HttpHeaders({
  //     'Content-Type': 'application/json',
  //     'Authorization': token ? `Bearer ${token}` : '',
  //     // Los encabezados CORS generalmente no se configuran en el cliente
  //     'Access-Control-Allow-Origin': '*',
  //     'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept',
  //     'Access-Control-Allow-Methods': '*'
  //   });
  
  //   // Realiza la petición POST con el cuerpo y los encabezados
  //   return this.http.post<any>(`${this.api}api/Autenticacion/`, body, { observe: 'response', headers })
  //     .pipe(
  //       tap(response => {
  //         // Guarda el token en el localStorage desde la respuesta
  //         const newToken = response.body && response.body.token ? response.body.token : null;
  //         console.log('Token obtenido:', newToken);
  //         if (newToken) {
  //           const userInfo = { token: `Bearer ${newToken}` };
  //           localStorage.setItem('userInfo', JSON.stringify(userInfo));
  //         }
  //       }),
  //       catchError(error => {
  //         console.error('Error en la autenticación', error); // Manejo de errores
  //         return throwError(() => new Error('Error en la autenticación'));
  //       })
  //     );
  // }
  
  private api2 = 'https://demoemision.thefactoryhka.com.ve/api/';

  getToken(): Observable<any> {
    const token = localStorage.getItem('userInfo') ? JSON.parse(localStorage.getItem('userInfo')).token : null;

    const body = {
      usuario: 'seqrhfvjvrhn_tfhka',
      clave: ',MkOoSs.VcVk'
    };

    const headers = new HttpHeaders({
      'Authorization': token ? `Bearer ${token}` : '',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept',
      'Access-Control-Allow-Methods': '*',
      'Content-Type': 'application/json'
    });

    return this.http.post<any>(`${this.api2}ProtectedResource`, body, { headers })
      .pipe(
        catchError(error => {
          console.error('Error fetching protected resource', error);
          return throwError(() => new Error('Error fetching protected resource'));
        })
      );
  }

  authenticate(): Observable<any> {
    const body = {
      usuario: '',
      clave: ''
    };

    const headers = new HttpHeaders({
      'accept': 'application/json',
      'Content-Type': 'application/json'
    });

    return this.http.post<any>('https://demoemision.thefactoryhka.com.ve/api/Autenticacion', body, { headers })
      .pipe(
        catchError(error => {
          console.error('Error authenticating', error);
          return throwError(() => new Error('Error authenticating'));
        })
      );
  }
  
}
