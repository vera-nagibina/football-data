import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { FootballDataService } from '../football-data.service';
import { Match } from '../models/match.model';

@Component({
  selector: 'app-matches',
  templateUrl: './matches.component.html',
  styleUrls: ['./matches.component.scss']
})
export class MatchesComponent implements OnInit, OnDestroy {

  matches$: Observable<Match[]> | undefined;
  subscription: Subscription | undefined;
  startDate: Date | null = null;
  endDate: Date | null = null;
  matches: Match [] = [];
  filterMatches: Match [] = [];
  isAvailable: boolean = true;  

  constructor(
    private fdService: FootballDataService, 
    private route: ActivatedRoute,
    private router: Router
    ) { }

  ngOnInit(): void {    
    this.matches$ = this.fdService.getMatches();
    this.subscription = this.matches$.subscribe(data => {
      this.matches = data;
      this.isAvailable = this.fdService.isAvailable;
      this.filterMatches = this.matches;
      if (this.matches.length !== 0) {
        this.startDate = new Date(this.matches[0].date);
        this.endDate = new Date(this.matches[this.matches.length-1].date);
        this.route.paramMap.subscribe(params => {
          let dateFrom = params.get('dateFrom');
          let dateTo = params.get('dateTo')
          if (dateFrom !== null && dateTo !== null) {
            this.startDate = new Date(dateFrom);
            this.endDate = new Date(dateTo);
            this.filterByDate();     
          }          
        });   
      }      
    });                
  } 
  filterByDate() {    
    if (this.startDate !== null && this.endDate !== null){
      let dateFrom = this.startDate.toISOString();
      let dateTo = this.endDate.toISOString();
      this.filterMatches = this.matches.filter((item: Match) => item.date > dateFrom && item.date < dateTo);
      this.router.navigate([`competitions/${this.fdService.competitionId}/matches/${dateFrom}/${dateTo}`]);
    }
     
  }
  ngOnDestroy(){
    if (this.subscription)
    this.subscription.unsubscribe();
  }  
}
