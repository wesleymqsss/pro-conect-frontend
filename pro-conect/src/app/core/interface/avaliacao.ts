export interface IOpcao {
  id: number
  rotulo: string;
  descricao: string;
  correta: boolean;
}

export interface IQuestao {
  id: number;
  texto: string;
  valor: string;
  professorId: number;
  opcoes: IOpcao[];
}

export interface IProvaP {
  id?: number;
  descricao: string;
  dataProva: string;
  materiaId: number;
  professorId: number;
  questoes: IQuestao[];
}

export interface IProvaDetalhes {
  id: number;
  descricao: string;
  dataProva: string;
  materiaId: number;
  professorId: number;
}
