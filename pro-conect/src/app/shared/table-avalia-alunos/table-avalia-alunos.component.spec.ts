import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TableAvaliaAlunosComponent } from './table-avalia-alunos.component';

describe('TableAvaliaAlunosComponent', () => {
  let component: TableAvaliaAlunosComponent;
  let fixture: ComponentFixture<TableAvaliaAlunosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TableAvaliaAlunosComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TableAvaliaAlunosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
