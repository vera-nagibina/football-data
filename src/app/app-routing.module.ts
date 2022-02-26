import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CompetitionsPageComponent } from './pages/competitions-page/competitions-page.component';
import { MatchesByCompetitionComponent } from './pages/matches-by-competition/matches-by-competition.component';
import { MatchesByTeamComponent } from './pages/matches-by-team/matches-by-team.component';
import { TeamsPageComponent } from './pages/teams-page/teams-page.component';

const routes: Routes = [
  {path:'', children: [
    {path: '', redirectTo: '/competitions', pathMatch: 'full'},
    {path:'competitions', component: CompetitionsPageComponent},    
    {path:'teams', component: TeamsPageComponent},    
    {path:'competitions/:competitionId/matches', component: MatchesByCompetitionComponent},
    {path:'competitions/:competitionId/matches/:dateFrom/:dateTo', component: MatchesByCompetitionComponent},
    {path:'teams/:teamId/matches', component: MatchesByTeamComponent},
    {path:'teams/:teamId/matches/:dateFrom/:dateTo', component: MatchesByTeamComponent}    
    
  ]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
