import { inject, Injectable, signal } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError, finalize, map, retry, tap, throwError, timeout } from 'rxjs';
import { CategorieInterface } from '../_interfaces/categorie';
import { Errors } from './errors';
import {environment} from '../environments/environments';

@Injectable({
  providedIn: 'root',
})
export class CategoriesService {
  private http = inject(HttpClient);
  private errors = inject(Errors);
  private apiUrl = environment.API_URL_CATEGORIES;

  private _categories = signal<CategorieInterface[]>([]);
  readonly categories = this._categories.asReadonly();

  private _error = signal<string | null>(null);
  readonly error = this._error.asReadonly();

  private _loading = signal<boolean>(false);
  readonly loading = this._loading.asReadonly();

  private transformCategories(data: any): CategorieInterface {
    return {
      id: data.id,
      titre: data.titre,
      description: data.description
    };
  }

  getCategories() {
    this._error.set(null);
    this._loading.set(true);

    return this.http.get<any[]>(this.apiUrl).pipe(
      timeout(5000),
      retry(2),
      map(data => data.map(item => this.transformCategories(item))),
      tap(transformedData => {
        this._categories.set(transformedData);
      }),
      catchError((err: HttpErrorResponse) => {
        const errorMessage = this.errors.handleHttpError(err);
        this._error.set(errorMessage);
        return throwError(() => err);
      }),
      finalize(() => {
        this._loading.set(false);
        console.log('Fetching categories sequence completed.');
      })
    );
  }
}
