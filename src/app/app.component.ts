import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MenuItem } from 'primeng/api';
import { FootballDataService } from './services/football-data.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'football-data';
  items: MenuItem[] = [];
  activeItem: MenuItem = this.items[0];
  competitionId: string | null = null;  

  constructor(
    private fdService: FootballDataService,
    private route: ActivatedRoute,
    private router: Router
    ) { }

  ngOnInit(): void {          
    this.items = [
      {label: 'Лиги', command: () => {
        this.router.navigate(['competitions']);
        localStorage.setItem('activeItem', '0');
        localStorage.setItem('searchKey', '');
        }
      },      
      {label: 'Команды', command: () => {
        this.router.navigate(['teams']);
        localStorage.setItem('activeItem', '1');
        localStorage.setItem('searchKey', '');
        }
      }      
    ];        
    this.activeItem = this.items[Number(localStorage.getItem('activeItem'))];    
  }  

}
