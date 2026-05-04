import { Routes } from '@angular/router';

export const routes: Routes = [
  {
  path: '',
  loadComponent: () =>
    import('./modules/auth/login/login').then(m => m.LoginComponent)
},
  {
    path: 'login',
    loadComponent: () =>
      import('./modules/auth/login/login').then(m => m.LoginComponent)
  },
  {
    path: 'home',
    loadComponent: () =>
      import('./modules/dashboard/home/home').then(m => m.Home)
  },
  {
    path: 'estudio',
    loadComponent: () =>
      import('./modules/estudio/practica/practica').then(m => m.Practica)
  },
  {
    path: 'simulacion',
    loadComponent: () =>
      import('./modules/simulacion/simulacion/simulacion').then(m => m.Simulacion)
  },
  {
    path: 'analisis',
    loadComponent: () =>
      import('./modules/analisis/estadisticas/estadisticas').then(m => m.Estadisticas)
  },
  {
    path: 'tutor',
    loadComponent: () =>
      import('./modules/tutor/chat/chat').then(m => m.Chat)
  }
];
