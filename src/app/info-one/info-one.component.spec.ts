import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InfoOneComponent } from './info-one.component';

describe('InfoOneComponent', () => {
  let component: InfoOneComponent;
  let fixture: ComponentFixture<InfoOneComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InfoOneComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InfoOneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
