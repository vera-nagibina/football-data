import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {TabMenuModule} from 'primeng/tabmenu';
import {DataViewModule} from 'primeng/dataview';
import {InputTextModule} from 'primeng/inputtext';
import {TableModule} from 'primeng/table';
import {CalendarModule} from 'primeng/calendar';
import {ProgressSpinnerModule} from 'primeng/progressspinner';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MainPageComponent } from './main-page/main-page.component';
import { TeamsComponent } from './teams/teams.component';
import { FormsModule } from '@angular/forms';
import { CompetitionsComponent } from './competitions/competitions.component';
import { MatchesComponent } from './matches/matches.component';
import { MatchesByTeamComponent } from './matches-by-team/matches-by-team.component';


@NgModule({
  declarations: [
    AppComponent,
    MainPageComponent,
    CompetitionsComponent,
    TeamsComponent,
    MatchesComponent,
    MatchesByTeamComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    AppRoutingModule,
    FormsModule,
    TabMenuModule,
    DataViewModule,
    InputTextModule,
    TableModule,
    CalendarModule,
    ProgressSpinnerModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
