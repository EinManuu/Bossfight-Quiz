import { CanActivateFn } from '@angular/router';



export const authGuardGuard: CanActivateFn = (route, state) => {



  if (localStorage.getItem('loggedIn')=="true"){
    return true;
  }
  //this.router.navigate(['/login']);
  return false
};
