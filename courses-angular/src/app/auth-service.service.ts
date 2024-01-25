import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthServiceService {

  private isAuthenticate = false;

  constructor() { }

  login(username: string, password: string): boolean {
    // Perform authentication and obtain a token from the server
    // Store the token securely
    if(password === 'dummy@123'){
      this.isAuthenticate = true
    }else{
      this.isAuthenticate = false
    }
    return this.isAuthenticate;
  }

  logout(): void {
    // Clear the stored token and set isAuthenticated to false
    this.isAuthenticate = false;
  }

  isAuthenticated(): boolean {
    return this.isAuthenticate;
  }
}
