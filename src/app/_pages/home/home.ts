import {Component, inject} from '@angular/core';
import {CartService, OrderMode} from '../../_services/cart';
import {Router} from '@angular/router';

@Component({
  selector: 'app-home',
  imports: [],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home {
  private cartService = inject(CartService);
  private router = inject(Router);

  selectMode(mode: OrderMode) {
    this.cartService.setOrderMode(mode);
    this.router.navigate(['/catalogue']);
  }
}
