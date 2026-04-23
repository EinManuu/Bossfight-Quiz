import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';

export const adminGuardGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);

  if (localStorage.getItem('role') == "Administrator") {
    return true;
  }

  return router.createUrlTree(['/home']);
};
