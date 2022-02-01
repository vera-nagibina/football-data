import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { of } from 'rxjs';
import { catchError, map} from 'rxjs/operators';
import { Match } from './models/match.model';
import { Competition } from './models/competitiom.model';
import { Team } from './models/team.model';
import { environment } from './../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class FootballDataService {

  constructor(private http: HttpClient) { }

  apiKey: string = environment.apiKey;
  url: string = 'https://api.football-data.org/v2/competitions';  
  competitionId: string | null = null;
  teamId: string | null = null;
  isAvailable: boolean = true;
      
  getCompetitions(){
    return this.http.get(this.url, {headers: { 'X-Auth-Token': this.apiKey }, responseType: "json"})
    .pipe(
      map(response => this.deserializeCompetitions(response)),      
      catchError(() => {
        this.isAvailable = false;                
        return of([]);        
      }
      )
    );
  }

  getMatches(){    
    return this.http.get(this.url + `/${this.competitionId}/matches`, {headers: { 'X-Auth-Token': this.apiKey }, responseType: "json"})
    .pipe(
      map(response => this.deserializeMatches(response)),      
      catchError(() => {
        this.isAvailable = false;        
        return of([]);        
      }
      )
    )
  }
  getTeams(){
    return this.http.get(this.url + `/${this.competitionId}/teams`, {headers: { 'X-Auth-Token': this.apiKey }, responseType: "json"})
    .pipe(
      map(response => this.deserializeTeams(response)),      
      catchError(() => {                
        return of([]);        
      }
      )
    );
  }
  getMatchesByTeam(){    
    return this.http.get('https://api.football-data.org/v2/teams' + `/${this.teamId}/matches`, {headers: { 'X-Auth-Token': this.apiKey }, responseType: "json"})
    .pipe(
      map(response => this.deserializeMatches(response)),      
      catchError(() => {
        this.isAvailable = false;        
        return of([]);        
      }
      )
    )
  }
  deserializeCompetitions(data: any) {
    let competitions = data.competitions.map((item: any) => {
      const competition: Competition = {
        name: item.name,
        id: item.id,
        code: item.code,
        country: item.area.name
      };
     
      return competition;
    });
    this.isAvailable = true;
    return competitions;
  }
  
  deserializeMatches(data: any) {
    let matches = data.matches.map((item: any) => {
      const match: Match = {
        date: item.utcDate,
        status: item.status,
        homeTeam: item.homeTeam.name,
        awayTeam: item.awayTeam.name,
        homeTeamScore: item.score.fullTime.homeTeam,
        awayTeamScore: item.score.fullTime.awayTeam,
      };
     
      return match;
    });
    this.isAvailable = true;
    return matches;
  }

  deserializeTeams(data: any) {
    let teams = data.teams.map((item: any) => {
      const team: Team = {
        name: item.name,
        id: item.id,    
        country: item.area.name
      };      
      return team;
    });
    this.isAvailable = true;    
    return teams;
  }
}
