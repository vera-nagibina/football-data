import { Component, Input, OnInit } from '@angular/core';
import { Match } from 'src/app/models/match.model';

@Component({
  selector: 'app-matches-table',
  templateUrl: './matches-table.component.html',
  styleUrls: ['./matches-table.component.scss']
})
export class MatchesTableComponent implements OnInit {
  @Input() matches: Match[] = [];

  constructor() { }

  ngOnInit(): void {
  }

}
