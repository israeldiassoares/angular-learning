import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

import { Course } from '../../model/course';

@Component({
  selector: 'app-courses-list',
  templateUrl: './courses-list.component.html',
  styleUrls: [ './courses-list.component.scss' ]
})
export class CoursesListComponent implements OnInit {

  readonly displayedColumns = [ 'name', 'category', 'actions' ]

  @Input() courses: Course[] = []
  @Output() add = new EventEmitter(false);
  @Output() edit = new EventEmitter(false);
  @Output() delete = new EventEmitter(false);

  constructor() { }

  ngOnInit(): void { }

  onAdd() {
    // this.router.navigate([ 'new' ], { relativeTo: this.route }) refactory to become a apresentation component
    this.add.emit(true)
  }
  onEdit(course: Course) {
    // console.log('list', course)
    this.edit.emit(course)
  }

  onDelete(course: Course){
    this.delete.emit(course)
  }
}
