import { Component, inject } from '@angular/core';
import { CommonModule, DecimalPipe, DatePipe } from '@angular/common'; // Importe DatePipe ici
import { CartService } from '../../_services/cart';
import {environment} from '../../environments/environments';

@Component({
  selector: 'app-account',
  standalone: true,
  // Ajoute DatePipe dans la liste des imports vvv
  imports: [CommonModule, DecimalPipe, DatePipe],
  templateUrl: './account.html'
})
export class Account {
  getOrders() {
    return JSON.parse(localStorage.getItem(environment.STORAGE_KEY_COMMANDES) || '[]');
  }
}
