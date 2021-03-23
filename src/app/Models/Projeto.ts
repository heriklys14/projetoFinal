import { PoSelectOption } from '@po-ui/ng-components'
import { ModelBase } from './base/modelBase'

export class Projeto extends ModelBase implements PoSelectOption {
  constructor(public codigo?: string, public descricao?: string) {
    super(codigo)
  }

  label: string = `${this.codigo} - ${this.descricao}`
  value: string = this.codigo
}
