import { Component, inject } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { CartService } from '../../_services/cart';
import {LoginService} from '../../_services/login'; // Chemin à adapter selon ton projet

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './footer.html'
})
export class Footer {
  public cartService = inject(CartService);
  public loginService = inject(LoginService);
}
