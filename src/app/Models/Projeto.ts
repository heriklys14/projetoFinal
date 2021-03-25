import { PoSelectOption } from '@po-ui/ng-components'
import { ModelBase } from './base/modelBase'

export class Projeto extends ModelBase implements PoSelectOption {
  public label: string
  public value: string

  constructor(public codigo?: string, public descricao?: string) {
    super(codigo)
    this.label = `${this.codigo} - ${this.descricao}`
    this.value = this.codigo
  }
}
