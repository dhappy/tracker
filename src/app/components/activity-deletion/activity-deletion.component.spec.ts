import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ActivityDeletionComponent } from './activity-deletion.component';

describe('ActivityDeletionComponent', () => {
  let component: ActivityDeletionComponent;
  let fixture: ComponentFixture<ActivityDeletionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ActivityDeletionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ActivityDeletionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
