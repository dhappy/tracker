import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EventListRowComponent } from './event-list-row.component';

describe('EventListRowComponent', () => {
  let component: EventListRowComponent;
  let fixture: ComponentFixture<EventListRowComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EventListRowComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EventListRowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
