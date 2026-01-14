import { Component, inject, computed } from '@angular/core';
import { CommonModule, DecimalPipe } from '@angular/common';
import { CartService } from '../../_services/cart';
import { LoginService } from '../../_services/login';
import {Router, RouterLink} from '@angular/router';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CommonModule, DecimalPipe, RouterLink],
  templateUrl: './cart.html'
})
export class CartComponent {
  protected cartService = inject(CartService);
  protected loginService = inject(LoginService);
  private router = inject(Router);

  // Calcul (sans remise)
  subtotal = computed(() => {
    return this.cartService.items().reduce((acc, item) =>
      acc + (item.product.prixUnitaire * item.quantity), 0
    );
  });

  // Calcul de la remise (2% si connecté)
  discount = computed(() => {
    return this.loginService.isLoggedIn() ? this.subtotal() * 0.02 : 0;
  });

  // Total final
  total = computed(() => this.subtotal() - this.discount());

  updateQuantity(reference: string, delta: number) {
    this.cartService.items.update(items => {
      return items.map(item => {
        if (item.product.reference === reference) {
          const newQty = Math.max(0, item.quantity + delta);
          return { ...item, quantity: newQty };
        }
        return item;
      }).filter(item => item.quantity > 0);
    });
  }

  goToDetail(productUrl: string) {
    const cleanUrl = productUrl.startsWith('/') ? productUrl.substring(1) : productUrl;
    this.router.navigateByUrl(`product/${cleanUrl}`);
  }
}
