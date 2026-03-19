import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, tap } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private readonly API_URL = "http://localhost:8080/auth";
  private readonly TOKEN_KEY = "savapp_jwt_token";
  private router = inject(Router);
  // Signal pour suivre l'état de la connexion :
  public isAuthenticated = signal<boolean>(this.hasToken());
  constructor(private http: HttpClient) { }

  // Méthode d'inscription
  subscribe(credentials: any): Observable<any> {
    return this.http.post(`${this.API_URL}/register`, credentials);
  }

  // Méthode de connexion
  login(credential: any): Observable<any> {
    return this.http.post(`${this.API_URL}/login`, credential).pipe(
      tap((response: any) => {
        if (response.token) {
          localStorage.setItem(this.TOKEN_KEY, response.token);
          //this.isAuthenticated.set(true);
        }
      })
    )
  }
  logout(): void {
    localStorage.removeItem(this.TOKEN_KEY);
    //this.isAuthenticated.set(false);
    this.router.navigate(['/login']);
  }

  private getDecodedToken(): any {
    const token = this.getToken();
    if (!token) return null;
    try {
      const playload = token.split('.')[1];
      return JSON.parse(atob(playload));
    } catch (e) {
      return null;
    }
  }


  getUserIdentifier(): string {
    const decoded = this.getDecodedToken();
    return decoded ? decoded.sub : 'Invité';
  }

  hasRole(role: string): boolean {
    const decoded = this.getDecodedToken();
    if (!decoded || decoded.role) return false;
    return decoded.roles.includes(role);
  }

  getUserFullInfo() {
    const decoded = this.getDecodedToken();
    if (!decoded) return null;
    return {
      username: decoded.sub,
      roles: decoded.role || [],
      expiration: new Date(decoded.exp * 1000)
    };
  }

  getToken(): string | null {
    return localStorage.getItem(this.TOKEN_KEY);
  }
  private hasToken(): boolean {
    return !!localStorage.getItem(this.TOKEN_KEY);
  }
}