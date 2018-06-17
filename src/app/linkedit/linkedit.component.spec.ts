import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { LinkeditComponent } from './linkedit.component';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

describe('LinkeditComponent', () => {
  let component: LinkeditComponent;
  let fixture: ComponentFixture<LinkeditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LinkeditComponent ],
      imports: [RouterTestingModule, HttpClientModule, FormsModule]
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
