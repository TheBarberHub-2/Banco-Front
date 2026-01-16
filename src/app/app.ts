import { Component, signal, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CFooter } from "./components/ui/c-footer/c-footer";
import { CHeader } from "./components/ui/c-header/c-header";
import { AuthService } from './services/Auth.Service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, CHeader, CFooter],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  protected readonly title = signal('front-banco');
  private authService = inject(AuthService);

  isLogged() {
    return this.authService.isLogged();
  }
}
