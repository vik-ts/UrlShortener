import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OpenlinkComponent } from './openlink.component';

describe('OpenlinkComponent', () => {
  let component: OpenlinkComponent;
  let fixture: ComponentFixture<OpenlinkComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OpenlinkComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OpenlinkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
