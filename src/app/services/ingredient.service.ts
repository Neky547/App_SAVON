import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Ingredient } from '../models/ingredient.model';
@Injectable({
  providedIn: 'root' // Le service est disponible dans toute l'application
})
export class IngredientService {
  // URL de base de notre API :
  private readonly API_URL_INGREDIENT = 'http://localhost:8080/api-savon/v1/ingredient';
constructor(private http: HttpClient) { }
/**
* Récupère la liste de tous les ingrédients depuis le backend.
* @returns Un Observable contenant le tableau des ingrédients.
*/
getIngredients(): Observable < Ingredient[] > {
  return this.http.get<Ingredient[]>(this.API_URL_INGREDIENT);
}
/**
* Récupère un ingrédient spécifique par son identifiant.
* @param id L'identifiant de l'ingrédient
*/
getIngredientById(id: number): Observable < Ingredient > {
  return this.http.get<Ingredient>(`${this.API_URL_INGREDIENT}/${id}`);
}
// TODO : Créer plus tard les méthodes manquantes :
// - deleteIngredients(id: number)
// - deleteAllIngredients()
// - addIngredient(ingredient: Ingredient)
// - updateIngredient(id: number, ingredient: Ingredient)
}
