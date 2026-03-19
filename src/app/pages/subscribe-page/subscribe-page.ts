import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-subscribe-page',
  imports: [CommonModule, FormsModule],
  templateUrl: './subscribe-page.html',
  styleUrl: './subscribe-page.css',
})
export class SubscribePage {
  // Modèle pour le formulaire d'inscription
  public credentials = {
    identifier: '',
    password: '',
    confirmPassword: ''
  };

  // Gestion de l'affichage de l'erreur
  public errorMessage: string | null = null;

  // Message de succès
  public successMessage: string | null = null;

  constructor(
    private authService: AuthService,
    private router: Router
  ) { }

  onSubmit(): void {
    // Réinitialisation des messages
    this.errorMessage = null;
    this.successMessage = null;

    // Vérification que les mots de passe correspondent
    if (this.credentials.password !== this.credentials.confirmPassword) {
      this.errorMessage = "Les mots de passe ne correspondent pas.";
      return;
    }

    // Vérification que le mot de passe a une longueur minimale (optionnel)
    if (this.credentials.password.length < 6) {
      this.errorMessage = "Le mot de passe doit contenir au moins 6 caractères.";
      return;
    }

    // Appel au service d'inscription
    this.authService.subscribe(this.credentials).subscribe({
      next: (response) => {
        this.successMessage = "Compte créé avec succès ! Redirection...";

        // Redirection vers la page de connexion après 2 secondes
        setTimeout(() => {
          this.router.navigate(['/login']);
        }, 2000);  // ← Le délai (2000ms) est ici !
      },
      error: (err) => {
        // Gestion des erreurs selon le code retour
        if (err.status === 409) {
          this.errorMessage = "Cet identifiant est déjà utilisé.";
        } else {
          this.errorMessage = "Erreur lors de la création du compte.";
        }
        console.error('Erreur d\'inscription', err);
      }
    });
  }
}