import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataServiceService } from '../data-service.service';
import { AuthServiceService } from 'src/app/auth-service.service';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.css'],
})
export class LayoutComponent implements OnInit {
  isLoggedIn = false;
  constructor(
    private router: Router,
    public dataService: DataServiceService,
    private authService: AuthServiceService
    ) {}

  ngOnInit(): void {
    this.authService.data$.subscribe((data) => {
      if(data == 'isLoggedIn'){
        this.isLoggedIn = true;
      }else{
        this.isLoggedIn = false;
      }
    });
  }

  // function invokes when user clicks on navigation items
  goToPage(page: string) {
    if (page === '') {
      this.router.navigate(['']);
    }
    if (page === 'courses') {
      this.router.navigate(['']);
    }
    if (page === 'wishList') {
      this.router.navigate(['dash/wishlist']);
    }
    if (page === 'cartDetails') {
      this.router.navigate(['dash/shopping-cart']);
    }
    if (page === 'profilePage') {
      this.router.navigate(['dash/profile']);
    }
    if (page === 'login') {
      this.router.navigate(['dash/login']);
    }
  }
  logout(){
    this.authService.logout();
  }
}
