import {ProductInterface} from '../_interfaces/product';
import {computed, Injectable, signal} from '@angular/core';

@Injectable({ providedIn: 'root' })
export class BoxService {
  items = signal<ProductInterface[]>([]);

  // Définit si la boîte peut être ajoutée au panier
  canAddToCart = computed(() => {
    const count = this.items().length;
    return count === 4 || count === 6 || count === 9;
  });

  boxSize = computed(() => {
    const count = this.items().length;
    if (count <= 4) return 4;
    if (count <= 6) return 6;
    return 9;
  });

  addProduct(product: ProductInterface) {
    if (this.items().length < 9) {
      this.items.update(prev => [...prev, product]);
    }
  }

  removeProduct(index: number) {
    this.items.update(prev => prev.filter((_, i) => i !== index));
  }

  clearBox() {
    this.items.set([]);
  }
}
