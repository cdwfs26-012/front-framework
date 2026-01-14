import { Component, inject, OnInit, signal, computed } from '@angular/core';
import { CategoriesService } from '../../_services/categories';
import { ProductsComponent } from '../../_components/products/products';

@Component({
  selector: 'app-catalogue',
  standalone: true,
  imports: [ProductsComponent],
  templateUrl: './catalogue.html',
})
export class Catalogue implements OnInit {
  categoriesService = inject(CategoriesService);

  selectedCategoryId = signal<number | undefined>(undefined);

  displayTitle = computed(() => {
    const id = this.selectedCategoryId();
    if (id === undefined) return 'produits';

    const category = this.categoriesService.categories().find(c => c.id === id);
    return category ? category.titre : 'produits';
  });

  ngOnInit() {
    this.categoriesService.getCategories().subscribe();
  }

  selectCategory(id: number | undefined) {
    this.selectedCategoryId.set(id);
  }
}
