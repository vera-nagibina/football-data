import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CompetitionsComponent } from './competitions/competitions.component';
import { MainPageComponent } from './main-page/main-page.component';
import { MatchesByTeamComponent } from './matches-by-team/matches-by-team.component';
import { MatchesComponent } from './matches/matches.component';
import { TeamsComponent } from './teams/teams.component';

const routes: Routes = [
  {path:'', children: [
    {path: '', redirectTo: '/competitions', pathMatch: 'full'},
    {path:'competitions', component: CompetitionsComponent},
    {path:'competitions/:competitionId/matches', component: MainPageComponent, children: [            
      {path:'', component: MatchesComponent},
      {path:':dateFrom/:dateTo', component: MatchesComponent},
      {path:'teams', component: TeamsComponent}
    ]},
    {path:'teams/:teamId/matches', component: MatchesByTeamComponent},
    {path:'teams/:teamId/matches/:dateFrom/:dateTo', component: MatchesByTeamComponent}
  ]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
