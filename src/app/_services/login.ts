import { Injectable, signal, inject } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http'; // Ajout de HttpHeaders
import { UserInterface } from '../_interfaces/user';
import { Router } from '@angular/router';
import { catchError } from 'rxjs/operators';
import { throwError, firstValueFrom } from 'rxjs';
import {environment} from '../environments/environments';
import {Errors} from './errors';


@Injectable({
  providedIn: 'root',
})
export class LoginService {
  private http = inject(HttpClient);
  private router = inject(Router);

  private readonly AUTH_TOKEN_KEY = environment.AUTH_TOKEN_KEY;
  private readonly apiUrl = environment.API_LOGIN_URL;
  private readonly API_BEARER_TOKEN = environment.API_BEARER_TOKEN;

  private errorsService = inject(Errors);



  isLoggedIn = signal<boolean>(false);
  currentUser = signal<Partial<UserInterface> | null>(null);

  constructor() {
    this.initializeAuthState();
  }

  private initializeAuthState(): void {
    const token = localStorage.getItem(this.AUTH_TOKEN_KEY);
    if (token) {
      this.isLoggedIn.set(true);
      this.currentUser.set({
        email: 'eve.holt@reqres.in',
        username: 'Eve Holt'
      });
    }
  }

  async login(email: string, password: string): Promise<boolean> {
    try {
      const credentials = { email, password };

      // Configuration des headers avec le Token Bearer
      const headers = new HttpHeaders({
        'Authorization': `Bearer ${this.API_BEARER_TOKEN}`,
        'Content-Type': 'application/json'
      });

      const response = await firstValueFrom(
        this.http.post<{ token: string }>(this.apiUrl, credentials, { headers }).pipe(
          catchError((err: HttpErrorResponse) => {
            this.handleError(err);
            return throwError(() => err);
          })
        )
      );

      if (response && response.token) {
        localStorage.setItem(this.AUTH_TOKEN_KEY, response.token);
        this.isLoggedIn.set(true);
        this.currentUser.set({ email, username: 'Eve Holt' });
        return true;
      }
      return false;
    } catch (error) {
      return false;
    }
  }
  //Affichage des erreurs
  private handleError(error: HttpErrorResponse) {
    const errorMessage = this.errorsService.handleHttpError(error);
    return throwError(() => new Error(errorMessage));
  }

  logOut(): void {
    localStorage.removeItem(this.AUTH_TOKEN_KEY);
    this.isLoggedIn.set(false);
    this.currentUser.set(null);
    this.router.navigate(['/login']);
  }
}
