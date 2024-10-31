import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class VersionService {
  private versionUrl = 'assets/version.json'; // Asegúrate de que la ruta sea correcta

  constructor(private http: HttpClient) {}

  getVersion(): Observable<{ version: string }> {
    return this.http.get<{ version: string }>(this.versionUrl);
  }
}
