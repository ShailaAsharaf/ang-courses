import { Component, OnInit } from '@angular/core';
import { courses } from 'src/app/data-model';
import { DataServiceService } from '../data-service.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  angularCourses: courses[] = [];
  displayedColumns: string[] = ['courseName', 'actions'];

  constructor(
    private dataServices: DataServiceService
  ) { }

  ngOnInit(): void {
    this.angularCourses = this.dataServices.getData();
  }

}
