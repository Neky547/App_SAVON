import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class UtilisateurService {
  // URL de base de notre API pour les utilisateurs
  private readonly API_URL_UTILISATEUR = 'http://localhost:8080/api-savon/v1/utilisateur';
  
  constructor() { }
}
