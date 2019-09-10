import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ActivityConfigurationComponent } from './activity-configuration.component';

describe('ActivityConfigurationComponent', () => {
  let component: ActivityConfigurationComponent;
  let fixture: ComponentFixture<ActivityConfigurationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ActivityConfigurationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ActivityConfigurationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
