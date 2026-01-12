import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../../services/Auth.Service';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-c-cerrar-sesion',
    standalone: true,
    imports: [RouterLink, CommonModule],
    templateUrl: './c-cerrar-sesion.html',
    styleUrl: './c-cerrar-sesion.scss',
})
export class CCerrarSesion {

    constructor(
        private authService: AuthService,
        private router: Router
    ) { }

    cerrarSesion() {
        this.authService.logout();
    }
}
