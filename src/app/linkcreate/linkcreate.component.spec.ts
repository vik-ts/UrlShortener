import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { LinkcreateComponent } from './linkcreate.component';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

describe('LinkcreateComponent', () => {
  let component: LinkcreateComponent;
  let fixture: ComponentFixture<LinkcreateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LinkcreateComponent ],
      imports: [RouterTestingModule, HttpClientModule, FormsModule]
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
