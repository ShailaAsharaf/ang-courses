import { Component, OnInit } from '@angular/core';
import { DataServiceService } from '../data-service.service';
import { courses } from 'src/app/data-model';
import { PopupComponent } from '../popup/popup.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.css']
})
export class ShoppingCartComponent implements OnInit {
  totalAmount: number =0;
  discountedAmount='';
  savedAmount = '';

  constructor(
    public dataService: DataServiceService,
    private dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.totalPrice();
  }
  addToWishList(item: courses){
    const findIndex = this.dataService.cartItems.findIndex((a: any)=>a==item);
    this.dataService.cartItems.splice(findIndex , 1);
    const daialogRef = this.dialog.open(PopupComponent, {
      width: '300px',
      data: {
        mode: 'addedToWishList',
      },
    });
    daialogRef.afterClosed().subscribe((resp: any)=>{
      this.dataService.wishItems.push(item);
      this.totalPrice();
    })
  }
  removeFromCart(item: courses){
    const findIndex = this.dataService.cartItems.findIndex((a: any)=>a==item);
    this.dataService.cartItems.splice(findIndex , 1);
    this.totalPrice();
  }
  checkOut(){
    const daialogRef = this.dialog.open(PopupComponent, {
      width: '300px',
      data: {
        mode: 'checkOut',
        noOfItems: this.dataService.cartItems.length,
        price: this.discountedAmount
      },
    });
    daialogRef.afterClosed().subscribe((resp: any)=>{
      if(resp){
        console.log('ok');
        this.dataService.cartItems.length = 0;
      }
    })
  }
  totalPrice(){
    var sum = 0;
    var costsum = 0;
    this.dataService.cartItems.map(function(item){
      let finalPrice = item.actualPrice.substring(1);
      let finalDis = item.discountPercentage.substring(0, item.discountPercentage.length - 1);
      let actualPrice: number = +finalPrice;
      let discountPercentage: number = +finalDis;
      let discountedPrice = actualPrice * (1 - discountPercentage / 100);
      sum = sum + actualPrice;
      costsum = costsum + discountedPrice;
    });
    this.totalAmount = sum;
    this.discountedAmount = (Math.round(costsum * 100) / 100).toFixed(2);
    let saved = sum-costsum;
    this.savedAmount = (Math.round(saved * 100) / 100).toFixed(2);
  }
}
