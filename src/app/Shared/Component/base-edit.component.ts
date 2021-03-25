import { Component, OnInit } from '@angular/core'
import { FormGroup } from '@angular/forms'
import { ActivatedRoute, Router } from '@angular/router'
import { ToastrService } from 'ngx-toastr'
import { ModelBase } from 'src/app/Models/base/modelBase'
import { ModelServiceService } from 'src/app/Services/Base/model-service.service'

@Component({
  template: '',
})
export abstract class BaseEditComponent<T extends ModelBase> implements OnInit {
  constructor(
    protected toastr: ToastrService,
    protected router: Router,
    protected route: ActivatedRoute,
    protected service: ModelServiceService,
  ) {}

  ngOnInit(): void {
    this.IniciaFormulario()
    this.GetRegistro()
  }

  protected isNew = true
  protected teveAlteracao = false
  public formulario: FormGroup

  async GetRegistro() {
    this.route.data.subscribe((info: { registro: T }) => {
      if (info.registro) {
        this.isNew = false
        this.formulario.setValue(info.registro)
      }
    })
  }

  public OnSubmit() {
    if (this.formulario.valid) {
      if (!this.isNew) {
        this.Alterar()
      } else {
        this.Incluir()
      }
    } else {
      const propriedades = Object.keys(this.formulario.controls)
      propriedades.forEach((propriedade) => {
        const controle = this.formulario.get(propriedade)
        if (!controle.valid) {
          controle.markAsTouched()
        }
      })
    }
  }

  protected abstract IniciaFormulario()

  public Alterar(): void {
    this.service.put(this.formulario.value).subscribe(
      (registro) => {
        this.toastr.success(`Registro ${registro.codigo} alterado com sucesso.`)
        this.router.navigate([this.service.nomeRota])
      },
      (error) => {
        console.log(error)
      },
    )
  }

  protected Incluir() {
    this.service.post(this.formulario.value).subscribe(
      (registro) => {
        this.toastr.success(`Registro ${registro.codigo} criado com sucesso.`)
        this.router.navigate([this.service.nomeRota])
      },
      (error) => {
        console.log(error)
      },
    )
  }
}
