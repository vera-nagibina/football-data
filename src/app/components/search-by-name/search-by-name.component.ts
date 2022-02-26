import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-search-by-name',
  templateUrl: './search-by-name.component.html',
  styleUrls: ['./search-by-name.component.scss']
})
export class SearchByNameComponent implements OnInit {
  @Input() name: string = '';
  @Output() onInput = new EventEmitter<string>();

  constructor() { }

  ngOnInit(): void {
  }

  search() {       
    this.onInput.emit(this.name);   
  }  

}
