export interface CardTurma {
  turma: string;
  curso: string;
  semestre: string;
  horarioInicio: string;
  horarioFim: string;
  alunos: Alunos[];
}

interface Alunos {
  nome: string;
}
