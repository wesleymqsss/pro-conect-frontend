import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NoteGraphComponent } from './note-graph.component';

describe('NoteGraphComponent', () => {
  let component: NoteGraphComponent;
  let fixture: ComponentFixture<NoteGraphComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [NoteGraphComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NoteGraphComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
