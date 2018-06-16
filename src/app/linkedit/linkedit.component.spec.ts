import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LinkeditComponent } from './linkedit.component';

describe('LinkeditComponent', () => {
  let component: LinkeditComponent;
  let fixture: ComponentFixture<LinkeditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LinkeditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LinkeditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
