import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {

  constructor(private router: Router) {
  }

  private itemKey = 'authUser';

  ngOnInit(): void {
  }

  public Logar(): void
  {
    window.localStorage.setItem(this.itemKey, 'LOGADO');

    this.router.navigate(['projetos']);
  }
}
