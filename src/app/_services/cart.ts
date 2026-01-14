import { Injectable, signal, computed, effect } from '@angular/core';
import { ProductInterface } from '../_interfaces/product';
import { OrderInterface } from '../_interfaces/order';
import {environment} from '../environments/environments';

export type OrderMode = 'on-site' | 'takeaway' | null;

export interface CartItem {
  product: ProductInterface;
  quantity: number;
}

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private readonly STORAGE_KEY = environment.STORAGE_KEY_CART;
  private readonly ORDERS_KEY = environment.STORAGE_KEY_COMMANDES;

  // Signal principal du panier
  items = signal<CartItem[]>([]);
  orderMode = signal<OrderMode>(null);

  constructor() {
    const savedCart = localStorage.getItem(this.STORAGE_KEY);
    if (savedCart) {
      this.items.set(JSON.parse(savedCart));
    }

    // Save a chaque modif
    effect(() => {
      localStorage.setItem(this.STORAGE_KEY, JSON.stringify(this.items()));
    });
  }
  checkout(finalTotal: number) {
    const currentOrders = JSON.parse(localStorage.getItem(this.ORDERS_KEY) || '[]');

    const newOrder: OrderInterface = {
      id: Math.random().toString(36).substr(2, 9).toUpperCase(),
      date: new Date(),
      items: this.items(),
      mode: this.orderMode(),
      total: finalTotal
    };

    currentOrders.unshift(newOrder); // On ajoute au début pour avoir la plus récente en haut
    localStorage.setItem(this.ORDERS_KEY, JSON.stringify(currentOrders));

    this.clearCart(); // On vide le panier après le paiement
  }

  addToCart(product: ProductInterface) {
    this.items.update(currentItems => {
      const existingItem = currentItems.find(item => item.product.reference === product.reference);

      if (existingItem) {
        // Si le produit existe, on augmente la quantité
        return currentItems.map(item =>
          item.product.reference === product.reference
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        // Sinon on ajoute le nouveau produit
        return [...currentItems, { product, quantity: 1 }];
      }
    });
  }

  // Calcul du nombre total d'articles pour l'icône du panier
  totalQuantity = computed(() =>
    this.items().reduce((acc, item) => acc + item.quantity, 0)
  );

  setOrderMode(mode: OrderMode) {
    this.orderMode.set(mode);
  }

  clearCart() {
    this.items.set([]);
  }
}
