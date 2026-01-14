import {CanActivateFn, Router} from '@angular/router';
import {inject} from '@angular/core';
import {LoginService} from '../_services/login';

export const authGuard: CanActivateFn = (route, state) => {

  // renvoyé vers la page de login si pas connecté
  const loginService = inject(LoginService);
  const router = inject(Router);
  if (loginService.isLoggedIn()) {
    return true;
  }else {
    router.navigate(['/login']);
    return false;
  }


};
