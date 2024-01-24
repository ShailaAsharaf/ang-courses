import { Component, OnInit, ViewChild } from '@angular/core';
import { courses } from 'src/app/data-model';
import { DataServiceService } from '../data-service.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { PopupComponent } from '../popup/popup.component';
import { MatSort } from '@angular/material/sort';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {
  @ViewChild(MatPaginator)
  paginator!: MatPaginator;
  @ViewChild(MatSort)
  sort!: MatSort;

  angularCourses = new MatTableDataSource<courses>(courses.ConstValue);
  displayedColumns: string[] = [
    'star',
    'courseName',
    'actualPrice',
    'discountPercentage',
    'actions',
  ];

  constructor(
    private dataServices: DataServiceService,
    private dialog: MatDialog
    ) {}

  ngOnInit(): void {}
  ngAfterViewInit() {
    this.angularCourses.paginator = this.paginator;
    this.angularCourses.sort = this.sort;
  }
  highToLow(){
    const data: any = this.angularCourses.data;
    data.sort((a: any, b: any) =>{
      let price1 = this.getPrice(a.actualPrice, a.discountPercentage);
      let price2 = this.getPrice(b.actualPrice, b.discountPercentage);
      let price = +price2 - +price1
      return price;
    })
    this.angularCourses.data = data
  }
  lowToHigh(){
    const data: any = this.angularCourses.data;
    data.sort((a: any, b: any) =>{
      let price1 = this.getPrice(a.actualPrice, a.discountPercentage);
      let price2 = this.getPrice(b.actualPrice, b.discountPercentage);
      let price = +price1 - +price2
      return price;
    })
    this.angularCourses.data = data
  }
  addToWishList(item: courses) {
    const daialogRef = this.dialog.open(PopupComponent, {
      width: '300px',
      data: {
        mode: 'addedToWishList',
      },
    });
    daialogRef.afterClosed().subscribe(resp=>{
      this.dataServices.wishItems.push(item);
    })
  }
  addToCart(item: courses) {
    if (this.dataServices.cartItems.indexOf(item) !== -1){
      alert('Already exists in the Cart')
    } else{
      const daialogRef = this.dialog.open(PopupComponent, {
        width: '300px',
        data: {
          mode: 'addedToCart',
        },
      });
      daialogRef.afterClosed().subscribe(resp=>{
        this.dataServices.cartItems.push(item)
      })
    }
  }

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
  checkElement(element: courses){
    if (this.dataServices.wishItems.indexOf(element) !== -1){ return true;}
    else{ return false; }
  }
}
