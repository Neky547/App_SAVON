import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { UtilisateurService } from '../../services/utilisateur.service';


@Component({
  selector: 'app-users-manager-page',
  imports: [CommonModule],
  templateUrl: './users-manager-page.html',
  styleUrl: './users-manager-page.css',
})
export class UsersManagerPage implements OnInit {
  public users: any[] = [];

  constructor(private utilisateurService: UtilisateurService) {}

  ngOnInit(): void {
    this.chargerUtilisateurs();
  }

  chargerUtilisateurs(): void {
    this.utilisateurService.getUtilisateurs().subscribe({
      next: (data: any) => {
        this.users = data;
        console.log('Utilisateurs chargés avec succès', data);
      },
      error: (err) => {
        console.error('Erreur lors du chargement des utilisateurs', err);
      }
    });
  }

  createUser(): void {
    // Logique pour créer un nouvel utilisateur
    console.log('Créer un nouvel utilisateur');
  }

  supprimerUtilisateur(userId: number): void {
    if (confirm('Êtes-vous sûr de vouloir supprimer cet utilisateur ?')) {
      this.utilisateurService.deleteUtilisateur(userId).subscribe({
        next: () => {
          console.log(`Utilisateur ${userId} supprimé avec succès`);
          // Recharger la liste après suppression
          this.chargerUtilisateurs();
        },
        error: (err) => {
          console.error(`Erreur lors de la suppression de l'utilisateur ${userId}`, err);
        }
      });
    }
  }
}