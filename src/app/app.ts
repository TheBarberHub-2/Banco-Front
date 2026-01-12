import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CFooter } from "./components/ui/c-footer/c-footer";
import { CHeader } from "./components/ui/c-header/c-header";


@Component({
  selector: 'app-root',
  imports: [RouterOutlet, CHeader, CFooter],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  protected readonly title = signal('front-banco');
}
