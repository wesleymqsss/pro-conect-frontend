import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormLoginLeftComponent } from './form-login-left.component';

describe('FormLoginLeftComponent', () => {
  let component: FormLoginLeftComponent;
  let fixture: ComponentFixture<FormLoginLeftComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FormLoginLeftComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormLoginLeftComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
