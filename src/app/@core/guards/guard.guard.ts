import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { inject } from '@angular/core';
import { catchError, map, throwError } from 'rxjs';

export const guardGuard: CanActivateFn = (route, state) => {
  const router: Router = inject(Router);
  const userService: AuthService = inject(AuthService);

  return userService.currentUser().pipe(
    catchError((error) => {
      router.navigateByUrl('/login');
      return throwError(() => error);
    }),
    map((user) => {
      if (user) {
        return true;
      } else {
        router.navigateByUrl('/login');
        return false;
      }
    })
  );
};
