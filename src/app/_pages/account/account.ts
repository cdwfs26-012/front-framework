import { Component, inject } from '@angular/core';
import { CommonModule, DecimalPipe, DatePipe } from '@angular/common'; // Importe DatePipe ici
import {environment} from '../../environments/environments';

@Component({
  selector: 'app-account',
  standalone: true,
  imports: [CommonModule, DecimalPipe, DatePipe],
  templateUrl: './account.html'
})
export class Account {
  getOrders() {
    return JSON.parse(localStorage.getItem(environment.STORAGE_KEY_COMMANDES) || '[]');
  }
}
