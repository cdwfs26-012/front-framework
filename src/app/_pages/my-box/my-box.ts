import { Component, inject, signal, computed, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Boxviewer } from '../../_components/boxviewer/boxviewer';
import {ProductsService} from '../../_services/products';
import {BoxService} from '../../_services/box';
import {CategoriesService} from '../../_services/categories';
import {CartService} from '../../_services/cart';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-my-box',
  standalone: true,
  imports: [CommonModule, Boxviewer],
  templateUrl: './my-box.html',
  styleUrl: './my-box.css'
})export class MyBox implements OnInit {
  // Changement de private à public ici
  public boxService = inject(BoxService);
  public productsService = inject(ProductsService);
  public categoriesService = inject(CategoriesService);
  private cartService = inject(CartService);


  selectedCatId = signal<number | undefined>(undefined);

  filteredProducts = computed(() => {
    const products = this.productsService.products();
    const catId = this.selectedCatId();
    if (!catId) return products;
    return products.filter(p => p.categorieId === catId);
  });

  ngOnInit() {
    this.productsService.getProducts().subscribe();
    this.categoriesService.getCategories().subscribe();
  }

  confirmBox() {
    if (this.boxService.canAddToCart()) {
      const itemsToAdd = this.boxService.items();

      // On ajoute chaque sushi au panier
      itemsToAdd.forEach(product => {
        this.cartService.addToCart(product);
      });

      // Notification de succès
      Swal.fire({
        toast: true,
        position: 'top-end',
        icon: 'success',
        title: 'Boîte ajoutée au panier !',
        showConfirmButton: false,
        timer: 2000,
        background: '#171717',
        color: '#fff'
      });

      // On vide la boîte
      this.boxService.clearBox();
    }
  }
}
