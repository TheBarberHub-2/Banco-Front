import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-c-header',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './c-header.html',
  styleUrl: './c-header.scss',
})
export class CHeader {
  numeroPedidos: number = 0;
}
