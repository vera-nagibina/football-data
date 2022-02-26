import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { FootballDataService } from 'src/app/services/football-data.service';
import { Team } from 'src/app/models/team.model';
import { Teams } from 'src/app/models/teams.model';

@Component({
  selector: 'app-teams-page',
  templateUrl: './teams-page.component.html',
  styleUrls: ['./teams-page.component.scss']
})
export class TeamsPageComponent implements OnInit {
  teams$: Observable<Teams | null> | undefined;  
  subscription: Subscription | undefined;
  teams: Team [] = [];
  filterTeams: Team [] = [];   
  isAvailable: boolean = true;
  isLoad: boolean = false;
  teamName: string = '';


  constructor(
    private fdService: FootballDataService,   
    private router: Router
  ) { }

  
  ngOnInit(): void {
    this.teams$ = this.fdService.getTeams();    
    this.subscription = this.teams$.subscribe(data => {      
      if (!data) this.isAvailable = false;
      else {
        this.isLoad = true;
        this.teams = data.teams;
      }
      let name =  localStorage.getItem('searchKey');
      if (name)          
      this.teamName = name;
      this.searchTeam(this.teamName);          
    })
    
          
  }
  selectTeam(teamId: number) {
    this.fdService.teamId = teamId;
    localStorage.setItem('searchKey', '');    
    this.router.navigate([`teams/${teamId}/matches`]);    
  }  
  searchTeam(searchKey:string | null){    
    if (searchKey){
      localStorage.setItem('searchKey', searchKey);
      this.filterTeams = this.teams
      .filter(item => item.name.toUpperCase().includes(searchKey.toUpperCase()));     
    }
    else {
      localStorage.setItem('searchKey', '');
      this.filterTeams = this.teams;      
    };
        
  }
  
  ngOnDestroy(){
    if (this.subscription)
    this.subscription.unsubscribe();
  }

}
