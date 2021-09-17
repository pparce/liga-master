import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LeaguesAddComponent } from './leagues-add.component';

describe('LeaguesAddComponent', () => {
  let component: LeaguesAddComponent;
  let fixture: ComponentFixture<LeaguesAddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LeaguesAddComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LeaguesAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
