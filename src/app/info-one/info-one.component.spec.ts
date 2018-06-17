import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { InfoOneComponent } from './info-one.component';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

describe('InfoOneComponent', () => {
  let component: InfoOneComponent;
  let fixture: ComponentFixture<InfoOneComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InfoOneComponent ],
      imports: [RouterTestingModule, HttpClientModule, FormsModule]
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
