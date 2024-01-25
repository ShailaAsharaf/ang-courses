import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthServiceService {

  private isAuthenticate = false;
  private dataSubject = new BehaviorSubject<string>('Initial Value');
  data$ = this.dataSubject.asObservable();


  constructor(
    private router: Router
  ) { }

  updateData(newValue: string): void {
    this.dataSubject.next(newValue);
  }

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
    this.updateData('loggedOut');
    this.router.navigate([''])
  }

  isAuthenticated(): boolean {
    return this.isAuthenticate;
  }
}
