import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.css'],
})
export class LayoutComponent implements OnInit {
  constructor(private router: Router) {}

  ngOnInit(): void {}

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
  }
}
