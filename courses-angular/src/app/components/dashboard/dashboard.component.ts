import { Component, OnInit, ViewChild } from '@angular/core';
import { courses } from 'src/app/data-model';
import { DataServiceService } from '../data-service.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {
  @ViewChild(MatPaginator)
  paginator!: MatPaginator;

  angularCourses = new MatTableDataSource<courses>(courses.ConstValue);
  displayedColumns: string[] = [
    'courseName',
    'actualPrice',
    'discountPercentage',
    'actions',
  ];

  constructor(private dataServices: DataServiceService) {}

  ngOnInit(): void {}
  ngAfterViewInit() {
    this.angularCourses.paginator = this.paginator;
  }
  addToWishList() {}
  addToCart() {}
  getPrice(price: string, discount: string) {
    let finalPrice = price.substring(1);
    let finalDis = discount.substring(0, discount.length - 1);
    let actualPrice: number = +finalPrice;
    let discountPercentage: number = +finalDis;
    let discountedPrice = actualPrice * (1 - discountPercentage / 100);
    let lastPrice = (Math.round(discountedPrice * 100) / 100).toFixed(2);
    return lastPrice;
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.angularCourses.filter = filterValue.trim().toLowerCase();
  }
}
