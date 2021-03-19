import { ModelBase } from './base/modelBase';

export class Tarefa extends ModelBase
{
    constructor(public codigo?: string,
                public titulo?: string,
                public data?: Date,
                public prioridade?: number,
                public descricao?: string,
                public projetoId?: string) {
        super(codigo);
    }
    // public virtual Projeto Projeto { get; set; }
}
