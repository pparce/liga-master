import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LeaguesEditComponent } from './leagues-edit.component';

describe('LeaguesEditComponent', () => {
  let component: LeaguesEditComponent;
  let fixture: ComponentFixture<LeaguesEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LeaguesEditComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LeaguesEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
