import { Component, inject } from '@angular/core';
import { LoginService } from '../../_services/login';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './header.html'
})
export class Header {
  public loginService = inject(LoginService);

  logout() {
    this.loginService.logOut();
  }
}
