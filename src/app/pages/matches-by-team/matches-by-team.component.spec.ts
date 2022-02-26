import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MatchesByTeamComponent } from './matches-by-team.component';

describe('MatchesByTeamComponent', () => {
  let component: MatchesByTeamComponent;
  let fixture: ComponentFixture<MatchesByTeamComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MatchesByTeamComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MatchesByTeamComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
