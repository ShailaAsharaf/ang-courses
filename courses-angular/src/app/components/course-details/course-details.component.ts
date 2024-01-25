import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { courses } from 'src/app/data-model';

@Component({
  selector: 'app-course-details',
  templateUrl: './course-details.component.html',
  styleUrls: ['./course-details.component.css']
})
export class CourseDetailsComponent implements OnInit {
  courseId: string|null = '';
  course!: courses;

  constructor(
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.courseId = this.route.snapshot.paramMap.get('courseId');
    const findIndex = courses.ConstValue.findIndex((a: any)=>{
      let cName = a.courseName.replace(/\s/g, "").toLowerCase();
      if(cName == this.courseId){
        this.course = a;
        console.log(a)
      }
    });

  }

}
