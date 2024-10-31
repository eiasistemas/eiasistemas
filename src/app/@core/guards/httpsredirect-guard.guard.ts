import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class HttpsRedirectGuard implements CanActivate {
  constructor(private router: Router) {}

  canActivate(): boolean {
    if (location.protocol === 'http:') {
      const httpsUrl = `https://${location.hostname}${location.port ? ':' + location.port : ''}${location.pathname}${location.search}`;
      location.href = httpsUrl;
      return false;
    }
    return true;
  }
}