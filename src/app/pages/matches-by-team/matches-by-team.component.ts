import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MenuItem } from 'primeng/api';
import { Observable, Subscription } from 'rxjs';
import { Match } from 'src/app/models/match.model';
import { Matches } from 'src/app/models/matches.model';
import { FootballDataService } from 'src/app/services/football-data.service';

@Component({
  selector: 'app-matches-by-team',
  templateUrl: './matches-by-team.component.html',
  styleUrls: ['./matches-by-team.component.scss']
})
export class MatchesByTeamComponent implements OnInit {

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
      {label: 'Команды', command: () => {
        this.router.navigate(['teams']);
      }}      
    ];    
    this.fdService.teamId = this.route.snapshot.params['teamId'];
    this.subscription = this.fdService.getTeamName().subscribe(data => {
      if (data) 
      this.menuItems.push({label: data.name})
    });
    if (this.route.snapshot.params['dateFrom'] && this.route.snapshot.params['dateTo']){         
          this.dateFrom = new Date(this.route.snapshot.params['dateFrom']);
          this.dateTo = new Date(this.route.snapshot.params['dateTo']);
          this.filterByDate([this.route.snapshot.params['dateFrom'], this.route.snapshot.params['dateTo']])
        }         
    else {
      this.matchesData$ = this.fdService.getMatchesByTeam(null, null);
      this.subscription = this.matchesData$.subscribe(data => {
      if(data) {
        this.isLoad = true;        
        this.matches = data.matches;             
        this.dateFrom = new Date(data.matches[0].utcDate);
        this.dateTo = new Date(data.matches[data.matches.length-1].utcDate);               
      }
      else this.isAvailable = false;         
    });  
    }
        
  }
  
  filterByDate(dates: string[]){   
    this.matchesData$ = this.fdService.getMatchesByTeam(dates[0], dates[1]);
    this.subscription = this.matchesData$.subscribe(data => {
      if(data) {
        this.isLoad = true;
        this.matches = data.matches;            
      }     
    });
    this.router.navigate([`teams/${this.fdService.teamId}/matches/${dates[0]}/${dates[1]}`])  
  }
  ngOnDestroy(){
    if (this.subscription)
    this.subscription.unsubscribe();
  }

}
