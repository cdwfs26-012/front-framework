import { inject, Injectable, signal } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Errors } from './errors';
import { catchError, finalize, map, retry, tap, throwError, timeout } from 'rxjs';
import { CollectionInterface } from '../_interfaces/collection';
import {environment} from '../environments/environments';

@Injectable({
  providedIn: 'root',
})
export class CollectionsService {

  private http = inject(HttpClient);
  private errors = inject(Errors);
  private apiUrl = environment.API_URL_COLLECTIONS;

  private _collections = signal<CollectionInterface[]>([]);
  readonly collections = this._collections.asReadonly();

  private _error = signal<string | null>(null);
  readonly error = this._error.asReadonly();

  private _loading = signal<boolean>(false);
  readonly loading = this._loading.asReadonly();

  private transformCollections(data: any): CollectionInterface {
    return {
      id: data.id,
      titre: data.titre,
      description: data.description
    };
  }

  getCollections() {
    this._error.set(null);
    this._loading.set(true);

    return this.http.get<any[]>(this.apiUrl).pipe(
      timeout(5000),
      retry(2),
      map(data => data.map(item => this.transformCollections(item))),
      tap(transformedData => {
        this._collections.set(transformedData);
      }),
      catchError((err: HttpErrorResponse) => {
        const errorMessage = this.errors.handleHttpError(err);
        this._error.set(errorMessage);
        return throwError(() => err);
      }),
      finalize(() => {
        this._loading.set(false);
        console.log('Fetching collections sequence completed.');
      })
    );
  }

}
