import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppEditEmpComponent } from './app-edit-emp.component';

describe('AppEditEmpComponent', () => {
  let component: AppEditEmpComponent;
  let fixture: ComponentFixture<AppEditEmpComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AppEditEmpComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AppEditEmpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
