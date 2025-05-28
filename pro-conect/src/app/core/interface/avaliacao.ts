export interface IOpcao{
    rotulo: string;
    descricao: string;
    correta: boolean;
}

export interface IQuestao{
    texto: string;
    valor: string;
    professorId: number;
    opcoes: IOpcao[];
}

export interface IProvaP{
    descricao: string;
    dataProva: string;
    materiaId:number;
    professorId: number;
    questoes: IQuestao[];
}