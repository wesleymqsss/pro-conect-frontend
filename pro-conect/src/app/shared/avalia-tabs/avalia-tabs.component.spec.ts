import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AvaliaTabsComponent } from './avalia-tabs.component';

describe('AvaliaTabsComponent', () => {
  let component: AvaliaTabsComponent;
  let fixture: ComponentFixture<AvaliaTabsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AvaliaTabsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AvaliaTabsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
