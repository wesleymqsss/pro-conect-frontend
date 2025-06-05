import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VisaoAvaliacoesAlunoComponent } from './visao-avaliacoes-aluno.component';

describe('VisaoAvaliacoesAlunoComponent', () => {
  let component: VisaoAvaliacoesAlunoComponent;
  let fixture: ComponentFixture<VisaoAvaliacoesAlunoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [VisaoAvaliacoesAlunoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VisaoAvaliacoesAlunoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
