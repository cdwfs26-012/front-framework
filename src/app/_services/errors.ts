import { Injectable } from '@angular/core';
import {HttpErrorResponse} from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class Errors {
  handleHttpError(error: HttpErrorResponse): string {
    switch (error.status) {
      case 0:
        return 'erreur réseauy -verifier votre connextion'
      case 400:
        return 'Bad Request - La requête est invalide.';
      case 401:
        return 'Unauthorized - Authentification requise.';
      case 403:
        return 'Forbidden - Accès refusé.';
      case 404:
        return 'Not Found - Ressource non trouvée.';
      case 500:
        return 'Internal Server Error - Erreur interne du serveur. test';
      case  502:
        return 'Bad Gateway - Mauvaise passerelle.';
      case 503:
        return 'Service Unavailable - Service indisponible.';
      default:
        return `Unexpected Error - Statut: ${error.status}`;
    }
  }
}
