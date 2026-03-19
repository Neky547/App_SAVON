import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class UtilisateurService {
  // URL de base de notre API pour les utilisateurs
  private readonly API_URL_UTILISATEUR = 'http://localhost:8080/api-savon/v1/utilisateur';
  
  constructor(private http: HttpClient) { }
  getUtilisateurs() {
    return this.http.get(this.API_URL_UTILISATEUR);
  }
  
  getUtilisateurById(id: number) {
    return this.http.get(`${this.API_URL_UTILISATEUR}/${id}`);
  }

  /**
  * Enregistre un nouvel utilisateur.
  * @param utilisateur - L'objet utilisateur à enregistrer.
  * @returns Un Observable contenant l'utilisateur enregistré.
  */

  createUtilisateur(utilisateur: any) {
    return this.http.post(this.API_URL_UTILISATEUR, utilisateur);
  }

  /**
  * Supprime un utilisateur à partir de son id
  */
  deleteUtilisateur(id: number) {
    return this.http.delete(`${this.API_URL_UTILISATEUR}/${id}`)
   }
}
