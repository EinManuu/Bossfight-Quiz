import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';

export const authGuardGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);

  if (localStorage.getItem('loggedIn') === "true") {
    return true;
  }

  return router.createUrlTree(['/login']);
};
