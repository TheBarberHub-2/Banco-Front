import { Routes } from '@angular/router';
import { CLogin } from './components/pages/c-login/c-login';
import { Inicio } from './components/pages/inicio/inicio';
import { CCerrarSesion } from './components/pages/c-cerrar-sesion/c-cerrar-sesion';
import { AuthGuard } from './services/Auth.guard';

export const routes: Routes = [
    {
        path: '',
        redirectTo: 'login',
        pathMatch: 'full',
    },

    {
        path: 'login',
        component: CLogin,
    },

    {
        path: 'inicio',
        component: Inicio,
        canActivate: [AuthGuard],
    },
    {
        path: 'cerrar-sesion',
        component: CCerrarSesion,
        canActivate: [AuthGuard],
    },

    {
        path: '**',
        redirectTo: 'inicio',
    },
];
