import { inject, Injectable, signal } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Errors } from './errors';
import { catchError, finalize, map, retry, tap, throwError, timeout } from 'rxjs';
import { ProductInterface } from '../_interfaces/product';
import {ProductTransportInterface} from '../_interfaces/product-transport.interface';
import {environment} from '../environments/environments';


@Injectable({
  providedIn: 'root',
})
export class ProductsService {

  private http = inject(HttpClient);
  private errors = inject(Errors);
  private apiUrl = environment.API_URL_PRODUCTS;

  private _products = signal<ProductInterface[]>([]);
  readonly products = this._products.asReadonly();

  private _error = signal<string | null>(null);
  readonly error = this._error.asReadonly();

  private _loading = signal<boolean>(false);
  readonly loading = this._loading.asReadonly();

  // Ce que je recois moduler pour Entity
  private transformProduct(data: ProductTransportInterface): ProductInterface {
    return {
      reference: data.reference_produit,
      image: `data/produits/${data.reference_image}`,
      name: data.nom,
      pieces: data.nombre_pieces,
      description: data.description,
      ingredients: data.ingredients,
      nutritionPdf: data.informations_nutritionnelles.lien_pdf,
      allergenes: data.allergenes,
      categorieId: data.categorie,
      collectionId: data.collection,
      url: data.url,
      prixLot: data.prix_lot,
      prixUnitaire: data.prix_unitaire
    };

  }

  getProducts() {
    this._error.set(null);
    this._loading.set(true);

    return this.http.get<ProductTransportInterface[]>(this.apiUrl).pipe(
      timeout(5000),
      retry(2),
      map(data => data.map(item => this.transformProduct(item))),
      tap(products => this._products.set(products)),
      catchError((err: HttpErrorResponse) => {
        const errorMessage = this.errors.handleHttpError(err);
        this._error.set(errorMessage);
        return throwError(() => err);
      }),
      finalize(() => {
        this._loading.set(false);
      })
    );
  }
}
