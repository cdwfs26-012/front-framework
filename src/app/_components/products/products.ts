import { Component, inject, input, computed, OnInit } from '@angular/core';
import { CommonModule, DecimalPipe } from '@angular/common';
import { Router } from '@angular/router';
import { ProductsService } from '../../_services/products';
import {CollectionsService} from '../../_services/collections';
import {CartService} from '../../_services/cart';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [CommonModule, DecimalPipe],
  templateUrl: './products.html'
})
export class ProductsComponent {
  private productsService = inject(ProductsService);
  private collectionsService = inject(CollectionsService);
  private cartService = inject(CartService);
  private router = inject(Router);

  categoryId = input<number | undefined>();
  allProducts = this.productsService.products;
  loading = this.productsService.loading;

  filteredProducts = computed(() => {
    const id = this.categoryId();
    const products = this.allProducts();
    if (!id) return products;
    return products.filter(p => p.categorieId == id);
  });

  constructor() {
    this.productsService.getProducts().subscribe();
    this.collectionsService.getCollections().subscribe();
  }

  getCollectionTitle(collectionId: number): string {
    const collectionsList = this.collectionsService.collections();

    if (!collectionsList || collectionsList.length === 0) {
      return 'Chargement...';
    }

    const collection = collectionsList.find(c => c.id === collectionId);
    return collection ? collection.titre : 'Aucune collection';
  }

  // Redirection au clic sur la fiche
  goToDetail(productUrl: string) {
    const cleanUrl = productUrl.startsWith('/') ? productUrl.substring(1) : productUrl;
    this.router.navigateByUrl(`product/${cleanUrl}`);
  }

  // Au clic
  addToCart(event: Event, product: any) {
    event.stopPropagation();
    this.cartService.addToCart(product);

    // Alert
    const Toast = Swal.mixin({
      toast: true,
      position: 'top-end',
      showConfirmButton: false,
      timer: 2000,
      timerProgressBar: true,
      background: '#171717',
      color: '#ffffff',
      didOpen: (toast) => {
        toast.addEventListener('mouseenter', Swal.stopTimer);
        toast.addEventListener('mouseleave', Swal.resumeTimer);
      }
    });

    Toast.fire({
      icon: 'success',
      iconColor: '#f97316',
      title: `<span class="uppercase font-bold text-xs">${product.name} ajouté !</span>`
    });
  }
}
