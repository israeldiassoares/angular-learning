import { Component, OnInit } from '@angular/core'
import { FormControl } from '@angular/forms'

@Component({
  selector: 'app-lib-search',
  templateUrl: './lib-search.component.html',
  styleUrls: [ './lib-search.component.scss' ]
})
export class LibSearchComponent implements OnInit {

  queryField = new FormControl()

  constructor() { }


  ngOnInit(): void {
    throw new Error('Method not implemented.')
  }

  onSearch(){
    console.log(this.queryField.value)
  }

}
