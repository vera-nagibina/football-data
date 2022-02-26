import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {TabMenuModule} from 'primeng/tabmenu';
import {DataViewModule} from 'primeng/dataview';
import {InputTextModule} from 'primeng/inputtext';
import {TableModule} from 'primeng/table';
import {CalendarModule} from 'primeng/calendar';
import {ProgressSpinnerModule} from 'primeng/progressspinner';
import {BreadcrumbModule} from 'primeng/breadcrumb';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';
import { CompetitionsPageComponent } from './pages/competitions-page/competitions-page.component';
import { SearchByNameComponent } from './components/search-by-name/search-by-name.component';
import { FootballDataService } from './services/football-data.service';
import { FootballDataInterceptor } from './services/football-data.interceptor';
import { TeamsPageComponent } from './pages/teams-page/teams-page.component';
import { MatchesByCompetitionComponent } from './pages/matches-by-competition/matches-by-competition.component';
import { SearchByDateComponent } from './components/search-by-date/search-by-date.component';
import { StatusPipe } from './pipes/status.pipe';
import { MatchesTableComponent } from './components/matches-table/matches-table.component';
import { MatchesByTeamComponent } from './pages/matches-by-team/matches-by-team.component';



@NgModule({
  declarations: [
    AppComponent,    
    CompetitionsPageComponent,
    SearchByNameComponent,
    TeamsPageComponent,
    MatchesByCompetitionComponent,
    SearchByDateComponent,
    StatusPipe,
    MatchesTableComponent,
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
    ProgressSpinnerModule,
    BreadcrumbModule
  ],
  providers: [
    FootballDataService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: FootballDataInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
