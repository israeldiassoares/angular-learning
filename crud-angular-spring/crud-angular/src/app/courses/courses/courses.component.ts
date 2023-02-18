import { Component, OnInit } from '@angular/core'

import { Course } from './../model/course'

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: [ './courses.component.css' ]
})
export class CoursesComponent implements OnInit {

  courses: Course[]
  displayedColumns = [ 'name', 'category' ]
  dataSource: any = []

  constructor() {
    this.courses = [
      { _id: '1', name: 'Angular', category: "FrontEnd" }
    ]
  }

  ngOnInit() {
    this.dataSource = this.courses
    this.displayedColumns = [ 'name', 'category' ]
  }

}
