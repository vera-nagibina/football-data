import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-search-by-date',
  templateUrl: './search-by-date.component.html',
  styleUrls: ['./search-by-date.component.scss']
})
export class SearchByDateComponent implements OnInit {
  @Input() dateFrom: Date | null = null;
  @Input() dateTo: Date | null = null;
  @Output() dateEvent = new EventEmitter<string[]>();

  constructor() { }

  ngOnInit(): void {
  }

  selectDates(){
    if (this.dateFrom && this.dateTo){
      let dateFrom = `${this.dateFrom.toLocaleDateString().slice(6)}-${this.dateFrom.toLocaleDateString().slice(3, 5)}-${this.dateFrom.toLocaleDateString().slice(0, 2)}`;
      let dateTo = `${this.dateTo.toLocaleDateString().slice(6)}-${this.dateTo.toLocaleDateString().slice(3, 5)}-${this.dateTo.toLocaleDateString().slice(0, 2)}`;
      this.dateEvent.emit([dateFrom, dateTo]);
    }
        
  }
}
