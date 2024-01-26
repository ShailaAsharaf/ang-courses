import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { courses } from 'src/app/data-model';
import { DataServiceService } from '../data-service.service';
import { MatDialog } from '@angular/material/dialog';
import { PopupComponent } from '../popup/popup.component';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-course-details',
  templateUrl: './course-details.component.html',
  styleUrls: ['./course-details.component.css']
})
export class CourseDetailsComponent implements OnInit {
  courseId: string|null = '';
  course!: courses;
  isVideoPlaying = false;
  displayHours = false;
  loaded = false;
  hours = 0;
  minutes = 0;

  constructor(
    private route: ActivatedRoute,
    public dataServices: DataServiceService,
    private dialog: MatDialog,
    private sanitizer: DomSanitizer
  ) { }

  ngOnInit(): void {
    this.courseId = this.route.snapshot.paramMap.get('courseId');
    courses.ConstValue.findIndex((a: any)=>{
      let cName = a.courseName.replace(/\s/g, "").toLowerCase();
      if(cName == this.courseId){
        this.course = a;

        const currentTime = new Date();
        const timeDiff = this.course.saleEndTime.getTime() - currentTime.getTime();

        this.hours = Math.floor(timeDiff / (1000 * 60 * 60));
        this.minutes = Math.floor((timeDiff % (1000 * 60 * 60)) / (1000 * 60));
        if((this.course.saleEndTime.getTime() > currentTime.getTime()) && (this.hours>24)){
          this.displayHours = false;
        }else{
          this.displayHours = true;
        }
        console.log(this.displayHours);
        this.loaded = true;
      }
    });

  }
  // Sanitize the video URL
  get sanitizedVideoUrl(): SafeResourceUrl {
    return this.sanitizer.bypassSecurityTrustResourceUrl(this.course.videoUrl);
  }
  playVideo() {
    this.isVideoPlaying = !this.isVideoPlaying;
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
  checkElement(element: courses){
    if (this.dataServices.wishItems.indexOf(element) !== -1){ return true;}
    else{ return false; }
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
}
