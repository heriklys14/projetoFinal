import { ModelBase } from "./base/modelBase";

export class Projeto extends ModelBase
{    
    constructor(
        public codigo?: string,
        public descricao?: string
    ) {                
        super(codigo);
    }     
}