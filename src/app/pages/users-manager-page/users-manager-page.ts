import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-users-manager-page',
  imports: [CommonModule],
  templateUrl: './users-manager-page.html',
  styleUrl: './users-manager-page.css',
})
export class UsersManagerPage {
  public users: any[] = [
    { id: 1, nom: 'Admin', email: 'admin@email.com', role: 'Administrateur' },
    { id: 2, nom: 'Nekena', email: 'utilisateur@email.com', role: 'Utilisateur' },
    { id: 3, nom: 'John Doe', email: 'johndoe@email.com', role: 'Utilisateur' },
  ];
  createUser() {
    // Logique pour créer un nouvel utilisateur
    console.log('Créer un nouvel utilisateur');
  }
  editUser(user: any) {
    // Logique pour éditer les informations de l'utilisateur
    console.log('Éditer l\'utilisateur', user);
  }
  deleteUser(user: any) {
    // Logique pour supprimer l'utilisateur
    console.log('Supprimer l\'utilisateur', user);
  }
}
