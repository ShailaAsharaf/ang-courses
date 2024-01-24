import { Component, OnInit } from '@angular/core';
import { DataServiceService } from '../data-service.service';
import { courses } from 'src/app/data-model';
import { PopupComponent } from '../popup/popup.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-wishlist',
  templateUrl: './wishlist.component.html',
  styleUrls: ['./wishlist.component.css']
})
export class WishlistComponent implements OnInit {

  constructor(
    public dataService: DataServiceService,
    private dialog: MatDialog
  ) { }

  ngOnInit(): void {
  }
  removeFromWish(item: courses){
    const findIndex = this.dataService.wishItems.findIndex((a: any)=>a==item);
    this.dataService.wishItems.splice(findIndex , 1)
  }
  addToCart(item: courses) {
    if (this.dataService.cartItems.indexOf(item) !== -1){
      alert('Already exists in the Cart')
    } else{
      const daialogRef = this.dialog.open(PopupComponent, {
        width: '300px',
        data: {
          mode: 'addedToCart',
        },
      });
      daialogRef.afterClosed().subscribe(resp=>{
        this.dataService.cartItems.push(item)
      })
    }
  }
}
