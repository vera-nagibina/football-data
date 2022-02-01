import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {MenuItem} from 'primeng/api';
import { FootballDataService } from '../football-data.service';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.scss']
})
export class MainPageComponent implements OnInit {
  items: MenuItem[] = [];
  activeItem: MenuItem = {};
  competitionId: string | null = null;  

  constructor(
    private fdService: FootballDataService,
    private route: ActivatedRoute,
    private router: Router
    ) { }

  ngOnInit(): void {
    this.route.params.subscribe(params=>{
      this.fdService.competitionId=params['competitionId'];
    });       
    this.items = [
      {label: 'Competitions', command: () => {
        this.router.navigate([`competitions`]);
        localStorage.setItem('activeItem', '0');
        }
      },
      {label: 'Matches', command: () => {
        this.router.navigate([`competitions/${this.fdService.competitionId}/matches`]);
        localStorage.setItem('activeItem', '1');
        }
      },
      {label: 'Teams', command: () => {
        this.router.navigate([`competitions/${this.fdService.competitionId}/matches/teams`]);
        localStorage.setItem('activeItem', '2');
        }
      }      
    ];        
    this.activeItem = this.items[Number(localStorage.getItem('activeItem'))];    
  }  
}
