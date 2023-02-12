import { Component, inject, OnInit } from '@angular/core';
import { AutoLoginUseCase } from './auth/domain/use-case/auto-login.usecase';

@Component({
  selector: 'app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  private _autoLoginUseCase = inject(AutoLoginUseCase);

  ngOnInit(): void {
    this._autoLoginUseCase.execute();
  }
  
}
