import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { FootballDataService } from 'src/app/services/football-data.service';
import { MenuItem} from 'primeng/api';
import { Matches } from 'src/app/models/matches.model';
import { Match } from 'src/app/models/match.model';

@Component({
  selector: 'app-matches-by-competition',
  templateUrl: './matches-by-competition.component.html',
  styleUrls: ['./matches-by-competition.component.scss']
})
export class MatchesByCompetitionComponent implements OnInit {
  matchesData$: Observable<Matches | null> | undefined;
  subscription: Subscription | undefined;
  dateFrom: Date | null = null;
  dateTo: Date | null = null;
  matches: Match[] = [];
  isAvailable: boolean = true;
  isLoad: boolean = false;
  menuItems: MenuItem[] = [];  

  constructor(
    private fdService: FootballDataService, 
    private route: ActivatedRoute,
    private router: Router   
  ) { }

  ngOnInit(): void {
    this.menuItems = [
      {label: 'Лиги', command: () => {
        this.router.navigate(['competitions']);
      }}      
    ];
    this.fdService.competitionId = this.route.snapshot.params['competitionId'];
    if (this.route.snapshot.params['dateFrom'] && this.route.snapshot.params['dateTo']){         
          this.dateFrom = new Date(this.route.snapshot.params['dateFrom']);
          this.dateTo = new Date(this.route.snapshot.params['dateTo']);
          this.filterByDate([this.route.snapshot.params['dateFrom'], this.route.snapshot.params['dateTo']])
        }         
    else {
      this.matchesData$ = this.fdService.getMatchesByCompetition(null, null);
      this.subscription = this.matchesData$.subscribe(data => {
      if(data) {
        this.isLoad = true;        
        this.matches = data.matches;             
        this.dateFrom = new Date(data.matches[0].utcDate);
        this.dateTo = new Date(data.matches[data.matches.length-1].utcDate);
        this.menuItems.push({label: data.competition?.name});        
      }
      else this.isAvailable = false;         
    });  
    }
        
  }
  
  filterByDate(dates: string[]){   
    this.matchesData$ = this.fdService.getMatchesByCompetition(dates[0], dates[1]);
    this.subscription = this.matchesData$.subscribe(data => {
      if(data) {
        this.isLoad = true;
        this.matches = data.matches;
        this.menuItems.push({label: data.competition?.name});     
      }     
    });
    this.router.navigate([`competitions/${this.fdService.competitionId}/matches/${dates[0]}/${dates[1]}`])  
  }
  ngOnDestroy(){
    if (this.subscription)
    this.subscription.unsubscribe();
  }
}
