import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { FootballDataService } from '../football-data.service';
import { Competition } from '../models/competitiom.model';

@Component({
  selector: 'app-competitions',
  templateUrl: './competitions.component.html',
  styleUrls: ['./competitions.component.scss']
})
export class CompetitionsComponent implements OnInit, OnDestroy {

  competitions$: Observable<Competition[]> | undefined;
  subscription: Subscription | undefined;
  competitions: Competition [] = [];
  filterCompetitions: Competition [] = [];
  availableCodes: string [] = [ 
  'WC', 'CL', 'BL1', 'DED', 'BSA', 'PD', 
  'FL1', 'ELC', 'PPL', 'EC', 'SA', 'PL', 'CLI'
  ];
  sCompetition: string | null = null;
  isAvailable: boolean = true;

  constructor(
    private fdService: FootballDataService,
    private router: Router    
    ) { }

  ngOnInit(): void {
    this.competitions$ = this.fdService.getCompetitions();
    this.subscription = this.competitions$.subscribe(data => {
      this.competitions = data.filter(item => this.availableCodes.includes(item.code));
      this.isAvailable = this.fdService.isAvailable;
      this.filterCompetitions = this.competitions;
      this.sCompetition = localStorage.getItem('searchCompetition');
      this.searchCompetition(); 
    })       
  }
  selectCompetition(competitionId: string) {
    this.fdService.competitionId = competitionId;
    localStorage.setItem('activeItem', '1');    
    this.router.navigate([`competitions/${competitionId}/matches`]);    
  }  
  searchCompetition(){
    if (this.sCompetition !== null) {
      let key = this.sCompetition.toUpperCase();
      this.filterCompetitions = this.competitions
      .filter(item => item.name.toUpperCase().includes(key));
      localStorage.setItem('searchCompetition', this.sCompetition);
    }    
  }
  ngOnDestroy(){
    if (this.subscription)
    this.subscription.unsubscribe();
  } 

}
