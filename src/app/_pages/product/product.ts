import { Component, inject, signal, OnInit, computed } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { Location, CommonModule, DecimalPipe } from '@angular/common'; // Import Location
import { ProductsService } from '../../_services/products';
import { CategoriesService } from '../../_services/categories';
import { CollectionsService } from '../../_services/collections';
import { ProductInterface } from '../../_interfaces/product';
import Swal from 'sweetalert2';
import {CartService} from '../../_services/cart';
import {ProductsComponent} from '../../_components/products/products';

@Component({
  selector: 'app-product',
  standalone: true,
  imports: [CommonModule, DecimalPipe, ProductsComponent],
  templateUrl: './product.html'
})
export class Product implements OnInit {
  private route = inject(ActivatedRoute);
  private location = inject(Location); // Pour le bouton retour
  private productsService = inject(ProductsService);
  private categoriesService = inject(CategoriesService);
  private collectionsService = inject(CollectionsService);
  private cartService = inject(CartService);

  product = signal<ProductInterface | null>(null);

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      const slug = params.get('slug');
      if (slug) {
        const parts = slug.split('-');
        const id = parts[parts.length - 1];

        const products = this.productsService.products();


        // Si les produits ne sont pas encore chargés
        if (products.length === 0) {
          this.productsService.getProducts().subscribe(allProducts => {
            this.setCurrentProduct(allProducts, id);
          });
        } else {
          this.setCurrentProduct(products, id);
        }

        // Charger les métadonnées une seule fois au début du cycle de vie
        if (this.categoriesService.categories().length === 0) {
          this.categoriesService.getCategories().subscribe();
        }
        if (this.collectionsService.collections().length === 0) {
          this.collectionsService.getCollections().subscribe();
        }
      }
    });
  }

  private setCurrentProduct(products: ProductInterface[], id: string) {
    const found = products.find(p => p.reference === id);
    if (found) {
      this.product.set(found);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }

  goBack() {
    this.location.back();
  }

  getCategoryName(id: number): string {
    return this.categoriesService.categories().find(c => c.id === id)?.titre || 'Catégorie';
  }

  getCollectionName(id: number): string {
    return this.collectionsService.collections().find(c => c.id === id)?.titre || 'Collection';
  }

  addToCart() {
    const p = this.product();
    if (p) {
      this.cartService.addToCart(p);
      // Config notification Toast
      const Toast = Swal.mixin({
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        timer: 2000,
        timerProgressBar: true,
        background: '#171717',
        color: '#ffffff',
        iconColor: '#f97316',
        didOpen: (toast) => {
          toast.onmouseenter = Swal.stopTimer;
          toast.onmouseleave = Swal.resumeTimer;
        }
      });

      Toast.fire({
        icon: 'success',
        title: `<span style="text-transform: uppercase; font-weight: 900; font-size: 0.75rem;">${p.name} ajouté !</span>`
      });
    }
  }
}
