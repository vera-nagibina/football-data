import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MatchesByCompetitionComponent } from './matches-by-competition.component';

describe('MatchesByCompetitionComponent', () => {
  let component: MatchesByCompetitionComponent;
  let fixture: ComponentFixture<MatchesByCompetitionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MatchesByCompetitionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MatchesByCompetitionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
