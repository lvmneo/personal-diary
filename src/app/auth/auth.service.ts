import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private users: { [username: string]: string } = {}; // Хранение пользователей {username: password}
  private currentUser: string | null = null;

  constructor() {
    this.loadUsers();
  }

  private loadUsers() {
    const storedUsers = JSON.parse(localStorage.getItem('users') || '{}');
    this.users = storedUsers;
  }

  private saveUsers() {
    localStorage.setItem('users', JSON.stringify(this.users));
  }

  register(username: string, password: string): boolean {
    if (this.users[username]) {
      return false; // Пользователь уже существует
    }
    this.users[username] = password;
    this.saveUsers();
    return true;
  }

  login(username: string, password: string): boolean {
    if (this.users[username] && this.users[username] === password) {
      this.currentUser = username;
      localStorage.setItem('currentUser', username);
      return true;
    }
    return false;
  }

  logout() {
    this.currentUser = null;
    localStorage.removeItem('currentUser');
  }

  isLoggedIn(): boolean {
    return this.currentUser !== null;
  }

  getCurrentUser(): string | null {
    return this.currentUser;
  }
}