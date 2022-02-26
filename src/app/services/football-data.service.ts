import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map} from 'rxjs/operators';
import { BASE_DOMANE } from 'src/constants';
import { Competitions } from '../models/competitions.model';
import { Teams } from '../models/teams.model';
import { Matches } from '../models/matches.model';
import { Team } from '../models/team.model';

@Injectable({
  providedIn: 'root'
})
export class FootballDataService {

  constructor(private http: HttpClient) { }  
  competitionId: number | null = null;
  teamId: number | null = null;    
      
  getCompetitions(): Observable<Competitions | null>{
    return this.http.get<Competitions>(BASE_DOMANE + 'competitions')
    .pipe(                  
      catchError(() => {             
        return of(null);        
      }
      )
    )    
  }  
  getTeams(): Observable<Teams | null>{
    return this.http.get<Teams>(BASE_DOMANE + 'teams')
    .pipe(
      catchError(() => {             
        return of(null);        
      }
      )
    )
  }
  getMatchesByCompetition(dateFrom: string | null, dateTo: string | null): Observable<Matches | null>{        
    if(dateFrom && dateTo) 
    return this.http.get<Matches>(BASE_DOMANE + `competitions/${this.competitionId}/matches?dateFrom=${dateFrom}&dateTo=${dateTo}`)
    .pipe(           
      catchError(() => {               
        return of(null);        
      }
      )
    )
    return this.http.get<Matches>(BASE_DOMANE + `competitions/${this.competitionId}/matches`)
    .pipe(           
      catchError(() => {              
        return of(null);        
      }
      )
    )
  }
  
  getMatchesByTeam(dateFrom: string | null, dateTo: string | null): Observable<Matches | null>{        
    if(dateFrom && dateTo) 
    return this.http.get<Matches>(BASE_DOMANE + `teams/${this.teamId}/matches?dateFrom=${dateFrom}&dateTo=${dateTo}`)
    .pipe(           
      catchError(() => {               
        return of(null);        
      }
      )
    )
    return this.http.get<Matches>(BASE_DOMANE + `teams/${this.teamId}/matches`)
    .pipe(           
      catchError(() => {              
        return of(null);        
      }
      )
    )
  }
  getTeamName(): Observable<Team | null>{
    return this.http.get<Team>(BASE_DOMANE + `teams/${this.teamId}`)
    .pipe(
      catchError(() => {             
        return of(null);        
      }
      )
    )
  }

}
