import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LinkcreateComponent } from './linkcreate.component';

describe('LinkcreateComponent', () => {
  let component: LinkcreateComponent;
  let fixture: ComponentFixture<LinkcreateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LinkcreateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LinkcreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
