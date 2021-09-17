import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LeaguesFormComponent } from './leagues-form.component';

describe('LeaguesFormComponent', () => {
  let component: LeaguesFormComponent;
  let fixture: ComponentFixture<LeaguesFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LeaguesFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LeaguesFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
