import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { FootballDataService } from '../football-data.service';
import { Team } from '../models/team.model';

@Component({
  selector: 'app-teams',
  templateUrl: './teams.component.html',
  styleUrls: ['./teams.component.scss']
})
export class TeamsComponent implements OnInit {

  teams$: Observable<any> | undefined;
  subscription: Subscription | undefined;  
  teams: Team [] = [];
  filterTeams: Team [] = [];
  sTeam: string | null = null;

  constructor(
    private fdService: FootballDataService, 
    private router: Router
  ) { }

  ngOnInit(): void {
    this.teams$ = this.fdService.getTeams();
    this.subscription = this.teams$.subscribe(data => {
      this.teams = data;
      this.filterTeams = this.teams;
      this.sTeam = localStorage.getItem('searchTeam');
      this.searchTeam();
    })
  }

  searchTeam() {
    if (this.sTeam !== null) {
      let key = this.sTeam.toUpperCase();
      this.filterTeams = this.teams
      .filter(item => item.name.toUpperCase().includes(key));
      localStorage.setItem('searchTeam', this.sTeam);
    }  

  }

  selectTeam(teamId: string) {
    this.fdService.teamId = teamId;      
    this.router.navigate([`teams/${teamId}/matches`]); 

  }

  ngOnDestroy(){
    if (this.subscription)
    this.subscription.unsubscribe();
  } 

}
