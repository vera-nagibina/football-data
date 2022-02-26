import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { FootballDataService } from 'src/app/services/football-data.service';
import { Competition } from 'src/app/models/competition.model';
import { Competitions } from 'src/app/models/competitions.model';

@Component({
  selector: 'app-competitions-page',
  templateUrl: './competitions-page.component.html',
  styleUrls: ['./competitions-page.component.scss']
})
export class CompetitionsPageComponent implements OnInit {
  competitions$: Observable<Competitions | null> | undefined;  
  subscription: Subscription | undefined;
  competitions: Competition [] = [];
  filterCompetitions: Competition [] = [];   
  isAvailable: boolean = true;
  isLoad: boolean = false;
  competitionName: string = '';
  first: number = 0;


  constructor(
    private fdService: FootballDataService,    
    private router: Router
  ) { }

  
  ngOnInit(): void {
    this.competitions$ = this.fdService.getCompetitions();    
    this.subscription = this.competitions$.subscribe(data => {
      if (!data) this.isAvailable = false;
      else {
        this.isLoad = true;
        this.competitions = data.competitions;
      }
      let name = localStorage.getItem('searchKey');
      if (name)     
      this.competitionName = name
      this.searchCompetition(this.competitionName);          
    })
    
          
  }
  selectCompetition(competitionId: number) {
    this.fdService.competitionId = competitionId;
    localStorage.setItem('searchKey', '');       
    this.router.navigate([`competitions/${competitionId}/matches`]);    
  }  
  searchCompetition(searchKey:string){    
    if (searchKey){
      localStorage.setItem('searchKey', searchKey);
      this.filterCompetitions = this.competitions
      .filter(item => item.name.toUpperCase().includes(searchKey.toUpperCase()));     
    }
    else {
      localStorage.setItem('searchKey', '');
      this.filterCompetitions = this.competitions;      
    };
        
  }
  
  ngOnDestroy(){
    if (this.subscription)
    this.subscription.unsubscribe();
  }

  
}
