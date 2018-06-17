import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { InfoUserComponent } from './info-user.component';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

describe('InfoUserComponent', () => {
  let component: InfoUserComponent;
  let fixture: ComponentFixture<InfoUserComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InfoUserComponent ],
      imports: [RouterTestingModule, HttpClientModule, FormsModule]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InfoUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
